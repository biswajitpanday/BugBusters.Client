import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { QuestionCreateDto, QuestionResponse, VoteCreateDto, VoteResponse } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const questionGetAll = async (): Promise<QuestionResponse[]> => {
  return await axios.get(ApiRouteConstant.Question.Root());
};

const questionGetById = async (id: string): Promise<QuestionResponse> => {
  return await axios.get(`${ApiRouteConstant.Question.Root()}${id}`);
};

const questionCreate = async (request: QuestionCreateDto) => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Question.Root(), body);
};

const voteCreate = async (request: VoteCreateDto) => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Vote.Root(), body);
}

const questionsQueryKey = ["questions"];
const questionQueryKey = ["question"];
const voteQueryKey = ["vote"]

export const useQuestions = () => {
  return useQuery({
    queryKey: questionsQueryKey,
    queryFn: () => questionGetAll(),
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

    onSuccess: () => {
      queryClient.invalidateQueries(questionsQueryKey);
      toast("Question Created Successfully!");
    },
    mutationFn: questionCreate,
  });
};

export const useCreateVote = () => {
  return useMutation({
    onMutate: async (voteCreateDto: VoteCreateDto) => {
      await queryClient.cancelQueries({ queryKey: voteQueryKey });
      const prevVotes =
        queryClient.getQueryData<VoteResponse[]>(voteQueryKey);
      queryClient.setQueryData(voteQueryKey, [
        ...(prevVotes || []),
        voteCreateDto,
      ]);
    },

    onError: (_, __, context: any) => {
      if (context?.prevVotes) {
        queryClient.setQueryData(voteQueryKey, context.prevVotes);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(voteQueryKey);
      toast("Vote Created Successfully!");
    },
    mutationFn: voteCreate,
  });
};
