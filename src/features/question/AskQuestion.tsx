import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import { TinyMceEditor } from "./components/tinyMce/TinyMce";

export const AskQuestion = () => {
  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      <ContentLayout title="Ask Question">
        <TinyMceEditor />
      </ContentLayout>
    </Authorization>
  );
};
