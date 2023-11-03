import {
  AppBar,
  Avatar,
  Badge,
  Box,
  Button,
  InputBase,
  Menu,
  MenuItem,
  styled,
  Toolbar,
  Typography,
} from "@mui/material";
import { Mail, Navigation, Notifications, Pets } from "@mui/icons-material";
import React, { useState } from "react";
import { useRouter } from 'next/navigation';

// Import the necessary functions for theming
import { createTheme, ThemeProvider } from "@mui/material/styles";

// Create a dark theme
const darkTheme = createTheme({
  palette: {
    mode: "light",
  },
});

const StyledToolbar = styled(Toolbar)({
  display: "flex",
  justifyContent: "space-between",
});

const Navbar = ({ onSearch }) => {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); // Add state for search term
  const navigation = useRouter();

  const handleSearch = () => {
    onSearch(searchTerm); // Pass the search term to the parent component
  };

  // Implement live search with event listener..."e" means eventlistener
  const handleLiveSearch = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    onSearch(newSearchTerm); // Pass the updated search term to the parent component
  };

  const handleLogout = async () => {
    // Implement the logout functionality here

    // remove the access and refresh tokens from local storage
    localStorage.removeItem("token");
    // localStorage.removeItem("refresh_token");
    localStorage.removeItem("id");


    // make a POST request to the logout endpoint
    // const apiEndpoint = "http://54.210.138.20/logout";
    alert("Logout successful!");
    console.log(localStorage);
    // redirect to the login page
    window.location.href = "/login";

      // print the local storage to the console
    };

return (
  // Wrap the Navbar component with ThemeProvider and pass the darkTheme
  <ThemeProvider theme={darkTheme}>
    <AppBar position="sticky">
      <StyledToolbar>
        <Typography variant="h6" sx={{ display: { xs: "none", sm: "block" } }}>
          TAX-WIZARD
        </Typography>
        <Pets sx={{ display: { xs: "block", sm: "none" } }} />
        <Button
          variant="outlined"
          color="inherit"
          size="small"
          onClick={handleLogout}  // Add onClick event listener
        >
          Logout
        </Button>
      </StyledToolbar>

    </AppBar>
  </ThemeProvider>
);
};

export default Navbar;
