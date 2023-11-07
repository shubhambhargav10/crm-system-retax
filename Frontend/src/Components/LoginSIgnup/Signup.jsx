import React, { useState } from "react";
import { Input, Container, Center, Box, Button, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import './sign.css';

export const Signup = () => {
  const [user, setUser] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
    address: ''
  });

  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleSignUp = async () => {
    try {
      const response = await fetch('https://crm-system-retax.vercel.app/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
      });

      if (!response.ok) {
        const errorMessage = await response.json();
        throw new Error(errorMessage);
      }

      const data = await response.json();
      Swal.fire({
        icon: 'success',
        title: 'Account Created Successfully',
      });
      localStorage.setItem('allUsers', JSON.stringify(user));
      navigate('/login');
    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: error.message || 'Signup request failed',
      });
    }
  };

  return (
    <Box my="100px">
      <Center>
        <Container
          p="20px"
          h="600px"
          boxShadow="rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset"
        >
          <Center>
            <Heading as="h4" size="md" mb={8}>
              Create Your Account
            </Heading>
          </Center>
         
          <Input
            type="text"
            variant="flushed"
            name="firstName"
            placeholder="Enter First Name"
            mb={4}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            variant="flushed"
            name="lastName"
            placeholder="Enter Last Name"
            mb={4}
            onChange={handleInputChange}
          />
          <Input
            type="email"
            variant="flushed"
            name="email"
            placeholder="Enter Email"
            mb={4}
            onChange={handleInputChange}
          />
          <Input
            type="password"
            variant="flushed"
            name="password"
            defaultValue=""
            placeholder="Create Password"
            mb={4}
            onChange={handleInputChange}
          />
          <Input
            type="text"
            variant="flushed"
            name="confirmPassword"
            placeholder="Re-Enter Password"
            mb={4}
            onChange={handleInputChange}
          />
          <RadioGroup
            defaultValue=""
            value={user.gender}
            onChange={(value) =>
              setUser((prevUser) => ({ ...prevUser, gender: value }))
            }
          >
            <Stack direction="row" spacing={4}>
              <Radio value="Male">Male</Radio>
              <Radio value="Female">Female</Radio>
              <Radio value="Prefer Not To Say">Prefer Not To Say</Radio>
            </Stack>
          </RadioGroup>
          <Input
            type="text"
            variant="flushed"
            name="address"
            placeholder="Enter Address"
            mb={4}
            onChange={handleInputChange}
          />
          <Button
            colorScheme="teal"
            size="lg"
            fontWeight="bold"
            w="full"
            mt={4}
            onClick={handleSignUp}
          >
            Sign Up
          </Button>
        </Container>
      </Center>
    </Box>
  );
};
