import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { queryClient } from "@/lib/ReactQuery";
import { ProfileStatistic, ProfileUpdateDto, UserProfile } from "@/types";
import { UserResponse } from "@/types/UserTypes";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const userProfile = async (): Promise<UserResponse & ProfileStatistic> => {
  return await axios.get(`${ApiRouteConstant.User.Profile()}`);
};

const userProfileUpdate = async (request: ProfileUpdateDto) => {
  const body = JSON.stringify(request);
  return await axios.put(`${ApiRouteConstant.User.ProfileUpdate()}`, body);
};

const userGetAll = async (): Promise<UserResponse[]> => {
  return await axios.get(ApiRouteConstant.User.Root());
};

const userGetById = async (id: string): Promise<UserResponse & ProfileStatistic> => {
  return await axios.get(`${ApiRouteConstant.User.Root()}${id}`);
};

const userProfileQueryKey = ["userProfile"];
const userProfileUpdateQueryKey = ["userProfileUpdate"];
const usersQueryKey = ["users"];
const userQueryKey = ["user"];

export const useUserProfile = () => {
  return useQuery({
    queryKey: userProfileQueryKey,
    queryFn: () => userProfile(),
  });
};

export const useProfileUpdate = () => {
  return useMutation({
    onMutate: async (profileUpdateDto: ProfileUpdateDto) => {
      await queryClient.cancelQueries({ queryKey: userProfileUpdateQueryKey });
      const prevProfile =
        queryClient.getQueryData<UserProfile>(userProfileUpdateQueryKey);
      queryClient.setQueryData(userProfileUpdateQueryKey, [
        prevProfile || undefined,
        profileUpdateDto,
      ]);
      return { prevProfile };
    },

    onError: (_, __, context: any) => {
      if (context?.prevProfile) {
        queryClient.setQueryData(userProfileUpdateQueryKey, context?.prevProfile);
      }
    },

    onSuccess: () => {
      queryClient.invalidateQueries(userProfileUpdateQueryKey);
      toast("Profile Updated Successfully!");
    },
    mutationFn: userProfileUpdate,
  });
};

export const useAppUsers = () => {
  return useQuery({
    queryKey: usersQueryKey,
    queryFn: () => userGetAll(),
  });
};

export const useAppUser = (userId: string) => {
  return useQuery({
    queryKey: [userQueryKey, userId],
    queryFn: () => userGetById(userId),
  });
};