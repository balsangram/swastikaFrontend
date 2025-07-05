import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
} from '@mui/material';
import PopupModal from '../../components/common/popups/ConfirmationPopupModal';
import SuccessPopup from '../../components/common/popups/SuccessPopup';
import Loader from '../../components/common/loaders/Loader';
import ErrorPopup from '../../components/common/popups/ErrorPopup';



const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: '',
        location: '',
    });
    const navigate = useNavigate()
    const [openModal, setOpenModal] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone" && value.length > 10) return;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setOpenModal(true);
        setFormData({
            name: '',
            email: '',
            phone: '',
            password: '',
            location: '',
        })
        setTimeout(() => {
            navigate('/login')
        }, 2000
        )
    };

    const handleConfirm = () => {
        console.log(" Submitted:", formData);
        // setOpenModal(true);


    };

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Register
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            fullWidth
                            required
                        />
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
                            label="Phone Number"
                            name="phone"
                            type="tel"
                            value={formData.phone}
                            onChange={handleChange}
                            fullWidth
                            inputProps={{ maxLength: 10 }}
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
                        <TextField
                            label="Location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            fullWidth
                            required
                        />

                        <Button type="submit" variant="contained" color="primary" fullWidth>
                            Register
                        </Button>
                    </Box>
                </form>
            </Paper>

            <SuccessPopup
                open={openModal}
                onClose={() => setOpenModal(false)}
                title="Registration Successful"
                showIcon
            >
                You have registered successfully!
            </SuccessPopup>

        </Container>
    );
};

export default Register;
