import { ContentLayout } from "@/components/layout";
import { CkEditor } from "./components/ckEditor/CkEditor";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import { Forbidden } from "../misc";


export const AskQuestion = () => {
  const editorConfiguration = {
    // toolbar: ["bold", "italic"],
  };

  return (
    <Authorization allowedRoles={[Roles.User]} forbiddenFallback={<Forbidden />}>
      <ContentLayout title="Ask Question">
        <CkEditor />
      </ContentLayout>
    </Authorization>
  );
};
