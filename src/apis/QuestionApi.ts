import { ApiRouteConstant } from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { QuestionCreateDto, QuestionResponse } from "@/types";

export const getAll = async (): Promise<QuestionResponse> => {
  return await axios.get(ApiRouteConstant.Question.Root());
};

export const getById = async (id: string): Promise<QuestionResponse> => {
  return await axios.get(`${ApiRouteConstant.Question.Root()}/${id}`);
};

export const create = async (request: QuestionCreateDto) => {
  const body = JSON.stringify(request);
  return await axios.post(ApiRouteConstant.Question.Root(), body);
};
