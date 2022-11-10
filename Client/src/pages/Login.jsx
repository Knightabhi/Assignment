import React, { useState,useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
  FormGroup,
  Label,
  Card,
   CardBody
} from "reactstrap";
import { Formik, Form } from "formik";
import { Input, Submit } from "formstrap";
import * as api from "../api";

const RegisterForm =()=> {
  // const [showPassword, setShowPassword] = useState(false);
  // const handleShowPassword = () => setShowPassword(!showPassword);
  const history = useHistory();
  const data = {
    firstName: "",
    email: "",
    lastName: "",
    password: "",
    confirmPassword: "",
    contact: "",
  };

  const onValidate = (values) => {
    const errors = {};
    const EMAIL_REGEX = /\S+@\S+\.\S+/;

    if (!values.name.trim()) {
      errors.name = "Please enter your name";
    }

    if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!values.password.trim()) {
      errors.password = "Password cannot be empty";
    } else if (values.password.length < 3) {
      errors.password = "Password cannot be less than 3 characters";
    }

    if (values.password !== values.confirmPassword) {
      errors.confirmPassword = "Passwords don't match";
    }

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const newUser = await api.register(values);
    localStorage.setItem("profile", newUser.data.token);
    setSubmitting(false);
    // setUser(newUser.data.userData);
    history.push("/");
  };

  return (
    <Formik initialValues={data} validate={onValidate} onSubmit={onSubmit}>
      <Form>
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1" for="firstName">
            First Name
          </Label>
          <Input name="name" type="text" placeholder="John " />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1" for="email">
            Email
          </Label>
          <Input name="email" type="email" placeholder="user@example.com" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1" for="lastName">
            Last Name
          </Label>
          <Input name="company" type="text" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1" for="password">
            Create Password
          </Label>
          <Input name="password" type="password" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1" for="confirmPassword">
            Confirm Password
          </Label>
          <Input name="confirmPassword" type="password" />
        </FormGroup>
        <FormGroup>
          <Submit withSpinner outline className="dark-btn">
            Register
          </Submit>
        </FormGroup>
      </Form>
    </Formik>
  );
};

const LoginForm = () => {
  // const [showPassword, setShowPassword] = useState(false);
  // const handleShowPassword = () => setShowPassword(!showPassword);
const history = useHistory();
  const data = { email: "", password: "" };

  const onValidate = (values) => {
    const errors = {};
    const EMAIL_REGEX = /\S+@\S+\.\S+/;

    if (!EMAIL_REGEX.test(values.email)) {
      errors.email = "Please enter a valid email";
    }

    if (!values.password.trim()) {
      errors.password = "Password cannot be empty";
    } else if (values.password.length < 3) {
      errors.password = "Password cannot be less than 3 characters";
    }

    return errors;
  };

  const onSubmit = async (values, { setSubmitting }) => {
    const newUser = await api.login(values);
    localStorage.setItem("profile", newUser.data.token);
    setSubmitting(false);
    //setUser(newUser.data.userData);
    history.push("/");
  };

  return (
    <Formik initialValues={data} validate={onValidate} onSubmit={onSubmit}>
      <Form >
        <FormGroup className="mb-3">
          <Label className="mb-1 mx-1 " for="email">
            Email
          </Label>
          <Input name="email" type="email" placeholder="user@example.com" />
        </FormGroup>
        <FormGroup className="mb-3">
          <Label className="mb-1" for="password">
            Password
          </Label>
          <Input name="password" type="password" />
        </FormGroup>
        <Submit withSpinner outline className="dark-btn">
          Login
        </Submit>
      </Form>
    </Formik>
  );
};

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const history = useHistory();
  const getUser = async () => {
    await api
    .fetchUser()
    .then(({ data }) => {
        history.push("/");
    })
    .catch((err) => {
      console.log(err);
      localStorage.removeItem("profile");
    });
  }

  useEffect(() => {
    getUser();
  }, );
  const switchMode = () => setIsLogin(!isLogin);

  return (
    <Card className="mx-auto mt-5 mb-5" style={{ maxWidth: "500px",height: "88vh" }}>
      {/* <CardHeader>
        {isLogin ? "Login" : "Register"}
      </CardHeader> */}
      <CardBody className="login-form">
        {isLogin ? (
          <LoginForm  />
        ) : (
          <RegisterForm  />
        )}
         <div
            onClick={switchMode}
            className="login-toggle-btn mt-3"
          >
            {isLogin
              ? "Don't have an account? Register"
              : "Already have an account? Login"}
          </div>
      </CardBody>
    </Card>

  );
};

export default Login;