import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { PagedResponse, QuestionCreateDto, QuestionResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const questionGetAll = async (): Promise<QuestionResponse[]> => {
  return await axios.get(ApiRouteConstant.Question.Root());
};

const questionGetPaginated = async (page?: number): Promise<PagedResponse<QuestionResponse[]>> => {
  return await axios.get(`${ApiRouteConstant.Question.GetPaginated()}?page=${page}`);
};

const questionGetById = async (id: string): Promise<QuestionResponse> => {
  return await axios.get(`${ApiRouteConstant.Question.Root()}${id}`);
};

const questionCreate = async (request: QuestionCreateDto): Promise<QuestionResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Question.Root(), body);
};

const questionsQueryKey = ["questions"];
const questionsWithPagingQueryKey = ["questionsWithPaging"];
const questionQueryKey = ["question"];

export const useQuestions = () => {
  return useQuery({
    queryKey: questionsQueryKey,
    queryFn: () => questionGetAll(),
  });
};

export const usePagedQuestions = (page?: number) => {
  return useQuery({
    queryKey: [questionsWithPagingQueryKey, page],
    queryFn: () => questionGetPaginated(page),
    keepPreviousData: true
  });
};

export const useQuestion = (questionId: string) => {
  return useQuery({
    queryKey: [questionQueryKey, questionId],
    queryFn: () => questionGetById(questionId),
  });
};

export const useCreateQuestion = () => {
  return useMutation({
    onMutate: async (questionCreateDto: QuestionCreateDto) => {
      await queryClient.cancelQueries({ queryKey: questionsQueryKey });
      const prevQuestions =
        queryClient.getQueryData<QuestionResponse[]>(questionsQueryKey);
      queryClient.setQueryData(questionsQueryKey, [
        ...(prevQuestions || []),
        questionCreateDto,
      ]);
    },

    onError: (_, __, context: any) => {
      if (context?.prevQuestions) {
        queryClient.setQueryData(questionsQueryKey, context.prevQuestions);
      }
    },

    onSuccess: (data, x) => {
      queryClient.invalidateQueries(questionsQueryKey);
      toast("Question Created Successfully!");
    },
    mutationFn: questionCreate,
  });
};