import React, {useContext, useState} from "react";
import {Alert, Box, Button, CssBaseline, Divider, TextField, Typography} from "@mui/material";
import Header from "../components/header";
import {useNavigate} from "react-router-dom";
import {ApiContext} from "../context/api-context.jsx";
import Cookies from "js-cookie";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState(null);
    const {userService} = useContext(ApiContext);
    let sessionId = Cookies.get("auth")

    const navigate = useNavigate()

    const handleLogin = () => {
        userService
            .requestLogin(username, password)
            .then((res) => {
                    Cookies.set("auth", res.user.id, {path: "/", expires: 1 / 24})
                    sessionId = Cookies.get("auth");
                    navigate("/")
                }
            )
            .catch((error) => {
                setErrorMessage("Etwas ist schief gelaufen")
                console.error("Error:", error)
            })

    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleRegister = () => {
        navigate("/register")
    }

    return (
        <div style={{
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif"
        }}>
            <CssBaseline/>
            <Header siteInformation={"Login"}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '80vh',
                    gap: 2,
                    padding: 2
                }}
            >
                <h1 style={{fontSize: "2rem", margin: "20px 0"}}>Login below</h1>

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}

                <TextField
                    placeholder={"Username"}
                    value={username}
                    onChange={handleUsernameChange}
                    variant="outlined"
                    fullWidth
                    sx={{maxWidth: 400}}
                />

                <TextField
                    placeholder={"Password"}
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                    variant="outlined"
                    fullWidth
                    sx={{maxWidth: 400}}
                />

                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleLogin}
                    sx={{maxWidth: 400, width: '100%'}}
                >
                    Login
                </Button>

                <Divider sx={{width: '100%', maxWidth: 400}}/>

                <Box sx={{textAlign: 'center', maxWidth: 400}}>
                    <Typography variant="body1" sx={{marginBottom: 1}}>
                        Noch keinen Account?
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleRegister}
                        sx={{width: '100%'}}
                    >
                        Register
                    </Button>
                </Box>
            </Box>
            <Divider/>
        </div>

    );
}
