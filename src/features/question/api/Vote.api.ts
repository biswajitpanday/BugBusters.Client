import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { VoteCreateDto, VoteResponse } from "@/types";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

const voteCreate = async (request: VoteCreateDto) : Promise<VoteResponse[]> => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Vote.Root(), body);
}

const voteQueryKey = ["vote"]

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
      return { prevVotes };
    },

    onError: (_, __, context: any) => {
      if (context?.prevVotes) {
        queryClient.setQueryData(voteQueryKey, context?.prevVotes);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(voteQueryKey);
      toast("Vote Created Successfully!");
    },

    mutationFn: voteCreate,
  });
};
