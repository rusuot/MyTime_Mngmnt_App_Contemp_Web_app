// Ref links:
// 1. https://react-bootstrap.netlify.app/docs/forms/overview/
// 2. https://getbootstrap.com/docs/4.1/components/forms/
// 3. https://medium.com/@Rushabh_/implementing-user-login-and-signup-with-reactjs-and-firebase-a-comprehensive-guide-7300bd33cb01
// imports for React & firebase & logic 
import React, { useState } from "react";
import { Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useThisAuthContext } from "../../authReactH/AuthContext";
import { ThisUpdateProfile } from "authReactH/UpdateProfile";
import { retrieveErrorMessage } from "Functions/functions";


const Profile = () => {
  const { user } = useThisAuthContext();
  const { UpdateProfile, isLoading } = ThisUpdateProfile();

  const [form, setForm] = useState({
    username: user.displayName,
    email: user.email,
    passwordUpdate: "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const updates = {};

    if (form.passwordUpdate.length > 0 && 
      form.passwordUpdate.length < 5) {
      toast.error("Hint: Password inserted has less than 5 characters");
      return;
    }
// username check
    if (form.username !== user.displayName) {
      updates.displayName = form.username;
    }
// email check
    if (form.email !== user.email) {
      updates.email = form.email;
    }

    // password length check
    if (form.passwordUpdate.length >= 6) {
      updates.password = form.passwordUpdate;
    }

    // if all fields are as the current saved in db, display toast okay
    if (!updates.displayName && !updates.email && !updates.password) {
      return toast.success("No Updates!");
    }

    const error = await UpdateProfile(updates);

    if (error) {
      const MessageError = getErrorretrieveErrorMessageMessage(error);
      if (MessageError === "requires-recent-login") {
        // for the case the user just needs re login 
        return toast.error("Due to security verifications, you need to re login - requires-recent-login error message)");
      }
      return toast.error(retrieveErrorMessage(MessageError));
    }

    setForm({ ...form, passwordUpdate: "" });
    toast.success("UserInfo updated successfully.");
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  return (
    <div className="profile-container">
      <Form onSubmit={handleSubmit} className="profile-form shadow">
        <h3 className="text-center fw-bold mb-3">My UserInfo</h3>
        <p className="m-0 text-center mb-3">
          Your current data is:
        </p>
        <Form.Group className="mb-3" controlId="formBasicName">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="name"
            placeholder="your_name"
            onChange={handleChange}
            name="username"
            value={form.username}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="email"
            placeholder="your_name@example.com"
            onChange={handleChange}
            name="email"
            value={form.email}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="If you want, insert in here a new password"
            autoComplete="current-password webauthn"
            onChange={handleChange}
            name="passwordUpdate"
            value={form.passwordUpdate}
          />
        </Form.Group>

        <p className="m-0 text-center mb-3">
          Insert new updates desired and select Save button
        </p>

        <div className="d-flex">
          <button
            type="submit"
            className="ms-auto mt-2 save-button"
            disabled={isLoading}
          >
            {!isLoading ? "Save" : "Loading.."}
          </button>
          <Link to={"/"} className="ms-auto mt-2 back-button">
            Back
          </Link>
        </div>
      </Form>
    </div>
  );
};

export default Profile;
