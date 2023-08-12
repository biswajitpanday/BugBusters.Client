import { AppRouteConstant } from "@/constant";
import { useLogin } from "@/lib/Auth";
import { LoginDto } from "@/types";
import { ChangeEvent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Auth.Style.scss";
import { Button, Spinner } from "react-bootstrap";

export const LoginForm = () => {
  const [disabled, setDisabled] = useState(true);
  const [loginCredentials, setLoginCredentials] = useState<LoginDto>({
    email: "",
    password: "",
  });
  const login = useLogin();
  const navigate = useNavigate();

  useEffect(() => {
    if(loginCredentials.email !== '' &&  loginCredentials.password !== '') 
      setDisabled(false);
    else setDisabled(true);
  }, [loginCredentials.email, loginCredentials.password])

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, name } = e.target;
    setLoginCredentials({ ...loginCredentials, [name]: value });
  };
  const handleSubmit = async (e: { preventDefault: () => void }) => {
    const res = await login.mutateAsync({ ...loginCredentials });
    login.isLoading && <Spinner />;
    res?.id && navigate(AppRouteConstant.Questions());
  };

  return (
    <div className="Auth-form-container">
      <form className="Auth-form">
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign In</h3>
          <div className="text-center">
            Not registered yet?{" "}
            <Link className="link-primary" to={AppRouteConstant.Registration()}>
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
            <Button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
              disabled={login.isLoading || disabled}
            >
              Login
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
