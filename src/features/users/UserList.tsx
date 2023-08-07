import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import { Card, Col, Row } from "react-bootstrap";
import { useAppUsers } from "./api/User.api";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import {
  EnvelopeAt,
  GeoAlt,
  PersonBoundingBox,
  PhoneFlip,
} from "react-bootstrap-icons";
import { DataNotFound } from "../misc/DataNotFound";
import { ErrorComponent } from "../misc/ErrorComponent";
import { Spinner } from "@/components/elements/spinner";

export const UserList = () => {
  const userQuery = useAppUsers();
  const {
    isLoading,
    isSuccess,
    isError,
    error,
    data,
    isFetching,
  } = userQuery;

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      {isLoading ? (
        <Spinner />
      ) : isFetching ? (
        <Spinner type="component" />
      ) : isError ? (
        <ErrorComponent message={error} />
      ) : isSuccess ? (
      <ContentLayout title="User List">
        <Row>
          {data.map((item) => {
            const {
              fullName,
              email,
              userName,
              address,
              phoneNumber,
            } = item;

            return (
              <Col xs={3} key={item.id} className="mt-2">
                <Card className="h-100">
                  <Card.Body>
                    <div>
                      <PersonBoundingBox className="me-2" />
                      <Link
                        to={`${AppRouteConstant.Users()}/${item.id}`}
                        className="underline-none"
                      >
                        {fullName == null ? `@${userName}` : fullName} 
                      </Link>
                    </div>

                    <div>
                      <EnvelopeAt className="me-2" />
                      {email}
                    </div>

                    {address && (
                      <div>
                        <GeoAlt className="me-2" />
                        {address}
                      </div>
                    )}

                    {phoneNumber && (
                      <div>
                        <PhoneFlip className="me-2" />
                        {phoneNumber}
                      </div>
                    )}
                  </Card.Body>
                </Card>
              </Col>
            );
          })}
        </Row>
      </ContentLayout>
      ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};
