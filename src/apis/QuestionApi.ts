import {
  apiQuestionCreate,
  apiQuestionGet,
  apiQuestionGetById,
} from "@/constant";
import { axios } from "@/lib/AxiosInterceptor";
import { QuestionCreateDto, QuestionResponse } from "@/types";

export const getAll = async (): Promise<QuestionResponse> => {
  return await axios.get(apiQuestionGet);
};

export const getById = async (id: string): Promise<QuestionResponse> => {
  return await axios.get(`${apiQuestionGetById}/${id}`);
};

export const create = async (request: QuestionCreateDto) => {
  const body = JSON.stringify(request);
  return await axios.post(apiQuestionCreate, body);
};
