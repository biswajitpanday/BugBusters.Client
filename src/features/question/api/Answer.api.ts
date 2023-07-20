import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { AnswerAcceptDto, AnswerCreateDto, AnswerResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const answerAccept = async (request: AnswerAcceptDto) => {
  const body = JSON.stringify(request);
  return await axios.put<AnswerResponse>(`${ApiRouteConstant.Answer.Accept()}/${request.id}`, body);
}

const answerCreate = async (request: AnswerCreateDto) => {
  const body = JSON.stringify(request);
  return await axios.post<AnswerResponse>(ApiRouteConstant.Answer.Create(), body);
}

const answerAcceptQueryKey = ["AnswerAccept"];
const answerCreateQueryKey = ["AnswerCreate"];

export const useAnswerCreate = () => {
  return useMutation({
    onMutate: async (answerCreateDto: AnswerCreateDto) => {
      await queryClient.cancelQueries({ queryKey: answerCreateQueryKey });
      const prevAnswer =
        queryClient.getQueryData<AnswerResponse[]>(answerCreateQueryKey);
      queryClient.setQueryData(answerCreateQueryKey, [
        ...(prevAnswer || []),
        answerCreateDto,
      ]);
      return { prevAnswer };
    },

    onError: (_, __, context: any) => {
      if (context?.prevAnswer) {
        queryClient.setQueryData(answerCreateQueryKey, context?.prevAnswer);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(answerCreateQueryKey);
      toast("Answer Created Successfully!");
    },
    mutationFn: answerCreate,
  });
}


export const useAnswerAccept = () => {
  return useMutation({
    onMutate: async (answerAcceptDto: AnswerAcceptDto) => {
      await queryClient.cancelQueries({ queryKey: answerAcceptQueryKey });
      const prevAnswer =
        queryClient.getQueryData<AnswerResponse[]>(answerAcceptQueryKey);
      queryClient.setQueryData(answerAcceptQueryKey, [
        ...(prevAnswer || []),
        answerAcceptDto,
      ]);
      return { prevAnswer };
    },

    onError: (_, __, context: any) => {
      if (context?.prevAnswer) {
        queryClient.setQueryData(answerAcceptQueryKey, context?.prevAnswer);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(answerAcceptQueryKey);
      toast("Answer Accepted Successfully!");
    },
    mutationFn: answerAccept,
  });
};
