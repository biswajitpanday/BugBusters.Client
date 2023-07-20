import { Spinner } from "react-bootstrap";
import { UserProfileComponent } from "../users/components/userProfile/UserProfileComponent";
import { DataNotFound } from "../misc/DataNotFound";
import { useUser } from "@/lib/Auth";
import { ContentLayout } from "@/components/layout";

export const Profile = () => {
  const userQuery = useUser();

  userQuery.isLoading && <Spinner />;
  if (!userQuery.data) return <DataNotFound />;

  //Todo: Statistic:  [Question Asked, Answered Question, UpVoteCount, DownVoteCount]
  //Todo: Profile Edit [FirstName, MiddleName, LastName, DateOfBirth, Address, Bio]
  return (
    <ContentLayout title={""}>
      <UserProfileComponent data={userQuery.data} />
    </ContentLayout>
  );
};
