import React, { useContext, useEffect, useState } from "react";
import { CssBaseline, Typography, Divider, TextField, Button } from "@mui/material";
import Grid from "@mui/material/Grid2";
import Header from "../components/header";
import Footer from "../components/footer";
import { ApiContext } from "../context/api-context";

export default function UserProfile() {
    const [user, setUser] = useState({ username: "", password: "" });
    const { userService } = useContext(ApiContext);

    useEffect(() => {
        userService
            .requestUserProfile()
            .then((res) => {
                setUser(res.data);
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    }, []);

    const handleUpdateUserProfile = () => {
        userService
            .requestUpdateUserProfile(user)
            .then((res) => {
                setUser(res.data);
                alert("Profile updated successfully!");
            })
            .catch((error) => {
                console.error("[Error]: " + error);
            });
    };

    return (
        <div>
            <CssBaseline />
            <Header />
            <Grid
                container
                justifyContent="center"
                sx={{ minHeight: "95vh", py: 10, px: 2 }}
            >
                <Grid size={{ xs: 12, md: 8, lg: 5 }}>
                    <Grid
                        container
                        direction="column"
                        sx={{ p: 4, borderRadius: 2, border: "3px solid #d6d4d4" }}
                        spacing={2}
                    >
                        <Typography variant="h5" align="center">
                            User Profile
                        </Typography>
                        <Divider />
                        <TextField
                            label="Username"
                            value={user.username}
                            onChange={(e) => setUser({ ...user, username: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <TextField
                            label="Password"
                            type="password"
                            value={user.password}
                            onChange={(e) => setUser({ ...user, password: e.target.value })}
                            fullWidth
                            margin="normal"
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleUpdateUserProfile}
                            sx={{ mt: 2 }}
                        >
                            Save Changes
                        </Button>
                    </Grid>
                </Grid>
            </Grid>
            <Divider />
            <Footer />
        </div>
    );
}