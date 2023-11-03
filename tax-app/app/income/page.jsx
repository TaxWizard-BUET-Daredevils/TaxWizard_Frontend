'use client';
import Sidebar from "../../components/homepage/Sidebar";
import { Box, createTheme, TextField, Button, Grid, ThemeProvider, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from "@mui/material";
import Navbar from "../../components/homepage/Navbar";
import { useState, useEffect } from "react";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl"

function App() {
    const [mode, setMode] = useState("light"); /*The initial theme of the UI: light. It can be dark or light depending on the initial value in useState */
    const [user_id, setUser_id] = useState(null); /*The initial value of user_id is null*/

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

    const [formData, setFormData] = useState({
        year: "",
        income: "",
        location: ""
    });

    const [tableData, setTableData] = useState(null);


    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission, e.g., send data to the server
        console.log("Form submitted:", formData);

        if (!formData.year || !formData.income || !formData.location) {
            alert("Please fill up all the fields");
            return;
        }

        const apiEndpoint = 'http://52.70.243.87/income_details';

        try {
            const response = await fetch(apiEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${localStorage.getItem("token")}`
                },
                body: JSON.stringify(formData)
            });

            const data = await response.json();
            // console.log(data);

            if (data.success) {
                alert("Income details added successfully...");
                console.log(localStorage);
                setTableData(data);

            } else if (data.detail) {
                alert("Unauthorized");
            } else
                alert(`Error found: ${data.message}`);
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

                    {/* Feed */}
                    <Grid item xs={12} sm={8} md={6} order={{ xs: 2, sm: 2 }}>
                        {/* Include your Feed component here */}

                        {/* Input Form */}
                        <form onSubmit={handleSubmit}>
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Year"
                                name="year"
                                variant="outlined"
                                value={formData.year}
                                onChange={handleChange}
                            />
                            <TextField
                                fullWidth
                                margin="normal"
                                label="Income"
                                name="income"
                                variant="outlined"
                                value={formData.income}
                                onChange={handleChange}
                            />
                            <FormControl fullWidth variant="outlined" margin="normal">
                                <InputLabel id="location-label">Location</InputLabel>
                                <Select
                                    labelId="location-label"
                                    label="Location"
                                    name="location"
                                    value={formData.location}
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Location</em>
                                    </MenuItem>
                                    <MenuItem value="dhaka">dhaka</MenuItem>
                                    <MenuItem value="chittagong">chittagong</MenuItem>
                                    <MenuItem value="city">city</MenuItem>
                                    <MenuItem value="non_city">non_city</MenuItem>
                                </Select>
                            </FormControl>
                        <Button variant="outlined" color="primary" type="submit">
                            Submit Tax
                        </Button>
                    </form>
                    {/* Conditional rendering of the table */}
                    {tableData && (
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {/* Table headers */}
                                        <TableCell>Tax ID</TableCell>
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
                                    <TableRow>
                                        <TableCell>{tableData.data.tax_id}</TableCell>
                                        <TableCell>{tableData.data.year}</TableCell>
                                        <TableCell>{tableData.data.location}</TableCell>
                                        <TableCell>{tableData.data.income} Tk</TableCell>
                                        <TableCell>{tableData.data.taxable_income} Tk</TableCell>
                                        <TableCell>{tableData.data.tax_amount} Tk</TableCell>
                                        {/* Add more cells as needed */}
                                    </TableRow>
                                </TableBody>
                            </Table>
                        </TableContainer>
                    )}
                </Grid>
            </Grid>
        </Box>
        </ThemeProvider >
    );
}

export default App;

