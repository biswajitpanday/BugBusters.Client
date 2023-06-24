import { ContentLayout } from "@/components/layout";

import { TINY_MCE_API_KEY } from "@/config";
import { Editor } from "@tinymce/tinymce-react";
import { CkEditor } from "./components/ckEditor/CkEditor";


export const AskQuestion = () => {
  // const handleEditorChange = (content: any, editor: any) => {
  //   console.log("Content was updated:", content);
  // };

  const editorConfiguration = {
    // toolbar: ["bold", "italic"],
  };

  return (
    <>
      <ContentLayout title="Ask Question">
        
        <CkEditor />

        {/* <Editor
          apiKey="qagffr3pkuv17a8on1afax661irst1hbr4e6tbv888sz91jc"
          // initialValue="<p>This is the initial content of the editor</p>"
          init={{
            skin: "snow",
            icons: "thin",
            placeholder: "Ask a question or post an update...",

            height: 600,
            menubar: true,
            plugins: [
              "advlist autolink lists link image charmap print preview anchor",
              "searchreplace visualblocks code fullscreen textcolor ",
              "insertdatetime media table paste code help wordcount",
            ],
            textcolor_rows: "4",

            toolbar:
              "undo redo | styleselect | fontsizeselect| code | bold italic | alignleft aligncenter alignright alignjustify | outdent indent ",
          }}
          onEditorChange={handleEditorChange}

          //outputFormat="html"
          // toolbar="code"
        /> */}
      </ContentLayout>
    </>
  );
};
