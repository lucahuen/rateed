import React from "react";
import {CssBaseline, Divider, TextField} from "@mui/material";
import Header from "../components/header";

export default function LoginPage() {

    return (
        <div>
            <CssBaseline/>
            <Header siteInformation={"Login"}/>
            <TextField placeholder={"username"}/>
            <TextField placeholder={"password"}/>

            <Divider/>
        </div>
    );
}
