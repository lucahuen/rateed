import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

const Header = () => {
  return (
    <>
      <AppBar>
        <Toolbar>
          <Typography variant="h6">MERN Stack Lecture</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Header;
