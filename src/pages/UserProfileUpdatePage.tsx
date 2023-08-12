import { Spinner } from "@/components/elements/spinner";
import { ContentLayout } from "@/components/layout";
import { AppRouteConstant } from "@/constant";
import { DataNotFound } from "@/features/misc/DataNotFound";
import { ErrorComponent } from "@/features/misc/ErrorComponent";
import { useProfileUpdate } from "@/features/users/api/User.api";
import { useUser } from "@/lib/Auth";
import { Authorization } from "@/lib/Authorization";
import { ProfileUpdateDto, Roles, UserProfile } from "@/types";
import storage from "@/utils/Storage";
import { ChangeEvent, useEffect, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const UserProfileUpdatePage = () => {
  const userQuery = useUser();
  const navigate = useNavigate();
  const profileUpdateQuery = useProfileUpdate();
  const { isLoading, isSuccess, isError, error, data, isFetching } = userQuery;
  const [profileData, setProfileData] = useState<ProfileUpdateDto>({
    firstName: data?.firstName || "",
    middleName: data?.middleName || "",
    lastName: data?.lastName || "",
    address: data?.address || "",
    phoneNumber: data?.phoneNumber || "",
  });

  useEffect(() => {
    console.log(data?.firstName);
  }, [data]);

  const handleInput = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setProfileData({ ...profileData, [name]: value });
  };

  const handleSubmit = async () => {
    const res = await profileUpdateQuery.mutateAsync({
      ...profileData,
    });
    profileUpdateQuery.isLoading && <Spinner />;
    profileUpdateQuery.isIdle && <Spinner />;
    if (res !== null) {
      const userProfile = JSON.parse(
        storage.getUserProfile() as string
      ) as UserProfile;

      userProfile.firstName = profileData.firstName;
      userProfile.middleName = profileData.middleName;
      userProfile.lastName = profileData.lastName;
      userProfile.address = profileData.address;
      userProfile.phoneNumber = profileData.phoneNumber;
      storage.setUserProfile(JSON.stringify(userProfile));
      navigate(AppRouteConstant.UserProfile());
    }
  };
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
            <Col sm={12}>
              <Form>
                <Form.Group className="mb-3" controlId="profileForm.FirstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    value={profileData?.firstName}
                    onChange={handleInput}
                    placeholder="your first name here..."
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileForm.MiddleName">
                  <Form.Label>Middle Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="middleName"
                    value={profileData?.middleName}
                    onChange={handleInput}
                    placeholder="your middle name here..."
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileForm.LastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    value={profileData?.lastName}
                    onChange={handleInput}
                    placeholder="your last name here..."
                  />
                </Form.Group>

                <Form.Group
                  className="mb-3"
                  controlId="profileForm.PhoneNumber"
                >
                  <Form.Label>Phone Number</Form.Label>
                  <Form.Control
                    type="text"
                    name="phoneNumber"
                    value={profileData?.phoneNumber}
                    onChange={handleInput}
                    placeholder="your phone number here..."
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="profileForm.Address">
                  <Form.Label>Address</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={profileData?.address}
                    onChange={handleInput}
                    placeholder="your address here..."
                  />
                </Form.Group>
                <Button
                  type="button"
                  variant="outline-primary"
                  size="sm"
                  className="mt-2"
                  onClick={() => handleSubmit()}
                  disabled={profileUpdateQuery.isLoading}
                >
                  Update Profile
                </Button>
              </Form>
            </Col>
          </Row>
        </ContentLayout>
      ) : (
        <DataNotFound />
      )}
    </Authorization>
  );
};

export default UserProfileUpdatePage;
