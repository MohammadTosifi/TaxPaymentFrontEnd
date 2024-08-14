// src/components/KeyManagement.tsx

import React, { useEffect } from "react";
import { Box, Typography, Container, Button, TextField } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../redux/store";
import {
  fetchDESKey,
  fetchRSAPublicKey,
  generateDESKey,
  generateRSAKeyPair,
} from "../redux/slices/keyManagementSlice";

const KeyManagement: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { desKey, rsaPublicKey, loading, error } = useSelector(
    (state: RootState) => state.keys
  );

  useEffect(() => {
    dispatch(fetchDESKey());
    dispatch(fetchRSAPublicKey());
  }, [dispatch]);

  const handleGenerateDESKey = () => {
    dispatch(generateDESKey());
  };

  const handleGenerateRSAKeyPair = () => {
    dispatch(generateRSAKeyPair());
  };

  return (
    <Container maxWidth="lg">
      <Box
        p={3}
        display="flex"
        justifyContent="space-between"
        alignItems="center"
      >
        <Typography variant="h4" gutterBottom>
          Key Management
        </Typography>
      </Box>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          DES Secret Key
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="DES Key"
          value={desKey}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateDESKey}
          disabled={loading}
        >
          Generate DES Key
        </Button>
      </Box>
      <Box mt={2}>
        <Typography variant="h6" gutterBottom>
          RSA Public Key
        </Typography>
        <TextField
          fullWidth
          margin="normal"
          label="RSA Public Key"
          value={rsaPublicKey}
          InputProps={{
            readOnly: true,
          }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleGenerateRSAKeyPair}
          disabled={loading}
        >
          Generate RSA Key Pair
        </Button>
      </Box>
      {error && (
        <Typography color="error" variant="body2">
          {error}
        </Typography>
      )}
    </Container>
  );
};

export default KeyManagement;
