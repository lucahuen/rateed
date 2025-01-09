import React, {useState} from "react";
import {Box, Button, CssBaseline, Divider, TextField, Typography} from "@mui/material";
import Header from "../components/header";
import {useNavigate} from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate()

    const handleRegister = () => {
        setUsername(username)
        setPassword(password)
        console.log(`username: ${username}, password: ${password}`)
        // todo: implement correctly
    }

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };
    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleLogin = () => {
        navigate("/login")
    }

    return (
        <div>
            <CssBaseline/>
            <Header siteInformation={"Register"}/>
            <Box
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    height: '100vh',
                    gap: 2,
                    padding: 2
                }}
            >
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
                    onClick={handleRegister}
                    sx={{maxWidth: 400, width: '100%'}}
                >
                    Create Account
                </Button>

                <Divider sx={{width: '100%', maxWidth: 400}}/>
                {/* Text and Login Button */}
                <Box sx={{textAlign: 'center', maxWidth: 400}}>
                    <Typography variant="body1" sx={{marginBottom: 1}}>
                        Du hast schon einen Account?
                    </Typography>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleLogin} // Funktion später implementieren
                        sx={{width: '100%'}}
                    >
                        Login
                    </Button>
                </Box>
            </Box>
            <Divider/>
        </div>

    );
}
