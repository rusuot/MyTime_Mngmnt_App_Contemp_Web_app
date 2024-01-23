// Ref links:
// 1. https://react-bootstrap.netlify.app/docs/forms/overview/
// 2. https://getbootstrap.com/docs/4.1/components/forms/
// 3. https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01
// imports
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";

import { doLogin } from "../../authReactH/Login";
import { retrieveErrorMessage } from "Functions/functions";

const Login = () => {
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { login, isLoading } = doLogin();

  const handleSubmit = async (e) => {
    e.preventDefault();
    let error = await login(form.email, form.password);
    if (error) {
      return toast.error(retrieveErrorMessage(error));
    }

    toast.success("User logged in successfully!")
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveData = () => {
    setForm({
      email: "",
      password: "",
    });
  };

  return (
    <div className="login-container">
      <Form onSubmit={handleSubmit} className="login-form shadow">
        <h3 className="text-center fw-bold mb-4">Login Form</h3>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Please insert your e-mail address..</Form.Label>
          <Form.Control
            type="email"
            placeholder="test@test.com"
            onChange={handleChange}
            name="email"
            value={form.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>And the password..</Form.Label>
          <Form.Control
            type="password"
            placeholder="your password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="password"
            value={form.password}
            required
          />
        </Form.Group>
        <button
          type="submit"
          disabled={isLoading}
          className="my-2 login-button"
        >
          {!isLoading ? "Login" : "Loading.."}
        </button>
        <button
          type="reset"
          className="ms-3 my-2 removedata-button"
          onClick={handleRemoveData}
        >
          Clean inserted inputs
        </button>
        <p className="text-center mt-3">
          You don't have an account?{" "}
          <Link to={"/signup"} className="register-btn">
            Register
          </Link>
        </p>
      </Form>
    </div>
  );
};
export default Login;
