import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import "./CkEditor.Style.scss";
import { Container } from "react-bootstrap";

export const CkEditor = () => {
    const editorConfiguration = {
      // toolbar: ["bold", "italic"],
    };
  
    return (
      <>
        <Container>
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
              console.log({ event, editor, data });
            }}
            onBlur={(event, editor) => {
              console.log("Blur.", editor);
            }}
            onFocus={(event, editor) => {
              console.log("Focus.", editor);
            }}
          />
        </Container>
      </>
    );
  };
  