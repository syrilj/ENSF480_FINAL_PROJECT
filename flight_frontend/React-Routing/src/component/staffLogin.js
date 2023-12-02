import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, makeStyles } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',

    },
    paper: {
        padding: theme.spacing(4),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '100%',
        maxWidth: 400,
    },
    textField: {
        margin: theme.spacing(1),
    },
    button: {
        margin: theme.spacing(2, 0),
    },
}));

const StaffLogin = ({ setIsStaff }) => {
    const classes = useStyles();
    let navigate = useNavigate();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
    });

    const { username, password } = formData;
    const [error, setError] = useState('');

    const onInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8081/api/admin/staff_login', formData);

            if (response.data.status === 'success') {
                localStorage.setItem('staffData', JSON.stringify(response.data.data));
                setIsStaff(true);
                navigate('/');
            } else {
                setError(response.data.message);
            }
        } catch (err) {
            setError('An error occurred. Please try again.');
        }
    };

    return (
        <div className={classes.root}>
            <Paper elevation={3} className={classes.paper}>
                <Typography variant="h5" gutterBottom>
                    Admin Login
                </Typography>
                <form onSubmit={onSubmit}>
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Username"
                        name="username"
                        value={username}
                        onChange={onInputChange}
                        fullWidth
                        required
                    />
                    <TextField
                        className={classes.textField}
                        variant="outlined"
                        label="Password"
                        name="password"
                        type="password"
                        value={password}
                        onChange={onInputChange}
                        fullWidth
                        required
                    />
                    <Button className={classes.button} variant="contained" color="primary" type="submit" fullWidth>
                        Login
                    </Button>
                    {error && <Typography color="error">{error}</Typography>}
                </form>
            </Paper>
        </div>
    );
};

export default StaffLogin;
