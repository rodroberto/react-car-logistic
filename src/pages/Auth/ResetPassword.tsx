import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Box, Button, Input, FormControl, FormLabel, useToast } from "@chakra-ui/react";
import axios from "../../components/axios";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");
  const toast = useToast();

  const handleSubmit = async () => {
    try {
      await axios.post("/auth/reset-password", { token, newPassword });
      toast({ title: "Password updated successfully", status: "success" });
    } catch (error) {
      toast({ title: "Failed to reset password", status: "error" });
    }
  };

  return (
    <Box>
      <FormControl>
        <FormLabel>New Password</FormLabel>
        <Input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      </FormControl>
      <Button onClick={handleSubmit} colorScheme="blue" mt={4}>Reset Password</Button>
    </Box>
  );
};

export default ResetPassword;
