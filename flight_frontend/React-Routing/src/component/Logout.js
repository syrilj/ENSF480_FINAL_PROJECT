import React, { useState } from "react";
import { Link as RouterLink, useNavigate } from "react-router-dom";
import { Button, Typography, Container, CssBaseline, makeStyles } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        marginTop: theme.spacing(8),
    },
    button: {
        margin: theme.spacing(3, 0, 2),
    },
}));

const Logout = ({ isAuthenticated, setIsAuthenticated }) => {
    const classes = useStyles();
    const navigate = useNavigate();
    const [logoutSuccess, setLogoutSuccess] = useState(false);

    const handleLogout = async () => {
        try {
            // You can make a logout API request here if needed
            // Example: await axios.post('/logout');

            // Remove user data from localStorage
            localStorage.removeItem("userData");

            // Simulate an asynchronous logout process
            await new Promise((resolve) => setTimeout(resolve, 1000));

            // Update state to indicate successful logout
            setLogoutSuccess(true);

            // Update authentication status
            setIsAuthenticated(false);

            // Redirect to the login page or any other desired route
            navigate("/");
        } catch (error) {
            console.error('Error during logout:', error);
        }
    };

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <div className={classes.root}>
                <Typography component="h1" variant="h5" align="center" gutterBottom>
                    {logoutSuccess ? "Logged Out" : "Thank You for using our airline. Use the button below to logout."}
                </Typography>

                <Button
                    onClick={handleLogout}
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    disabled={logoutSuccess}
                >
                    Logout
                </Button>
                <Button
                    component={RouterLink}
                    to="/login"
                    variant="outlined"
                    color="primary"
                    className={classes.button}
                >
                    Login
                </Button>
            </div>
        </Container>
    );
};

export default Logout;
