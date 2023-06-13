import { ChangeEvent, useState } from "react";
import "./Auth.Style.scss";
import { RegistrationRequestDto } from "@/types/AuthTypes";
import { useRegister } from "@/lib/Auth";
import { Link } from "react-router-dom";
import { LOGIN } from "@/constant";

const RegistrationPage = () => {
  const [registrationCredentials, setRegistrationCredentials] = useState({
    email: "",
    password: "",
    firstName: "",
    middleName: "",
    lastName: "",
    userName: "",
    dateOfBirth: new Date(),
  });
  const registration = useRegister();

  //   const changeAuthMode = () => {
  //     setAuthMode(authMode === "signin" ? "signup" : "signin")
  //   }

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegistrationCredentials({ ...registrationCredentials, [name]: value });
  };

  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const registrationRequestDto: RegistrationRequestDto = {
      email: registrationCredentials.email,
      password: registrationCredentials.password,
      firstName: registrationCredentials.firstName,
      middleName: registrationCredentials.middleName,
      lastName: registrationCredentials.lastName,
      userName: registrationCredentials.userName,
      dateOfBirth: registrationCredentials.dateOfBirth
    };
    registration.mutate(registrationRequestDto);
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to={LOGIN} className="link-primary">Sign In</Link>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
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
