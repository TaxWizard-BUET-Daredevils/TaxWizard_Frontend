'use client';
import Sidebar from "../../components/homepage/Sidebar";
import { Box, createTheme, TextField, Button, Grid, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Navbar from "../../components/homepage/Navbar";
import { useState, useEffect } from "react";

function App() {
    const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
    const [user_id, setUser_id] = useState(null); /*The initial value of user_id is null*/

    const [tableData, setTableData] = useState(null);
    const apiEndpoint = 'http://52.70.243.87/tax_details';



    /*Create a Theme instance to enable dark theme or light theme depending on the value of mode */
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        },
    });

    /*When this page.jsx is rendered, the useEffect function will trigger automatically and fetch the posts from
    the server. This is client side rendering as we are using react Hooks(useState, useEffect).
    Therefore we need to mention use client at the top of this file as we are using next-js */
    useEffect(() => {
        // first check if the user is logged in and the id is in local storage
        const token = localStorage.getItem("token");
        // const refresh_token = localStorage.getItem("refresh_token");
        const user_id = localStorage.getItem("id");


        setUser_id(user_id);
        // console.log("id", user_id);

        // console.log("user_id", user_id);

        // if id not in local storage, redirect to the login page
        if (!user_id) {
            window.location.href = "/login";
            return;
        }

        
    }, []);


    const showTax = async () => {

        try {
            const response = await fetch(apiEndpoint, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                }
            });

            const data = await response.json();
            // console.log(data);

            if (data.success) {
                setTableData(data);
            } else if (data.success == false) {
                alert("No data available");
            } else
                alert(`Unknown error: ${data.message}`);
        } catch (error) {
            console.log(error);
            alert("Error during the login process. Please try again.");
        }
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <Box bgcolor={"background.default"} color={"text.primary"} minHeight="100vh">
                <Navbar />
                <Grid container spacing={2} wrap="wrap">

                    {/* Sidebar */}
                    <Grid item xs={12} sm={4} md={3} order={{ xs: 1, sm: 1 }}>
                        <Sidebar setMode={setMode} mode={mode} user_id={user_id} />
                    </Grid>

                    <Grid item xs={12} sm={8} md={6} order={{ xs: 2, sm: 2 }}>
                    <Box marginTop={2}>
                        <Button variant="outlined" onClick={showTax}>Show Tax Details</Button>
                    </Box>
                        {/* Conditional rendering of the table */}
                        {tableData && (
                            <TableContainer component={Paper}>
                                <Table>
                                    <TableHead>
                                        {/* Table headers */}
                                        <TableRow>
                                            <TableCell>Year</TableCell>
                                            <TableCell>Location</TableCell>
                                            <TableCell>Total Income</TableCell>
                                            <TableCell>Total Taxable Amount</TableCell>
                                            <TableCell>Total Payable Tax</TableCell>
                                            {/* Add more headers as needed */}
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {/* Render table rows based on the API response data */}
                                        {tableData?.tax_details?.map((rowData) => (
                                            <TableRow key={rowData.tax_id}>
                                                <TableCell>{rowData.year}</TableCell>
                                                <TableCell>{rowData.location}</TableCell>
                                                <TableCell>{rowData.income} Tk</TableCell>
                                                <TableCell>{rowData.taxable_income} Tk</TableCell>
                                                <TableCell>{rowData.tax_amount} Tk</TableCell>
                                                {/* Add more cells as needed */}
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}

                    </Grid>
                </Grid>
            </Box>
        </ThemeProvider>
    );
}

export default App;

