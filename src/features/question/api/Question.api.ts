import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import {
  PagedRequest,
  PagedResponse,
  QuestionCreateDto,
  QuestionResponse,
} from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const questionGetAll = async (): Promise<QuestionResponse[]> => {
  return await axios.get(ApiRouteConstant.Question.Root());
};

const questionGetPaginated = async (
  page?: number,
  query?: string
): Promise<PagedResponse<QuestionResponse[]>> => {
  const url =
    query === ""
      ? `${ApiRouteConstant.Question.GetPaginated()}?page=${page}`
      : `${ApiRouteConstant.Question.GetPaginated()}?page=${page}&query=${query}`;
  return await axios.get(url);
};

const questionGetById = async (id: string): Promise<QuestionResponse> => {
  return await axios.get(`${ApiRouteConstant.Question.Root()}${id}`);
};

const questionCreate = async (
  request: QuestionCreateDto
): Promise<QuestionResponse> => {
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

export const usePagedQuestions = ({ page = 0, query = "" }: PagedRequest) => {
  return useQuery({
    queryKey: [questionsWithPagingQueryKey, page],
    queryFn: () => questionGetPaginated(page, query),
    keepPreviousData: true,
  });
};

export const useSearchQuestions = ({ page = 0, query = "" }: PagedRequest) => {
  return useQuery({
    queryKey: [questionsWithPagingQueryKey, query],
    queryFn: () => questionGetPaginated(page, query),
    keepPreviousData: true,
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