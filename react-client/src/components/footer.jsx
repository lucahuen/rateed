import {Box, IconButton, Link, Typography} from "@mui/material";
import Grid from "@mui/material/Grid2";
import YouTubeIcon from "@mui/icons-material/YouTube";
import GitHubIcon from "@mui/icons-material/GitHub";

const Footer = () => {
    return (
        <>
            <Grid
                container
                sx={{
                    px: 2,
                    py: 1,
                }}
                justifyContent="space-between"
                component={Box}
                alignItems="center"
            >
                <Grid item size="grow">
                    <Typography variant="body2">
                        {" Copyright @ "}
                        <Link
                            color="inherit"
                            href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"
                            target="_blank"
                        >
                            Kidneyrock 2
                        </Link>{" "}
                        {new Date().getFullYear()}
                        {"."}
                    </Typography>
                </Grid>
                <Grid item size="auto">
                    <Grid container alignItems="center">
                        <Typography sx={{mr: 1}} variant="body2">
                            Follow us
                        </Typography>
                        <IconButton
                            onClick={() =>
                                window.open(
                                    "https://www.youtube.com/watch?v=jfiCBFNIpTI&feature=youtu.be"
                                )
                            }
                        >
                            <YouTubeIcon/>
                        </IconButton>
                        <IconButton
                            onClick={() => window.open("https://github.com/lucahuen/rateed")}
                        >
                            <GitHubIcon/>
                        </IconButton>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default Footer;
