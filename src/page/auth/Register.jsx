import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { register } from '../../api';
import {
    Container,
    Typography,
    TextField,
    Button,
    Box,
    Paper,
    MenuItem,
    Switch,
    FormControlLabel
} from '@mui/material';
import SuccessPopup from '../../components/common/popups/SuccessPopup';

const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
const colors = ['red', 'green', 'pink', 'none'];
const roles = ['user', 'admin'];
const genders = ['Male', 'Female', 'Other'];

const Register = () => {
    const [openModal, setOpenModal] = useState(false);
    const navigate = useNavigate();

    const formik = useFormik({
        initialValues: {
            name: '',
            userName: '',
            email: '',
            phoneNo: '',
            password: '',
            bloodGroup: '',
            gender: '',
            color: 'none',
            role: 'user',
            isActive: true,
        },
        validationSchema: Yup.object({
            name: Yup.string().min(2).max(50).required('Name is required'),
            userName: Yup.string()
                .matches(/^[a-zA-Z0-9]*$/, 'Username must be alphanumeric')
                .min(3)
                .max(30)
                .required('Username is required'),
            email: Yup.string().email('Invalid email').required('Email is required'),
            phoneNo: Yup.string()
                .matches(/^[0-9]{10}$/, 'Phone must be 10 digits')
                .required('Phone number is required'),
            password: Yup.string().min(6).max(30).required('Password is required'),
            bloodGroup: Yup.string().oneOf(bloodGroups.concat(''), 'Invalid blood group'),
            gender: Yup.string(),
            color: Yup.string().oneOf(colors),
            role: Yup.string().oneOf(roles),
            isActive: Yup.boolean(),
        }),
        onSubmit: async (values, { resetForm }) => {
            try {
                const response = await register(values);
                console.log('✅ Registration response:', response);

                setOpenModal(true);
                resetForm();
                setTimeout(() => navigate('/login'), 2000);
            } catch (error) {
                console.error('❌ Registration error:', error.message);
                // Optional: show error popup
            }
        },
    });

    return (
        <Container maxWidth="sm">
            <Paper elevation={3} sx={{ p: 4, mt: 8, borderRadius: 3 }}>
                <Typography variant="h5" fontWeight="bold" gutterBottom>
                    Register
                </Typography>

                <form onSubmit={formik.handleSubmit}>
                    <Box display="flex" flexDirection="column" gap={2}>
                        <TextField
                            label="Name"
                            name="name"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.name && Boolean(formik.errors.name)}
                            helperText={formik.touched.name && formik.errors.name}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Username"
                            name="userName"
                            value={formik.values.userName}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.userName && Boolean(formik.errors.userName)}
                            helperText={formik.touched.userName && formik.errors.userName}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Email"
                            name="email"
                            type="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Phone Number"
                            name="phoneNo"
                            type="tel"
                            value={formik.values.phoneNo}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            inputProps={{ maxLength: 10 }}
                            error={formik.touched.phoneNo && Boolean(formik.errors.phoneNo)}
                            helperText={formik.touched.phoneNo && formik.errors.phoneNo}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                            required
                        />
                        <TextField
                            label="Blood Group"
                            name="bloodGroup"
                            value={formik.values.bloodGroup}
                            onChange={formik.handleChange}
                            select
                            fullWidth
                        >
                            {bloodGroups.map((group) => (
                                <MenuItem key={group} value={group}>
                                    {group}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Gender"
                            name="gender"
                            value={formik.values.gender}
                            onChange={formik.handleChange}
                            select
                            fullWidth
                        >
                            {genders.map((g) => (
                                <MenuItem key={g} value={g}>
                                    {g}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Color"
                            name="color"
                            value={formik.values.color}
                            onChange={formik.handleChange}
                            select
                            fullWidth
                        >
                            {colors.map((c) => (
                                <MenuItem key={c} value={c}>
                                    {c}
                                </MenuItem>
                            ))}
                        </TextField>
                        <TextField
                            label="Role"
                            name="role"
                            value={formik.values.role}
                            onChange={formik.handleChange}
                            select
                            fullWidth
                        >
                            {roles.map((r) => (
                                <MenuItem key={r} value={r}>
                                    {r}
                                </MenuItem>
                            ))}
                        </TextField>

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={formik.values.isActive}
                                    onChange={(e) =>
                                        formik.setFieldValue('isActive', e.target.checked)
                                    }
                                    name="isActive"
                                    color="primary"
                                />
                            }
                            label="Active"
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
