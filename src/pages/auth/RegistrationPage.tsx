import { ChangeEvent, useState } from "react";
import "./Auth.Style.scss";
import { RegistrationRequestDto } from "@/types/AuthTypes";
import { useRegister } from "@/lib/Auth";
import { Link } from "react-router-dom";
import { LOGIN } from "@/constant";

const RegistrationPage = () => {
  const [registerCredentials, setRegisterCredentials] = useState<RegistrationRequestDto>({
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    email: "",
    password: "",
    dateOfBirth: new Date(),
    phone: "",
    address: ""
  });
  const registration = useRegister();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    registration.mutate({...registerCredentials});
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link className="link-primary" to={LOGIN}>
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
            <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            Forgot <a href="#">password?</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default RegistrationPage;
