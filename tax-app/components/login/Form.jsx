'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Button, Container, TextField, Typography, Box, Paper, createTheme, ThemeProvider, Divider } from '@mui/material';

const theme = createTheme({
    palette: {
        type: 'light',
        primary: { main: '#1976d2', },
        secondary: { main: '#f44336', },
        background: { default: '#f5f5f5', paper: '#E1F5FE', },
    },
    typography: {
        h5: { fontWeight: 600, },
        button: { textTransform: 'none', padding: '10px 20px', fontSize: '1rem' }
    }
});

export default function LoginForm() {
    const [loginData, setLoginData] = useState({ id: '', password: '' });
    const navigation = useRouter();

    const handleChange = (event) => {
        const { name, value } = event.target;
        setLoginData((prevData) => ({ ...prevData, [name]: value }));
    };

    const handleLogin = async (event) => {
        event.preventDefault();
        // testing server link for now
        const apiEndpoint = 'http://52.70.243.87/login';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(loginData)
            });

            const data = await response.json();
            // console.log(data);

            if (data.success) {
                if (data.token) {
                    // saves the id and token in the localstorage for authorization purposes
                    localStorage.setItem('token', data.token);
                    // localStorage.setItem('refresh_token', data.refresh_token);
                    localStorage.setItem('id', data.user_id);
                    navigation.push(`/homepage`);
                    alert("Login successful! Redirecting...");
                    console.log(localStorage);
                } else {
                    alert("Login failed. Please try again.");
                }
            } else {
                if (data.message === "User not found") {
                    alert("Error: User Profile Not Found. Please Sign Up First!");
                } else if (data.message === "Incorrect password") {
                    alert("Error: Incorrect Password. Please Try Again!");
                }
                else if (!response.success) {
                    alert("Error: Please fill in all the fields.");
                }
                else {
                    alert(`Unknown error: ${data.message}`);
                }
            }
        } catch (error) {
            console.log(error);
            alert("Error during the login process. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={theme}>
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundImage: 'linear-gradient(120deg, #89CFF0, #0057A8)'  // updated blue gradient
                }}
            >
                <Typography variant="h6">Already a member? Please login to explore!</Typography>
                <Divider style={{ margin: '20px 0', width: '80%' }} />
                <Container component="main" maxWidth="xs">
                    <Paper elevation={5} style={{ padding: '40px', borderRadius: '15px' }}>
                        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                            <Typography component="h1" variant="h5">Login</Typography>
                            <Box component="form" noValidate onSubmit={handleLogin} sx={{ width: '100%', mt: 2 }}>
                                <TextField variant="outlined" margin="normal" required fullWidth id="id" label="ID" name="id" autoComplete="id" value={loginData.id} onChange={handleChange} />
                                <TextField variant="outlined" margin="normal" required fullWidth name="password" label="Password" type="password" id="password" autoComplete="current-password" value={loginData.password} onChange={handleChange} />
                                <Button type="submit" fullWidth variant="outlined" sx={{ marginTop: '20px', borderColor: 'black', color: 'black' }}>Login</Button>
                            </Box>
                        </Box>
                    </Paper>
                </Container>
            </Box>
        </ThemeProvider>
    );

}
