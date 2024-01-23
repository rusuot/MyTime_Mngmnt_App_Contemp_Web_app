// Ref links:
// 1. https://react-bootstrap.netlify.app/docs/forms/overview/
// 2. https://getbootstrap.com/docs/4.1/components/forms/
// 3. https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01
// imports
import { toast } from "react-toastify";
import { useState } from "react";
import { Link } from "react-router-dom";
import Form from "react-bootstrap/Form";
import { userSignup } from "../../authReactH/Signup";
import { retrieveErrorMessage } from "Functions/functions";

const Signup = () => {
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const { signup, isLoading } = userSignup();

  const handleSubmit = async (e) => {
    e.preventDefault();
// insert check in form, for pass to be at least 5 characters long
    if (form.password.length < 5) {
      toast.error("pass field require at least 5 characters");
      return;
    }
// insert check in form, for pass to be match with confirmed password
//  otherwise raise an error message - as a toast in top center screen
    if (form.password !== form.confirmPassword) {
      setForm({ ...form, confirmPassword: "" });
      toast.error("passwords does not correspond");
      return;
    }

    let error = await signup(form.email, form.password, form.username);

    if (error) {
      return toast.error(retrieveErrorMessage(error));
    }
// return a success message in case signup was successfully completed
    toast.success("Your signup was completed with success")
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRemoveData = () => {
    setForm({
      username: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
  };
  return (
    <div className="signup-container">
      <Form onSubmit={handleSubmit} className="signup-form shadow">
        {/* Form to have: 4 items to be inserted (Form Group) */}
        <h3 className="text-center fw-bold mb-3">Signup Form</h3>
        <p className="text-center mb-3">
          Do you have an account?{" "}
          <Link to={"/login"} className="login-btn">
            Login!
          </Link>
        </p>
        <Form.Group className="mb-3" controlId="formBasicName">
          {/* username field in signup form */}
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="test_username"
            onChange={handleChange}
            name="username"
            value={form.username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          {/* email field in signup form */}
          <Form.Label>Email address</Form.Label>
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
         {/* password field in signup form */}
          <Form.Label>Password</Form.Label>
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

        <Form.Group className="mb-3" controlId="formBasicConfirmedPassword">
       {/* password confirmation field in signup form */}
          <Form.Label>Confirm Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="confirmPassword"
            value={form.confirmPassword}
            required
          />
        </Form.Group>
        <button
          type="submit"
          disabled={isLoading}
          className="mt-2 signup-button"
        >
          {!isLoading ? "Signup" : "Loading.."}
        </button>
        <button
          type="reset"
          className="ms-3 mt-3 removedata-button"
          onClick={handleRemoveData}
        >
          Clean inserted inputs
        </button>
      </Form>
    </div>
  );
};
export default Signup;
