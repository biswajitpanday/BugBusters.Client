import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { AnswerAcceptDto, AnswerResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const answerAccept = async (request: AnswerAcceptDto) => {
  const body = JSON.stringify(request);
  return await axios.put(ApiRouteConstant.Answer.Accept(), body);
}

const answerAcceptQueryKey = ["AnswerAccept"]

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
