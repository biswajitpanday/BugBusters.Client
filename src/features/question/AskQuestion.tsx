import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { QuestionCreateDto, Roles } from "@/types";
import { TinyMceEditor } from "./components/tinyMce/TinyMce";
import { ChangeEvent, useState } from "react";
import { useCreateQuestion } from "./api/Question.api";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { AppRouteConstant } from "@/constant";
import { Button } from "react-bootstrap";

export const AskQuestion = () => {
  const createQuestionQuery = useCreateQuestion();
  const navigate = useNavigate();
  const [questionCreateData, setQuestionCreateData] =
    useState<QuestionCreateDto>({
      title: "",
      body: "",
    });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setQuestionCreateData({ ...questionCreateData, [name]: value });
  };

  const handleBodyChange = (content: any, editor: any) => {
    setQuestionCreateData({ ...questionCreateData, body: content });
  };

  const handleSubmit = async () => {
    if (questionCreateData.title === null || questionCreateData.title === "") {
      toast("Title can't be empty!");
      return;
    }
    const res = await createQuestionQuery.mutateAsync({
      ...questionCreateData,
    });
    if (res !== null) navigate(AppRouteConstant.Questions());
  };
  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout title="Ask Question">
        <form className="mb-3">
          <div className="form-group mt-3">
            <input
              type="text"
              className="form-control bg-white"
              placeholder="Question Title Here..."
              name="title"
              value={questionCreateData.title}
              onChange={handleTitleChange}
              required={true}
            />
          </div>
        </form>

        <TinyMceEditor onContentChange={handleBodyChange} />
        
        <Button
          type="button"
          variant="outline-primary"
          size="sm"
          className="mt-2"
          onClick={() => handleSubmit()}
          disabled={createQuestionQuery.isLoading}
        >
          Post Your Question
        </Button>
      </ContentLayout>
    </Authorization>
  );
};
