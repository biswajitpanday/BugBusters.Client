import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import { Col, Row, Spinner } from "react-bootstrap";
import { useAppUsers } from "./api/User.api";

export const UserList = () => {
  const userQuery = useAppUsers();

  userQuery.isLoading ?? <Spinner />;
  if (!userQuery.data) return null; // todo: No data found.

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      <ContentLayout title="User List">
        <Row>
          {userQuery.data.map((item) => (
            <Col xs={3} key={item.id}>
              <div>
                {(item.firstName || item.middleName || item.lastName) != null ??
                  `Name: ${item.firstName || ""} ${item.middleName || ""} ${
                    item.lastName || ""
                  } `}
              </div>
              <div>{item.email !== null ?? `Email: ${item.email}`}</div>
              <div>{item.userName ?? `UserName: ${item.userName}`}</div>
              <div>{item.phoneNumber ?? `Phone: ${item.phoneNumber}`}</div>
            </Col>
          ))}
        </Row>
      </ContentLayout>
    </Authorization>
  );
};
