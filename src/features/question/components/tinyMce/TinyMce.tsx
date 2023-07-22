import { useRef } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { TINY_MCE_API_KEY } from "@/config";

type TinyMceProps = {
  onContentChange: Function;
  height?: number;
  showMenuBar?: boolean;
};

export const TinyMceEditor = ({ onContentChange, height = 500, showMenuBar=false }: TinyMceProps) => {
  const editorRef = useRef(null);
  const handleBodyChange = (content: any, editor: any) => {
    onContentChange(content);
  };

  return (
    <Editor
      apiKey={TINY_MCE_API_KEY}
      onInit={(evt, editor: any) => (editorRef.current = editor)}
      initialValue=""
      init={{
        icons: "thin",
        height: height,
        menubar: showMenuBar,
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
  );
};
