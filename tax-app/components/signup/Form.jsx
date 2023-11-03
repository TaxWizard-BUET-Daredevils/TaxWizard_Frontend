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
import { useRouter } from 'next/navigation';


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
        id: '',
        name: '',
        password: '',
        gender: '',
        date_of_birth: '',
    });

    const navigation = useRouter();
    const handleChange = (event) => {
        const { name, value } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleSubmit = async (event) => {
        event.preventDefault();

        const apiEndpoint = 'http://52.70.243.87/signup';

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

            if (data.success == true) {
                console.log("Response from server:", data);
                alert(data.message);
                // push to login page via next navigate
                navigation.push(`/login`);
            } else if (data.success == false) {
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
                                    id="id"
                                    label="ID"
                                    name="id"
                                    autoComplete="id"
                                    value={formData.id}
                                    onChange={handleChange}
                                />
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    id="name"
                                    label="Name"
                                    name="name"
                                    autoComplete="fullname"
                                    value={formData.name}
                                    onChange={handleChange}
                                />
                                {/* <TextField
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
                                /> */}
                                <TextField
                                    variant="outlined"
                                    margin="normal"
                                    required
                                    fullWidth
                                    name="password"
                                    label="Password"
                                    type="password"
                                    id="password"
                                    autoComplete="current-password"
                                    value={formData.password}
                                    onChange={handleChange}
                                />
                                {/* <TextField
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
                                /> */}
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
                                    id="date_of_birth"
                                    label="Date of Birth (YYYY-MM-DD)"
                                    name="date_of_birth"
                                    autoComplete="YYYY-MM-DD"
                                    value={formData.date_of_birth}
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
