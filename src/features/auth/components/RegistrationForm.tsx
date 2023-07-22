import { ChangeEvent, useEffect, useState } from "react";
import { RegistrationDto } from "@/types/AuthTypes";
import { useRegister } from "@/lib/Auth";
import { Link, useNavigate } from "react-router-dom";
import { AppRouteConstant } from "@/constant";
import "./Auth.Style.scss";
import { Button, Spinner } from "react-bootstrap";
import { DataNotFound } from "@/features/misc/DataNotFound";

export const RegistrationForm = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [registerCredentials, setRegisterCredentials] =
    useState<RegistrationDto>({
      firstName: "",
      middleName: "",
      lastName: "",
      userName: "",
      email: "",
      password: "",
      dateOfBirth: new Date(),
      phone: "",
      address: "",
    });
  const registration = useRegister();

  useEffect(() => {
    if(registerCredentials.email !== '' &&  registerCredentials.userName !== '' && registerCredentials.password !== '') 
      setDisabled(false);
    else setDisabled(true);
  }, [registerCredentials.email, registerCredentials.userName, registerCredentials.password])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const res = await registration.mutateAsync({ ...registerCredentials });

    registration.isLoading && <Spinner />;
    res?.id && navigate(AppRouteConstant.Questions());
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link className="link-primary" to={AppRouteConstant.Login()}>
              Sign In
            </Link>
          </div>
          {/* <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="firstName"
              value={registerCredentials?.firstName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Middle Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="middleName"
              value={registerCredentials?.middleName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Last Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="lastName"
              value={registerCredentials?.lastName}
              onChange={handleChange}
            />
          </div> */}
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
              name="email"
              value={registerCredentials.email}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Username</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g janedoe007"
              name="userName"
              value={registerCredentials.userName}
              onChange={handleChange}
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
              name="password"
              value={registerCredentials.password}
              onChange={handleChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={registration.isLoading || disabled}
            >
              Register
            </Button>
          </div>
          <p className="text-center mt-2">
            Forgot <Link to="#">password?</Link>
          </p>
        </div>
      </form>
    </div>
  );
};
