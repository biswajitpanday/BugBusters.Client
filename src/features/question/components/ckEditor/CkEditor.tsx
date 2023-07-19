import "./CkEditor.Style.scss";
import { Button, Container } from "react-bootstrap";
import { useCreateQuestion } from "../../api/Question.api";
import { QuestionCreateDto } from "@/types";
import { useState, ChangeEvent } from "react";
import { toast } from "react-toastify";

export const CkEditor = () => {
  const createQuestionQuery = useCreateQuestion();
  const [questionCreateData, setQuestionCreateData] =
    useState<QuestionCreateDto>({
      title: "",
      body: "",
    });

  const handleTitleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setQuestionCreateData({ ...questionCreateData, [name]: value });
  };

  const handleSubmit = async () => {
    if (questionCreateData.title === null || questionCreateData.title === "") {
      toast("Title can't be empty!");
      return;
    }
    console.log("submit clicked...");
    const res = await createQuestionQuery.mutateAsync({
      ...questionCreateData,
    });
    console.log(res);
  };

  return (
    <>
      <Container>
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

        <Button
          type="button"
          variant="outline-primary"
          size="sm"
          className="mt-2"
          onClick={() => handleSubmit()}
        >
          Submit
        </Button>
      </Container>
    </>
  );
};
