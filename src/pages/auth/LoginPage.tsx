import { ChangeEvent, useState } from "react";
import "./Auth.Style.scss";
import { LoginRequestDto } from "@/types/AuthTypes";
import { useLogin } from "@/lib/Auth";
import { Link } from "react-router-dom";
import { SIGNUP } from "@/constant";

const LoginPage = () => {
  const [loginCredentials, setLoginCredentials] = useState<LoginRequestDto>({
    email: "",
    password: "",
  });
  const login = useLogin();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    login.mutate({...loginCredentials});
  };

  return (
    <div className="Auth-form-container">
        <form className="Auth-form">
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Sign In</h3>
            <div className="text-center">
              Not registered yet?{" "}
              <Link className="link-primary" to={SIGNUP}>
                Sign Up
              </Link>
            </div>
            <div className="form-group mt-3">
              <label>Email address</label>
              <input
                type="text"
                className="form-control mt-1"
                placeholder="Enter email"
                name="email"
                value={loginCredentials.email}
                onChange={handleChange}
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
                onChange={handleChange}
              />
            </div>
            <div className="d-grid gap-2 mt-3">
              <button
                type="button"
                className="btn btn-primary"
                onClick={handleSubmit}
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
};

export default LoginPage;
