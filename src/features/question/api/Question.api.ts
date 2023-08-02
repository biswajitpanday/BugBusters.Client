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

const questionGet = async (
  page?: number,
  query?: string
): Promise<PagedResponse<QuestionResponse[]>> => {
  const url =
    query === ""
      ? `${ApiRouteConstant.Question.Root()}?page=${page}`
      : `${ApiRouteConstant.Question.Root()}?page=${page}&query=${query}`;
  return await axios.get(url);
};

const questionGetById = async (
  id: string,
  page?: number,
  query?: string
): Promise<QuestionResponse> => {
  const url =
    query === ""
      ? `${ApiRouteConstant.Question.Root()}${id}?page=${page}`
      : `${ApiRouteConstant.Question.Root()}${id}?page=${page}&query=${query}`;
  return await axios.get(url);
};

const questionCreate = async (
  request: QuestionCreateDto
): Promise<QuestionResponse> => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Question.Root(), body);
};

const questionsQueryKey = ["questions"];
const questionQueryKey = ["question"];

export const useQuestions = ({ page = 0, query = "" }: PagedRequest) => {
  return useQuery({
    queryKey: [questionsQueryKey, page, query],
    queryFn: () => questionGet(page, query),
    keepPreviousData: true,
  });
};

export const useQuestion = ({ questionId = "", page = 0, query = "" }) => {
  return useQuery({
    queryKey: [questionQueryKey, questionId, page, query],
    queryFn: () => questionGetById(questionId, page, query),
    keepPreviousData: true,
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
