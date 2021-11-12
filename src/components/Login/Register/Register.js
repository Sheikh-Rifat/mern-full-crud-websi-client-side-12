import React from "react";
import { Alert, Col, Container, Row, Spinner } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import useAuth from "../../../hooks/useAuth";
import registerImg from "../../../images/undraw_Access_account_re_8spm.png";

const Register = () => {
  const { registerUser, isLoading, authError } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const history = useHistory();
  const onSubmit = (data) => {
    if (data.password !== data.reTypePassword) {
      toast.warn("Password Didn't match");
      return;
    }
    if (data.password.length < 6) {
      toast.warn("Password should be at least 6 charecters");
      return;
    }

    registerUser(data.email, data.password, data.name, history);
    toast.success("User Created Successfully");

    console.log(data);
  };
  return (
    <div>
      <Container>
        <Row>
          <Col sm={12} md={6}>
            <div className="my-5 py-5">
              <img src={registerImg} alt="log in" className="img-fluid" />
            </div>
          </Col>

          <Col sm={12} md={6}>
            <div className="my-5 py-5">
              <div className="mt-5 pt-5 mb-4">
                <h3>Sign Up</h3>
              </div>
              <div>
                {!isLoading && (
                  <form
                    className="d-flex flex-column"
                    onSubmit={handleSubmit(onSubmit)}
                  >
                    <input
                      type="text"
                      className="my-2"
                      placeholder="Full Name"
                      {...register("name", { required: true })}
                    />
                    {errors.name && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}

                    <input
                      type="email"
                      className="my-2"
                      placeholder="Enter a valid email"
                      {...register("email", { required: true })}
                    />
                    {errors.email && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                    <input
                      type="password"
                      placeholder="Enter a password"
                      className="my-2"
                      {...register("password", { required: true })}
                    />
                    {errors.password && (
                      <span className="text-danger">
                        This field is required
                      </span>
                    )}
                    <input
                      type="password"
                      placeholder="Re-type your password"
                      className="my-2"
                      {...register("reTypePassword", { required: true })}
                    />
                    {errors.reTypePassword && (
                      <span className="text-danger">
                        Please Re-Type your password
                      </span>
                    )}
                    <ToastContainer />
                    <input className="my-2" type="submit" value="Register" />
                  </form>
                )}
                {isLoading && <Spinner animation="grow" variant="secondary" />}
                {authError && <Alert variant="danger">{authError}</Alert>}

                <p className=" text-center mt-3">
                  Already have an Account? <Link to="/login"> LogIn</Link>
                </p>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Register;
