import React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/header.jsx";

export default function LandingPage() {
    const navigate = useNavigate();

    const handleGetStarted = () => {
        navigate("/login");
    };

    return (
        <div style={{
            textAlign: "center",
            fontFamily: "Arial, Helvetica, sans-serif",
            color: "#333",
            minHeight: "100vh",
            padding: "0 20px"
        }}>
            <Header siteInformation={"Startseite"} />
            <h1 style={{
                fontSize: "4rem",
                margin: "20px 0",
                marginTop: "25vh",
                fontWeight: "bold",
                color: "#004AAD"
            }}>
                RateEd
            </h1>
            <p style={{
                fontSize: "1.5rem",
                marginBottom: "40px",
                color: "#555"
            }}>
                Kurse bewerten leicht gemacht!
            </p>
            <button
                onClick={handleGetStarted}
                style={{
                    fontSize: "1.2rem",
                    padding: "12px 30px",
                    backgroundColor: "#007BFF",
                    color: "#fff",
                    border: "none",
                    borderRadius: "8px",
                    cursor: "pointer",
                    transition: "all 0.3s ease",
                    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
                }}
                onMouseOver={(e) => {
                    e.target.style.backgroundColor = "#0056b3";
                    e.target.style.boxShadow = "0 6px 10px rgba(0, 0, 0, 0.2)";
                }}
                onMouseOut={(e) => {
                    e.target.style.backgroundColor = "#007BFF";
                    e.target.style.boxShadow = "0 4px 6px rgba(0, 0, 0, 0.1)";
                }}
            >
                GET STARTED
            </button>
        </div>
    );
}
