import React from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory, useLocation } from "react-router";
import { Link } from "react-router-dom";
import useAuth from "../../../hooks/useAuth";
import loginImg from "../../../images/undraw_Login_re_4vu2.png";

const Login = () => {
  const { user, loginUser, isLoading, authError } = useAuth();
  const {
    register,
    handleSubmit,

    formState: { errors },
  } = useForm();
  const location = useLocation();
  const history = useHistory();
  const onSubmit = (data) => {
    loginUser(data.email, data.password, location, history);
    // console.log(data);
  };
  return (
    <Container>
      <Row>
        <Col sm={12} md={6}>
          <div className="my-5 py-5">
            <img src={loginImg} alt="log in" className="img-fluid" />
          </div>
        </Col>

        <Col sm={12} md={6}>
          <div className="my-5 py-5">
            <div className="mt-5 pt-5 mb-4">
              <h3>User Login</h3>
            </div>
            <div>
              <form
                className="d-flex flex-column"
                onSubmit={handleSubmit(onSubmit)}
              >
                <input
                  type="email"
                  className="my-2"
                  placeholder="Enter your email"
                  {...register("email", { required: true })}
                />
                {errors.email && (
                  <span className="text-danger">This field is required</span>
                )}
                <input
                  type="password"
                  placeholder="Enter your password"
                  className="my-2"
                  {...register("password", { required: true })}
                />
                {errors.password && (
                  <span className="text-danger">This field is required</span>
                )}

                <input className="my-2" type="submit" value="Log In" />
              </form>
              {isLoading && <Spinner animation="grow" variant="secondary" />}
              {authError && <Alert variant="danger">{authError}</Alert>}
              {user?.email && (
                <Alert variant="success">Logged in Successfully</Alert>
              )}
              <p className=" text-center mt-3">
                Don't have an Account? <Link to="/register"> Sign Up</Link>
              </p>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
