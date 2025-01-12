import Header from "../components/header.jsx";
import Cookies from "js-cookie";
import {useNavigate} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {ApiContext} from "../context/api-context.jsx";
import {Box, TextField, Button, Typography, Alert, IconButton, InputAdornment, CssBaseline} from "@mui/material";
import {Visibility, VisibilityOff} from "@mui/icons-material";

export default function ProfilePage() {
    const [username, setUsername] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [errorMessage, setErrorMessage] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const navigate = useNavigate();
    const {userService} = useContext(ApiContext);

    const sessionId = Cookies.get("auth");
    if (!sessionId) {
        navigate("/login");
    }

    useEffect(() => {
        userService
            .requestUserById(sessionId)
            .then((res) => {
                setUsername(res.user.username);
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Fehler beim Laden der Benutzerdaten.");
            });
    }, [sessionId, userService]);

    const handlePasswordChange = () => {
        if (!currentPassword || !newPassword) {
            setErrorMessage("Bitte alle Felder ausfüllen.");
            return;
        }

        userService
            .requestUpdatePassword(sessionId, currentPassword, newPassword)
            .then(() => {
                setSuccessMessage("Passwort erfolgreich geändert.");
                setErrorMessage(null);
                setCurrentPassword("");
                setNewPassword("");
            })
            .catch((error) => {
                console.log(error);
                setErrorMessage("Fehler beim Ändern des Passworts.");
            });
    };

    const deleteProfile = () => {
        if (!currentPassword) {
            setErrorMessage("Bitte gib dein akutelles Passwort ein.");
            return;
        }
        userService
            .requestDeleteAccount(sessionId, currentPassword)
            .then(() => {
                Cookies.remove("auth");
                navigate("/login");
            })
            .catch((error) => {
                if (error.status === 400) {
                    setErrorMessage("Passwort ist falsch")
                } else {
                    setErrorMessage("Fehler beim Löschen des Accounts.");
                }
            });
    };

    return (
        <div>
            <CssBaseline/>
            <Header siteInformation={"Dein Profil"}/>
            <Box sx={{padding: 3, maxWidth: 400, margin: "auto"}}>
                <Typography variant="h5" gutterBottom>
                    Profil
                </Typography>
                <Typography variant="body1" gutterBottom>
                    Benutzername: {username}
                </Typography>

                {errorMessage && <Alert severity="error">{errorMessage}</Alert>}
                {successMessage && <Alert severity="success">{successMessage}</Alert>}

                <TextField
                    label="Aktuelles Passwort"
                    type={showCurrentPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                                    edge="end"
                                >
                                    {showCurrentPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <TextField
                    label="Neues Passwort"
                    type={showNewPassword ? "text" : "password"}
                    fullWidth
                    margin="normal"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    InputProps={{
                        endAdornment: (
                            <InputAdornment position="end">
                                <IconButton
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    edge="end"
                                >
                                    {showNewPassword ? <VisibilityOff/> : <Visibility/>}
                                </IconButton>
                            </InputAdornment>
                        )
                    }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    onClick={handlePasswordChange}
                    sx={{marginTop: 2}}
                >
                    Passwort ändern
                </Button>
                <Button
                    variant="outlined"
                    color="error"
                    fullWidth
                    onClick={deleteProfile}
                    sx={{marginTop: 2}}
                >
                    Account löschen
                </Button>
            </Box>
        </div>
    );
}
