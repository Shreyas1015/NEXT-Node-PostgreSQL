"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";

const UserAuthenticator = ({ children, params }) => {
  const router = useRouter();
  const [uid, setUid] = useState(null);
  const [loading, setLoading] = useState(true);
  const decryptedUID = secureLocalStorage.getItem("uid");
  //   const urlID = decodeURIComponent(params.uid);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const suid = localStorage.getItem("sanitizedUID");
      setUid(suid);
      setLoading(false);
    } else {
      console.log("Window is undefined");
    }
  }, []);

  let urlID = null;
  if (router.asPath) {
    const pathParts = router.asPath.split("/");
    urlID = pathParts[pathParts.length - 1];
  }

  const BackToLogin = () => {
    router.push("/");
  };

  if (loading) {
    return (
      <div className="container text-center">
        <h2>Loading...</h2>
      </div>
    );
  }

  if (uid === null || urlID !== uid) {
    return (
      <>
        <div className="container text-center fw-bold">
          <h2>INVALID URL. Please provide a valid UID.</h2>
          <button onClick={BackToLogin} className="btn blue-buttons">
            Back to Login
          </button>
        </div>
      </>
    );
  }
  return children;
};

export default UserAuthenticator;
