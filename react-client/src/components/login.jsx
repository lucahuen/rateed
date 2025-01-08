import {Button} from "@mui/material";
import PropTypes from "prop-types";


const Login = ({handleLogin}) => {

    return (
        <>
            <Button
                variant={"contained"}
                onClick={() => handleLogin()}
                sx={{
                    backgroundColor: "white",
                    color: "black",
                    "&:hover": {
                        backgroundColor: "#f0f0f0", // Leichtes Grau beim Hover
                    },
                }}>
                Login
            </Button>
        </>
    );
};

Login.propTypes = {
    handleLogin: PropTypes.func,
}

export default Login;