import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
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
  a;
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

  const editorConfiguration = {
    // toolbar: ["bold", "italic"],
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

        <CKEditor
          editor={ClassicEditor}
          config={editorConfiguration}
          data="<p>Tell Me your problem please...</p>"
          onReady={(editor) => {
            // You can store the "editor" and use when it is needed.
            console.log("Editor is ready to use!", editor);
            //editor.ui.view.editable.editableElement.style.height = '300px';
          }}
          onChange={(event, editor) => {
            const data = editor.getData();
            setQuestionCreateData({ ...questionCreateData, body: data });
            console.log("onChange: " + { event, editor, data });
            console.log("State : " + data);
          }}
          onBlur={(event, editor) => {
            console.log("Blur.", editor);
          }}
          onFocus={(event, editor) => {
            console.log("Focus.", editor);
          }}
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
    </>
  );
};
