'use client';
import { Button, Typography, Box, Paper } from '@mui/material';
import Link from 'next/link';

export default function Welcome() {
    return (
        <Box
            sx={{
                height: '100vh',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'flex-end',
                backgroundImage: `url('https://images.unsplash.com/photo-1512273222628-4daea6e55abb?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NXx8bW91bnRhaW4lMjBzbm93fGVufDB8fDB8fHww&w=1000&q=80')`,
                backgroundSize: 'cover',
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
            }}
        >
            <Typography
                variant="h2"
                sx={{
                    position: 'absolute',
                    top: '10%',
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                    fontWeight: 'bold',
                }}
            >
                Tax Wizard
            </Typography>

            {/* Added subtitle */}
            <Typography
                variant="h5"
                sx={{
                    position: 'absolute',
                    top: '25%',  // Adjust this as needed to position the subtitle
                    color: 'white',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.5)',
                }}
            >
                Your Personal Income Tax Assistant
            </Typography>

            <Paper elevation={5} sx={{
                width: '50%',
                maxHeight: '40vh',
                padding: '20px',
                borderRadius: '10px',
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
            }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}
                >

                    <Typography variant="subtitle1" gutterBottom style={{ color: 'white' }}>
                        Not a member yet? Please sign up to join!
                    </Typography>
                    <Link href="/signup">
                        <Button
                            variant="outlined"
                            color="primary"
                            sx={{ marginTop: '20px', borderColor: 'white', color: 'white' }}
                        >
                            Sign Up
                        </Button>
                    </Link>
                </Box>
            </Paper>
        </Box>
    );
}
