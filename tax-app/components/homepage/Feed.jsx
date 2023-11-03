'use client'
import { Box, Stack, Skeleton } from "@mui/material";
import React, { useState, useEffect } from "react";

/* Here, posts, mode and refreshPosts is received from parent component page.jsx */
const Feed = ({posts , mode, refreshPosts}) => {
  const [loading, setLoading] = useState(false);  // Set loading to false initially
  const [user_id, setUser_id] = useState(null);  // Set user_id to null initially

  useEffect(() => {
    const user_id = localStorage.getItem("id");
    setUser_id(user_id);

    if (!user_id) {
      window.location.href = "/login";
      return;
    }
  }, []);

return (
    <Box flex={3.5} p={{ xs: 0, md: 2 }} height={"100vh"}>
    </Box>
);

};

export default Feed;
