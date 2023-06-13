import { ChangeEvent, useRef, useState } from "react";
import "./Auth.Style.scss";
import { LoginRequestDto, RegistrationRequestDto } from "@/types/AuthTypes";
import { useLogin, useRegister } from "@/lib/Auth";

const AuthPage = () => {
  const [authMode, setAuthMode] = useState("signin");
  const [loginCredentials, setLoginCredentials] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });
  const login = useLogin();

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
  const register = useRegister();

  const changeAuthMode = () => {
    setAuthMode(authMode === "signin" ? "signup" : "signin");
  };

  if (authMode === "signin") {
    const handleLoginOnChange = (e: ChangeEvent<HTMLInputElement>) => {
      const { value, name } = e.target;
      setLoginCredentials({ ...loginCredentials, [name]: value });
    };
    const handleLoginSubmit = async (e: { preventDefault: () => void }) => {
      const loginRequestDto: LoginRequestDto = {
        email: loginCredentials.email,
        password: loginCredentials.password,
      };
      login.mutateAsync(loginRequestDto);
    };
    return (
      <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <span className="link-primary" onClick={changeAuthMode}>
                Sign Up
              </span>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
                value={loginCredentials.email}
                onChange={handleLoginOnChange}
              />
            </div>
            <div className="form-group mt-3">
              <label>Password</label>
              <input
                type="password"
                className="form-control mt-1"
                placeholder="Enter password"
                name="password"
                value={loginCredentials.password}
                onChange={handleLoginOnChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleLoginSubmit}
              >
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
  }

  const handleRegisterOnChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setRegisterCredentials({ ...registerCredentials, [name]: value });
  };
  const handleRegisterSubmit = async (e: { preventDefault: () => void }) => {
    register.mutateAsync({...registerCredentials});
  };
  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Already registered?{" "}
            <span className="link-primary" onClick={changeAuthMode}>
              Sign In
            </span>
          </div>
          {/* <div className="form-group mt-3">
            <label>First Name</label>
            <input
              type="text"
              className="form-control mt-1"
              placeholder="e.g Jane Doe"
              name="firstName"
              value={registerCredentials?.firstName}
              onChange={handleRegisterOnChange}
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
              onChange={handleRegisterOnChange}
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
              onChange={handleRegisterOnChange}
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
              onChange={handleRegisterOnChange}
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
              onChange={handleRegisterOnChange}
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
              onChange={handleRegisterOnChange}
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary" onClick={handleRegisterSubmit}>
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

export default AuthPage;
