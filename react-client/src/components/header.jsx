import React, {useEffect} from "react";
import {AppBar, Box, Button, ButtonBase, Divider, Toolbar, Typography} from "@mui/material";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";
import Cookies from "js-cookie";

const Header = ({siteInformation}) => {
    const navigate = useNavigate()
    const sessionId = Cookies.get("auth")

    const handleLogin = () => {
        navigate("/login");
    }
    const handleLogout = () => {
        Cookies.remove("auth")
        window.location.reload()
    }

    const handleHomepage = () => {
        navigate("/")
    }

    const handleProfileNav = () => {
        navigate("/profile")
    }

    return (
        <AppBar position="static">
            <Toolbar>
                {/* Text links */}
                <Box sx={{display: "flex", alignItems: "center", gap: 1}}>
                    <ButtonBase
                        onClick={handleHomepage}
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            border: "1px solid black",
                            borderRadius: "4px",
                            padding: "4px 8px",
                            textTransform: "none",
                            '&:hover': {
                                backgroundColor: "#f5f5f5", // Optional: heller Hover-Effekt
                            },
                        }}
                    >
                        <Typography variant="h6" sx={{fontWeight: 'bold'}}>RateEd</Typography>
                    </ButtonBase>
                    <Typography variant="h6">
                        - {siteInformation}
                    </Typography>
                </Box>

                {/* LoginButton-Button rechts */}
                <Box sx={{marginLeft: "auto"}}>
                    {sessionId ? (
                        <Box>
                            <Button
                                variant="contained"
                                onClick={handleProfileNav}
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    marginRight: 1,
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5', // leicht grauer Hover-Effekt
                                    },
                                    border: '1px solid black' // optional, um den Button hervorzuheben
                                }}
                            >
                                Profil
                            </Button>
                            <Button
                                variant="contained"
                                onClick={handleLogout}
                                sx={{
                                    backgroundColor: 'white',
                                    color: 'black',
                                    fontWeight: 'bold',
                                    '&:hover': {
                                        backgroundColor: '#f5f5f5', // leicht grauer Hover-Effekt
                                    },
                                    border: '1px solid black' // optional, um den Button hervorzuheben
                                }}
                            >
                                Logout
                            </Button>
                        </Box>
                    ) : (
                        <Button
                            variant="contained"
                            onClick={handleLogin}
                            sx={{
                                backgroundColor: 'white',
                                color: 'black',
                                fontWeight: 'bold',
                                '&:hover': {
                                    backgroundColor: '#f5f5f5', // leicht grauer Hover-Effekt
                                },
                                border: '1px solid black' // optional, um den Button hervorzuheben
                            }}
                        >
                            Login
                        </Button>
                    )}
                </Box>
            </Toolbar>
        </AppBar>

    );
};

Header.propTypes = {
    siteInformation: PropTypes.string
}

export default Header;
