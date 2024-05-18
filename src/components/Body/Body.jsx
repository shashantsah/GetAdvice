import { Typography, CircularProgress, Box, Button } from '@mui/material';
import React, { useState, useEffect } from 'react';
import axios from 'axios'; // Import axios for making HTTP requests

const Body = () => {
  const [advice, setAdvice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdvice();
  }, []);

  const fetchAdvice = () => {
    setLoading(true); // Set loading state to true before fetching advice
    axios.get('https://api.adviceslip.com/advice')
      .then((res) => {
        const { advice } = res.data.slip;
        setAdvice(advice);
        setLoading(false); // Set loading state to false after fetching advice
      })
      .catch((err) => {
        console.log(err);
        setLoading(false); // Set loading state to false if there's an error
      });
  };

  const handleNewAdviceClick = () => {
    fetchAdvice(); // Call fetchAdvice when the "New Advice" button is clicked
  };

  return (
    <Box textAlign="center" mt={35}>
      <Typography variant="h4" gutterBottom>
        Inspirational Advice
      </Typography>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          <Typography variant="body1" gutterBottom>
            "{advice}"
          </Typography>
          <Button variant="contained" onClick={handleNewAdviceClick}>
            New Advice
          </Button>
        </>
      )}
    </Box>
  );
};

export default Body;
