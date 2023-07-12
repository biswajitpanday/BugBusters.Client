import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { UserResponse } from "@/types/UserTypes";
import { useQuery } from "@tanstack/react-query";

const userGetAll = async (): Promise<UserResponse[]> => {
  return await axios.get(ApiRouteConstant.User.Root());
};

const userGetById = async (id: string): Promise<UserResponse> => {
  return await axios.get(`${ApiRouteConstant.User.Root()}${id}`);
};

const usersQueryKey = ["users"];
const userQueryKey = ["user"];

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