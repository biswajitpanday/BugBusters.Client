import { Button, Container } from "react-bootstrap";
import { useCreateQuestion } from "../../api/Question.api";
import { QuestionCreateDto } from "@/types";
import { useState, ChangeEvent, useEffect, useRef } from "react";
import { toast } from "react-toastify";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_API_KEY } from "@/config";
import { useNavigate } from "react-router-dom";
import { AppRouteConstant } from "@/constant";

export const TinyMceEditor = () => {
  const createQuestionQuery = useCreateQuestion();
  const navigate = useNavigate();
  const [questionCreateData, setQuestionCreateData] =
    useState<QuestionCreateDto>({
      title: "",
      body: "",
    });

  const editorRef = useRef(null);

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
    console.log("submit clicked...");
    const res = await createQuestionQuery.mutateAsync({
      ...questionCreateData,
    });
    if(res !== null)
        navigate(AppRouteConstant.Questions());
  };

  return (
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

      <Editor
        apiKey={TINY_MCE_API_KEY}
        onInit={(evt, editor: any) => (editorRef.current = editor)}
        initialValue=""
        init={{
          icons: "thin",
          height: 500,
          menubar: false,
          plugins: [
            "advlist",
            "autolink",
            "lists",
            "link",
            "image",
            "charmap",
            "preview",
            "anchor",
            "searchreplace",
            "visualblocks",
            "code",
            "fullscreen",
            "insertdatetime",
            "media",
            "table",
            "code",
            "codesample",
            "help",
            "wordcount",
          ],
          toolbar:
            "undo redo | blocks | " +
            "bold italic forecolor | alignleft aligncenter " +
            "alignright alignjustify | bullist numlist outdent indent | " +
            "codesample | code" +
            "removeformat | help",
          content_style:
            "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        }}
        onEditorChange={handleBodyChange}
      />

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
  );
};
