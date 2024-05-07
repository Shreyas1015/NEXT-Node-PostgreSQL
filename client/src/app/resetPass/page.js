"use client";

import React, { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const ResetPass = ({ params }) => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    otp: "",
    newPassword: "",
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(window.location.search);
    const email = queryParams.get("email");
    console.log("Decoded email:", email);
    if (email) {
      setFormData((prevData) => ({
        ...prevData,
        email: email,
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_ID}/auth/reset_password`,
        formData
      );
      console.log("Response from server:", response.data);
      setSuccessMessage(response.data.message);
      setErrorMessage("");
      alert("Password Changed Successfully");
      router.push("/");
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred while resetting the password.");
      }
      setSuccessMessage("");
    }
  };

  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-lg-6 m-0 p-0"></div>
        <div className="col-lg-6 m-0 p-0">
          <form
            className="glassomorphic-effect login-container mx-auto rounded-4"
            onSubmit={handleResetPassword}
          >
            <div className="text-center login-text pt-4 mx-auto mb-5">
              <h2>Reset Password</h2>
            </div>
            <div className="form-container pb-4 mx-auto">
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email address
                </label>
                <input
                  type="email"
                  readOnly
                  name="email"
                  className="form-control"
                  id="email"
                  required
                  value={formData.email}
                />
              </div>
              <div className="mb-3">
                <label htmlFor="otp" className="form-label">
                  OTP:
                </label>
                <input
                  type="text"
                  id="otp"
                  name="otp"
                  className="form-control"
                  value={formData.otp}
                  placeholder="Enter your OTP Here"
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  New Password:
                </label>
                <div className="input-group">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="newPassword"
                    name="newPassword"
                    value={formData.newPassword}
                    onChange={handleChange}
                    required
                    className="form-control"
                    placeholder="At least 8-20 charac."
                  />
                  <button
                    className="btn btn-outline-secondary"
                    type="button"
                    onClick={handleTogglePassword}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
              <div className="mb-1">
                <h5 className="text-danger">
                  {errorMessage && <div className="error">{errorMessage}</div>}

                  {successMessage && (
                    <div className="success">{successMessage}</div>
                  )}
                </h5>
              </div>
              <br />

              <div className="col-lg-6">
                <input
                  className="btn px-4 py-2"
                  style={{ backgroundColor: "#62c1bf", color: "white" }}
                  type="submit"
                  value="Reset Password"
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPass;
