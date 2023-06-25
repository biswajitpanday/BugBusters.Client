import { ContentLayout } from "@/components/layout";
import { CkEditor } from "./components/ckEditor/CkEditor";


export const AskQuestion = () => {
  const editorConfiguration = {
    // toolbar: ["bold", "italic"],
  };

  return (
    <>
      <ContentLayout title="Ask Question">
        <CkEditor />
      </ContentLayout>
    </>
  );
};
