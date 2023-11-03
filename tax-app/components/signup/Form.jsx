import { useState } from 'react';
import {
    Button,
    Container,
    TextField,
    Typography,
    Box,
    Paper,
    createTheme,
    ThemeProvider,
    FormControl,
    InputLabel,
    Select,
    MenuItem,
} from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: {
            main: '#1976d2',
        },
        secondary: {
            main: '#f44336',
        },
        background: {
            default: '#f5f5f5',
            paper: '#E1F5FE',
        },
    },
    typography: {
        h5: {
            fontWeight: 600,
        },
        button: {
            textTransform: 'none',
            padding: '10px 20px',
            fontSize: '1rem'
        }
    }
});

export default function Form() {
    const [formData, setFormData] = useState({
        username: '',
        first_name: '',
        last_name: '',
        password_hash: '',
        location: '',
        gender: '',
        age: ''
    });

    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiEndpoint = 'http://127.0.0.1:5001/api/auth/signup';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });
            console.log("Response from server:", response);

            const data = await response.json();

            if (response.status === 201) {
                console.log("Response from server:", data);
                alert(data.message);
                window.location.href = '/login';
            } else if (response.status === 500) {
                // Alert if there's any issue with the server itself.
                alert(data.message);
            } else {
                alert(data.message);
            }
        } catch (error) {
            // Alert if there's any issue with the fetch operation itself.
            alert("There was an error with the fetch operation: " + error.message);
        }
    };


    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: `url('https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW4lMjBzbm93fGVufDB8fDB8fHww&w=1000&q=80')`,
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center',
                }}
            >
                <Container component="main" maxWidth="xs">
                    <Paper elevation={5} style={{ padding: '40px', borderRadius: '15px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h5" gutterBottom>
                                Create Account
                            </Typography>
                            <Box component="form" noValidate onSubmit={handleSubmit} sx={{ width: '100%', mt: 2 }}>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="username"
                                    label="Username"
                                    name="username"
                                    autoComplete="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="first_name"
                                    label="First Name"
                                    name="first_name"
                                    autoComplete="given-name"
                                    value={formData.first_name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="last_name"
                                    label="Last Name"
                                    name="last_name"
                                    autoComplete="family-name"
                                    value={formData.last_name}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password_hash"
                                    label="Password"
                                    type="password"
                                    id="password_hash"
                                    autoComplete="current-password"
                                    value={formData.password_hash}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="location"
                                    label="City/Location"
                                    name="location"
                                    autoComplete="email"
                                    value={formData.location}
                                    onChange={handleChange}
                                />
                                <FormControl fullWidth required variant="outlined" margin="normal">
                                    <InputLabel id="gender-label">Gender</InputLabel>
                                    <Select
                                        labelId="gender-label"
                                        id="gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        label="Gender"
                                    >
                                        <MenuItem value={"male"}>Male</MenuItem>
                                        <MenuItem value={"female"}>Female</MenuItem>
                                        <MenuItem value={"other"}>Other</MenuItem>
                                    </Select>
                                </FormControl>
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="age"
                                    label="Age"
                                    name="age"
                                    autoComplete="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                />
                                <Button
                                    type="submit"
                                    fullWidth
                                    variant="outlined"
                                    color="primary"
                                    sx={{ mt: 3, mb: 2 }}
                                >
                                    Join Now
                                </Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: '2%',
                        right: '2%',
                    }}
                >
                    <Paper elevation={5} style={{ padding: '20px', borderRadius: '15px', width: '250px' }}>
                        <Typography variant="body2" style={{ textAlign: 'center', marginBottom: '10px' }}>
                            Already have an account?
                        </Typography>
                        <Button
                            fullWidth
                            variant="outlined"
                            color="secondary"
                            onClick={() => window.location.href = '/login'}
                        >
                            Go to Login Page
                        </Button>
                    </Paper>
                </Box>
            </Box>
        </ThemeProvider>
    );
}
