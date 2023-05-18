import React, { useState } from "react";
import styled from "styled-components";
import { collection, doc, getDocs, query, setDoc, where } from "firebase/firestore";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import db, { auth } from "../../firebase";
import "../style/signup.css";

function SignUp() {
  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const navigate = useNavigate();

  const createAccount = async (e) => {
    e.preventDefault();
    const usernameQuery = query(collection(db, "users"), where("username", "==", username));
    const usernameExists = await getDocs(usernameQuery);

    if (usernameExists.docs.length === 0) {
      if (username.length > 0 && email.length > 0 && password.length > 0) {
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          await updateProfile(userCredential.user, {
            displayName: username,
            photoURL: photoURL,
          });

          await setDoc(doc(db, "users", userCredential.user.uid), {
            email,
            username,
            photoURL,
          });

          setEmail("");
          setPassword("");
          setPhotoURL("");
          setUsername("");
          alert("Your Account is Created");
          navigate("/login");
        } catch (err) {
          alert(err.message);
        }
      } else {
        alert("Please fill in all the fields");
      }
    } else {
      alert("Username already exists");
    }
  };

  return (
    <div className="containerBox">
      <div>
        <Form onSubmit={createAccount}>
          <div className="logo">
            <img src="./instagram-text-logo.png" alt="" />
          </div>
          <div className="form">
            <div className="inputContainer">
              <input
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <input
                type="text"
                placeholder="Username"
                onChange={(e) => setUsername(e.target.value)}
                value={username}
              />
              <input
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <input
                type="text"
                placeholder="PhotoURL (Optional)"
                onChange={(e) => setPhotoURL(e.target.value)}
                value={photoURL}
              />
              <button type="submit">Sign Up</button>
            </div>
          </div>
        </Form>
        <div className="loginContainer">
          <p>
            Have an account? <span onClick={() => navigate("/login")}>Log In</span>
          </p>
        </div>
      </div>
    </div>
  );
}

const Form = styled.form``;

export default SignUp;
