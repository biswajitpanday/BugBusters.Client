import { ContentLayout } from "@/components/layout";
import { CkEditor } from "./components/ckEditor/CkEditor";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";


export const AskQuestion = () => {
  const editorConfiguration = {
    // toolbar: ["bold", "italic"],
  };

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout title="Ask Question">
        <CkEditor />
      </ContentLayout>
    </Authorization>
  );
};
