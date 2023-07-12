import { ContentLayout } from "@/components/layout";
import { Authorization } from "@/lib/Authorization";
import { Roles } from "@/types";
import { Card, Col, Row, Spinner } from "react-bootstrap";
import { useAppUsers } from "./api/User.api";
import { Link } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import {
  EnvelopeAt,
  GeoAlt,
  PersonBoundingBox,
  PhoneFlip,
} from "react-bootstrap-icons";

export const UserList = () => {
  const userQuery = useAppUsers();

  userQuery.isLoading ?? <Spinner />;
  if (!userQuery.data) return null; // todo: No data found.

  return (
    <Authorization allowedRoles={[Roles.Admin]}>
      <ContentLayout title="User List">
        <Row>
          {userQuery.data.map((item) => {
            const {
              firstName,
              middleName,
              lastName,
              email,
              userName,
              address,
              phoneNumber,
            } = item;

            let fullName = firstName || null;
            if (middleName) fullName = fullName + " " + middleName;
            if (lastName) fullName = fullName + " " + lastName;

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
                        {fullName !== null ? fullName : `@${userName}`}
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
    </Authorization>
  );
};
