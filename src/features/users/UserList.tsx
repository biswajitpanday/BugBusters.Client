import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";

export const UserList = () => {
  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      <ContentLayout title="User List Title Here">
        <p>User 1</p>
        <p>User 2</p>
        <p>User 3</p>
        <p>User 4</p>
        <p>User 5</p>
      </ContentLayout>
    </Authorization>
  );
};
