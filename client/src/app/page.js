"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import secureLocalStorage from "react-secure-storage";
import axiosInstance from "./components/axiosInstance";

const LoginPage = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const loginRes = await axiosInstance.post(
        `${process.env.NEXT_PUBLIC_ANALYTICS_ID}/auth/login`,
        {
          email: formData.email,
          password: formData.password,
        }
      );

      let userId = loginRes.data.uid;
      const userType = loginRes.data.user_type;

      secureLocalStorage.setItem("uid", userId);
      secureLocalStorage.setItem("user_type", userType);

      // Retrieve the encrypted userId from secureLocalStorage
      const encryptedUID = localStorage.getItem("@secure.n.uid");

      // Replace "/" with another character in the encrypted userId
      const sanitizedEncryptedUID = encryptedUID.replace(/\//g, "-");

      // Store the sanitized encrypted userId back in local storage
      localStorage.setItem("sanitizedUID", sanitizedEncryptedUID);
 
      const decryptedUserType = secureLocalStorage.getItem("user_type");

      if (decryptedUserType === 1) {
        console.log("Navigating to Admin Dashboard");
        router.push(`pages/admin/admin-dashboard/${sanitizedEncryptedUID}`);
      } else if (decryptedUserType === 2) {
        console.log("Navigating to User Page");
        router.push(`pages/user/user-dashboard/${sanitizedEncryptedUID}`);
      }
      alert("Logged In Successfully");
    } catch (error) {
      console.error(error);
      if (error.response && error.response.data && error.response.data.error) {
        setErrorMessage(error.response.data.error);
      } else {
        setErrorMessage("An error occurred during login.");
      }
    }
  };

  return (
    <>
      <div className="container-fluid min-vh-100">
        <div className="row min-vh-100">
          <div className="col-lg-6 m-0 p-0"></div>
          <div className="col-lg-6 m-0 p-0">
            <form
              className="glassomorphic-effect login-container mx-auto rounded-4"
              onSubmit={handleSubmit}
            >
              <div className="text-center login-text pt-4 mx-auto mb-5">
                <h1 className="mb-3">Login</h1>
              </div>
              <div className="form-container pb-4 mx-auto">
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    id="email"
                    placeholder="name@gmail.com"
                    required
                    onChange={handleChange}
                    value={formData.email}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="input-group">
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      className="form-control"
                      id="password"
                      placeholder="At least 8-20 charac."
                      required
                      onChange={handleChange}
                      value={formData.password}
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
                  <h5 className="text-danger">{errorMessage}</h5>
                </div>
                <br />
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      className="btn px-4 py-2"
                      style={{ backgroundColor: "#62c1bf", color: "white" }}
                      type="submit"
                      value="Login"
                    />
                  </div>
                  <div className="col-lg-6 p-1 text-center">
                    <Link
                      className="text-decoration-none blue-text "
                      href="/forgetPass"
                    >
                      Forgot Password ?
                    </Link>
                  </div>
                </div>
              </div>
              <div className="text-center p-3 ">
                <Link className="text-decoration-none blue-text" href="/signup">
                  Don't Have An Account ? SignUp Here
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
