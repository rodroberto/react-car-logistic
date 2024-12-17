import { useState } from "react";
import { Box, Button, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "../../components/axios";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/forgot-password", { email });
      toast({ title: "Password reset email sent", status: "success" });
    } catch (error) {
      toast({ title: "Failed to send email", status: "error" });
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>Email</FormLabel>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue" mt={4}>Send Reset Link</Button>
    </Box>
  );
};

export default ForgotPassword;
