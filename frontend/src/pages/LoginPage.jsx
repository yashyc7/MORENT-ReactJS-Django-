import React, { useState } from "react";
import {
  Container,
  Grid,
  TextField,
  Button,
  Typography,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import axios from "axios";
const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const navigate = useNavigate();
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const { login } = useAuth();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      // Send login request to the backend with CSRF token
      const response = await axios.post(
        "http://localhost:8000/auth/login/",
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // Handle successful login
      login();
      localStorage.setItem("csrfToken", response.data.csrfToken);
      setSnackbarMessage(response.data.message);
      setSnackbarSeverity("success");
      setSnackbarOpen(true);

      // Redirect after a successful login
      setTimeout(() => {
        navigate("/",{replace:true});
      }, 1000);
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      setSnackbarMessage(error.response?.data?.error || "Login failed");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };

  const handleSignUp = () => {
    navigate("/register");
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="xs" style={{ marginTop: "25vh" }}>
      <Typography
        variant="h1"
        align="center"
        boxShadow="inherit"
        style={{
          fontWeight: "bold",
          fontSize: "50px",
          marginBottom: "2vh",
          color: "#F0A8D0 ",
        }}
      >
        MORENT ™
      </Typography>

      <Paper elevation={3} style={{ padding: 20, borderRadius: "20px" }}>
        <Typography variant="h5" align="center" style={{ fontWeight: "bold" }}>
          Sign In
        </Typography>
        <form onSubmit={handleLogin}>
          <Grid container spacing={2} direction="column" alignItems="center">
            {/* <FormControl> */}
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                label="Email Address"
                type="email"
                name="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                required
              />
            </Grid>
            <Grid item>
              <TextField
                variant="outlined"
                fullWidth
                label="password"
                type="password"
                name="password"
                value={password}
                onChange={(event) => setpassword(event.target.value)}
                required
              />
            </Grid>

            <Grid item>
              <div
                style={{ display: "flex", alignItems: "center", gap: "10px" }}
              >
                <Button
                  type="submit"
                  variant="contained"
                  onClick={handleLogin}
                  sx={{
                    backgroundColor: "#F0A8D0",
                    "&:hover": {
                      backgroundColor: "white !important",
                      borderColor: "black !important",
                      borderWidth: "2px",
                      color: "#F0A8D0",
                      "&:before": {
                        backgroundColor: "#F0A8D0 !important",
                        color: "#fff",
                      },
                    },
                    color: "#fff",
                  }}
                >
                  Log In
                </Button>
                <Button
                  onClick={handleSignUp}
                  variant="contained"
                  sx={{
                    backgroundColor: "#F0A8D0",
                    "&:hover": {
                      backgroundColor: "white !important",
                      borderColor: "black !important",
                      borderWidth: "2px",
                      color: "#F0A8D0",
                      "&:before": {
                        backgroundColor: "#F0A8D0 !important",
                        color: "#fff",
                      },
                    },
                    color: "#fff",
                  }}
                >
                  sign Up
                </Button>
              </div>
            </Grid>

            {/* </FormControl> */}
          </Grid>
        </form>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default LoginPage;
