import React from "react";
import {AppBar, Box, Toolbar, Typography} from "@mui/material";
import Login from "./login.jsx";
import {useNavigate} from "react-router-dom";
import PropTypes from "prop-types";

const Header = ({siteInformation}) => {
    const navigate = useNavigate()
    const handleLogin = () => {
        navigate("/login");
    }
    return (
        <AppBar position="static">
            <Toolbar>
                {/* Text links */}
                <Typography variant="h6" sx={{flexGrow: 1}}>
                    RateEd - {siteInformation}
                </Typography>

                {/* Login-Button rechts */}
                <Box>
                    <Login handleLogin={handleLogin}/>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

Header.propTypes = {
    siteInformation: PropTypes.string
}

export default Header;
