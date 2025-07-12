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
    MenuItem
} from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { login } from '../../api'; // ✅ Your login API function
import SuccessPopup from '../../components/common/popups/SuccessPopup';
import ErrorPopup from '../../components/common/popups/ErrorPopup';

const loginMethods = [
    { label: 'Email', value: 'email' },
    { label: 'Phone Number', value: 'phoneNo' },
    { label: 'Username', value: 'userName' },
];

const Login = () => {
    const [method, setMethod] = useState('email');
    const [formData, setFormData] = useState({
        email: '',
        phoneNo: '',
        userName: '',
        password: '',
    });

    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const [openModal, setOpenModal] = useState(false);
    const [errorModal, setErrorModal] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleMethodChange = (e) => {
        setMethod(e.target.value);
        // Reset form fields when method changes
        setFormData({
            email: '',
            phoneNo: '',
            userName: '',
            password: '',
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const payload = {
            password: formData.password,
            token: 'dummy-device-token', // Optional
        };

        // Include only selected login method
        if (method === 'email') payload.email = formData.email;
        if (method === 'phoneNo') payload.phoneNo = formData.phoneNo;
        if (method === 'userName') payload.userName = formData.userName;

        try {
            const response = await login(payload);
            console.log('✅ Login success:', response);

            // Optionally store token or user in localStorage
            localStorage.setItem('user', JSON.stringify(response.user));

            setOpenModal(true);
            setTimeout(() => navigate('/home'), 2000);
        } catch (error) {
            console.error('❌ Login failed:', error.message);
            setErrorMessage(error.response?.data?.message || 'Invalid credentials');
            setErrorModal(true);
        } finally {
            setLoading(false);
        }
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
                            select
                            label="Login Method"
                            value={method}
                            onChange={handleMethodChange}
                            fullWidth
                        >
                            {loginMethods.map((option) => (
                                <MenuItem key={option.value} value={option.value}>
                                    {option.label}
                                </MenuItem>
                            ))}
                        </TextField>

                        {method === 'email' && (
                            <TextField
                                label="Email"
                                name="email"
                                type="email"
                                value={formData.email}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        )}

                        {method === 'phoneNo' && (
                            <TextField
                                label="Phone Number"
                                name="phoneNo"
                                type="tel"
                                value={formData.phoneNo}
                                onChange={handleChange}
                                inputProps={{ maxLength: 10 }}
                                fullWidth
                                required
                            />
                        )}

                        {method === 'userName' && (
                            <TextField
                                label="Username"
                                name="userName"
                                value={formData.userName}
                                onChange={handleChange}
                                fullWidth
                                required
                            />
                        )}

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
                    title="Login Successful"
                    showIcon
                >
                    You have logged in successfully!
                </SuccessPopup>

                <ErrorPopup
                    open={errorModal}
                    onClose={() => setErrorModal(false)}
                    title="Login Failed"
                >
                    {errorMessage}
                </ErrorPopup>
            </Paper>
        </Container>
    );
};

export default Login;
