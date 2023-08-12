import { Spinner } from "@/components/elements/spinner";
import { ContentLayout } from "@/components/layout";
import { DataNotFound } from "@/features/misc/DataNotFound";
import { ErrorComponent } from "@/features/misc/ErrorComponent";
import { useUserProfile } from "@/features/users/api/User.api";
import { UserProfileComponent } from "@/features/users/components/userProfile/UserProfileComponent";
import { UserStatistic } from "@/features/users/components/userStatistic/UserStatistic";
import { Authorization } from "@/lib/Authorization";
import { useSearchContext } from "@/providers/SearchContext";
import { Roles } from "@/types";
import { useEffect } from "react";
import { Col, Row } from "react-bootstrap";

const UserProfilePage = () => {
  const userProfileQuery = useUserProfile();
  const { setShowSearchBar } = useSearchContext();

  useEffect(() => {
    setShowSearchBar(false);
  }, [setShowSearchBar]);

  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isFetching,
  } = userProfileQuery;

  return (
    <Authorization allowedRoles={[Roles.User, Roles.Admin]}>
      {isLoading ? (
        <Spinner />
      ) : isFetching ? (
        <Spinner type="component" />
      ) : isError ? (
        <ErrorComponent message={error} />
      ) : isSuccess ? (
        <ContentLayout title={""}>
          <Row>
            <Col sm={6}>
              <UserProfileComponent data={data} />
            </Col>
            <Col sm={6}>
              <UserStatistic data={data} />
            </Col>
          </Row>
        </ContentLayout>
      ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};

export default UserProfilePage;
