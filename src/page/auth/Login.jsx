import React, { useState } from 'react';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    Link as MuiLink,
    CircularProgress,
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import SuccessPopup from '../../components/common/popups/SuccessPopup';
import ErrorPopup from '../../components/common/popups/ErrorPopup';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setLoading(true);

        const { email, password } = formData;

        const dummyEmail = 'user@gmail.com';
        const dummyPassword = '123456';

        try {
            if (email === dummyEmail && password === dummyPassword) {
                localStorage.setItem('token', 'token from backend');
                setOpenModal(true);

                setTimeout(() => {
                    navigate('/home');
                }, 2000);
            } else {
                setErrorModal(true);
            }
        } catch (error) {
            console.error('Login error:', error);
            setErrorModal(true);
        } finally {
            setLoading(false);
        }

        // setOpenModal(true);

    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Login
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            fullWidth
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} color="inherit" /> : 'Login'}
                        </Button>
                    </Box>
                </form>

                <Box mt={2} display="flex" justifyContent="space-between">
                    <MuiLink component={Link} to="/register" underline="hover">
                        Don&apos;t have an account? Register
                    </MuiLink>
                    <MuiLink
                        component="button"
                        variant="body2"
                        onClick={() => alert('Redirect to Forgot Password')}
                    >
                        Forgot Password?
                    </MuiLink>
                </Box>
                <SuccessPopup
                    open={openModal}
                    // onClose={() => setOpenModal(false)}
                    title="Login Successful"
                    showIcon
                >
                    You have Logged In successfully!
                </SuccessPopup>
                <ErrorPopup
                    open={errorModal}
                    onClose={() => setErrorModal(false)}
                    title="Login Failed"
                >
                    Invalid email or password.
                </ErrorPopup>
            </Paper>
        </Container>
    );
};

export default Login;
