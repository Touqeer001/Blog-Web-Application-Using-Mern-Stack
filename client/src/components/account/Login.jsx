import React, { useState, useEffect, useContext } from "react";
import axios from "axios";

import { TextField, Box, Button, Typography, styled } from "@mui/material";
import { useNavigate } from "react-router-dom";

// import { API } from "../../service/api";
import { DataContext } from "../../context/DataProvider";
import { userLogin, userSignup } from "../../utils/APIRoutes";

const Component = styled(Box)`
  width: 400px;
  margin: auto;
  box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6);
  background: white;
`;

const Image = styled("img")({
  width: 100,
  display: "flex",
  margin: "auto",
  padding: "50px 0 0",
  background: "white",
});

const Wrapper = styled(Box)`
  padding: 25px 35px;
  display: flex;
  flex: 1;
  overflow: auto;
  flex-direction: column;
  background: white;
  & > div,
  & > button,
  & > p {
    margin-top: 20px;
  }
`;

const LoginButton = styled(Button)`
  text-transform: none;
  background: #fb641b;
  color: #fff;
  height: 48px;
  border-radius: 2px;
`;

const SignupButton = styled(Button)`
  text-transform: none;
  background: #fff;
  color: #2874f0;
  height: 48px;
  border-radius: 2px;
  box-shadow: 0 2px 4px 0 rgb(0 0 0 / 20%);
`;

const Text = styled(Typography)`
  color: #878787;
  font-size: 12px;
`;

const Error = styled(Typography)`
  font-size: 10px;
  color: #ff6161;
  line-height: 0;
  margin-top: 10px;
  font-weight: 600;
`;

const loginInitialValues = {
  username: "user",
  password: "1234",
};

const signupInitialValues = {
  name: "",
  username: "",
  password: "",
};

const Login = ({ isUserAuthenticated }) => {
  const [login, setLogin] = useState(loginInitialValues);
  const [signup, setSignup] = useState(signupInitialValues);
  
  const [error, showError] = useState(" ");
  const [account, toggleAccount] = useState("login");

  const navigate = useNavigate();
  const { setAccount } = useContext(DataContext);

  const imageURL =
    "https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png";

  useEffect(() => {
    showError(false);
  }, [login]);

  const onValueChange = (e) => {
    setLogin({ ...login, [e.target.name]: e.target.value });
  };

  const onInputChange = (e) => {
    setSignup({ ...signup, [e.target.name]: e.target.value });
  };

  const loginUser = async () => {
    try {
      const response = await axios.post(userLogin, login);

      // Assuming the login is successful if the accessToken is present
      if (response.status === 200 && response.data.accessToken) {
        alert("Login Successful.");
        showError("");

        // Storing tokens in sessionStorage
        sessionStorage.setItem(
          "accessToken",
          `Bearer ${response.data.accessToken}`
        );
        sessionStorage.setItem(
          "refreshToken",
          `Bearer ${response.data.refreshToken}`
        );

        // Setting account information
        setAccount({
          name: response.data.name,
          username: response.data.username,
        });

        // Updating user authentication state
        isUserAuthenticated(true);

        // Resetting login form
        setLogin(loginInitialValues);

        // Navigating to the home page
        navigate("/");
      } else {
        alert("Login failed. Please try again.");
        showError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      console.error("Login Error:", error);
      showError("Something went wrong! Please try again later.");
    }
  };

  const signupUser = async () => {
    try {
      const response = await axios.post(userSignup, signup);

      // Assuming the signup is successful if the status is 200
      if (response.status === 200 && response.data) {
        showError("");
        alert("Signup Successful.");

        // Resetting the signup form
        setSignup(signupInitialValues);

        // Switching back to the login form after successful signup
        toggleAccount("login");
      } else {
        showError("Something went wrong! Please try again later.");
      }
    } catch (error) {
      console.error("Signup Error:", error);
      showError("Something went wrong! Please try again later.");
    }
  };

  const toggleSignup = () => {
    account === "signup" ? toggleAccount("login") : toggleAccount("signup");
  };

  return (
    <Component>
      <Box>
        <Image src={imageURL} alt="blog" />
        {account === "login" ? (
          <Wrapper>
            <TextField
              variant="standard"
              value={login.username}
              onChange={(e) => onValueChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              value={login.password}
              onChange={(e) => onValueChange(e)}
              name="password"
              label="Enter Password"
            />

            {error && <Error>{error}</Error>}

            <LoginButton variant="contained" onClick={() => loginUser()}>
              Login
            </LoginButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <SignupButton
              onClick={() => toggleSignup()}
              style={{ marginBottom: 50 }}
            >
              Create an account.
            </SignupButton>
          </Wrapper>
        ) : (
          <Wrapper>
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="name"
              label="Enter Name"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="username"
              label="Enter Username"
            />
            <TextField
              variant="standard"
              onChange={(e) => onInputChange(e)}
              name="password"
              label="Enter Password"
            />

            <SignupButton onClick={() => signupUser()}>Signup</SignupButton>
            <Text style={{ textAlign: "center" }}>OR</Text>
            <LoginButton variant="contained" onClick={() => toggleSignup()}>
              Already have an account..
            </LoginButton>
          </Wrapper>
        )}
      </Box>
    </Component>
  );
};

export default Login;
