import { ContentLayout } from "@/components/layout";
import { DataNotFound } from "@/features/misc/DataNotFound";
import { useUserProfile } from "@/features/users/api/User.api";
import { UserProfileComponent } from "@/features/users/components/userProfile/UserProfileComponent";
import { UserStatistic } from "@/features/users/components/userStatistic/UserStatistic";
import { Col, Row, Spinner } from "react-bootstrap";

const UserProfilePage = () => {
  const userProfileQuery = useUserProfile();

  userProfileQuery.isLoading && <Spinner />;
  if (!userProfileQuery.data) return <DataNotFound />;

  //Todo: Profile Edit [FirstName, MiddleName, LastName, DateOfBirth, Address, Bio]
  return (
    <ContentLayout title={""}>
      <Row>
        <Col sm={6}>
          <UserProfileComponent data={userProfileQuery.data} />
        </Col>
        <Col sm={6}>
          <UserStatistic data={userProfileQuery.data} />
        </Col>
      </Row>
    </ContentLayout>
  );
};

export default UserProfilePage;
