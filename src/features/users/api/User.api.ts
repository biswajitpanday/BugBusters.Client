import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { ProfileStatistic } from "@/types";
import { UserResponse } from "@/types/UserTypes";
import { useQuery } from "@tanstack/react-query";

const userProfile = async (): Promise<UserResponse & ProfileStatistic> => {
  return await axios.get(`${ApiRouteConstant.User.Profile()}`);
};

const userGetAll = async (): Promise<UserResponse[]> => {
  return await axios.get(ApiRouteConstant.User.Root());
};

const userGetById = async (id: string): Promise<UserResponse & ProfileStatistic> => {
  return await axios.get(`${ApiRouteConstant.User.Root()}${id}`);
};

const userProfileQueryKey = ["userProfile"];
const usersQueryKey = ["users"];
const userQueryKey = ["user"];

export const useUserProfile = () => {
  return useQuery({
    queryKey: userProfileQueryKey,
    queryFn: () => userProfile(),
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