// import React, { useState } from "react";
// import { Input, Container, Center, Box, Button, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
// //import { useDispatch, useSelector } from "react-redux";
// //import { addUser } from "../../Redux/Login-Signup/action";
// import { useNavigate } from 'react-router-dom';
// import Swal from 'sweetalert2';
// import './sign.css';

// export const Signup = () => {
//  // const dispatch = useDispatch();

//   const [user, setUser] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     password: '',
//     confirmPassword: '',
//     gender: '',
//     address: ''
//   });
//   const [userArray, setUserArray] = useState([]);

//   const navigate = useNavigate();

//   const handleInputChange = (e) => {
//     const name = e.target.name;
//     const value = e.target.value;
//     setUser((prevUser) => {
//       return { ...prevUser, [name]: value };
//     });
//   };

//   const handleSignUp = () => {
//     if (
//       user.firstName !== '' &&
//       user.lastName !== '' &&
//       user.email !== '' &&
//       user.password !== '' &&
//       user.confirmPassword !== '' &&
//       user.gender !== ''
//     ) {
//       if (user.password !== user.confirmPassword) {
//         Swal.fire({
//           icon: 'error',
//           title: 'Oops...',
//           text: 'Passwords do not match!',
//           customClass: {
//             confirmButton: 'teal-button',
//           },
//         });
//       } else {
//         fetch('http://localhost:8060/users')
//           .then((res) => res.json())
//           .then((data) => {
//             setUserArray(data);
//             const matchFound = userArray.find((ele)=>{
//                 console.log('ele',ele);
//                 console.log('userObj',user)
//                 console.log('emailUse',user.email)
//             })

//             if (matchFound) {
//               Swal.fire({
//                 icon: 'warning',
//                 title: 'This email already exists',
//               });
//             } else {
//               fetch('http://localhost:8060/users', {
//                 method: 'POST',
//                 headers: {
//                   'Content-Type': 'application/json',
//                 },
//                 body: JSON.stringify(user),
//               })
//                 .then((response) => {
//                   if (!response.ok) {
//                     throw new Error('Signup request failed');
//                   }
//                   return response.json();
//                 })
//                 .then((data) => {
//                   Swal.fire({
//                     icon: 'success',
//                     title: 'Account Created Successfully',
//                   });
//                 //   dispatch(addUser(user));
//                   localStorage.setItem('allUsers', JSON.stringify(user));
//                   navigate('/login');
//                 })
//                 .catch((error) => {
//                   Swal.fire({
//                     icon: 'error',
//                     title: 'Oops...!',
//                     text: 'Signup request failed',
//                   });
//                   console.error(error);
//                 });
//             }
//           });
//       }
//     } else {
//       Swal.fire({
//         icon: 'warning',
//         title: 'Enter all fields',
//       });
//     }
//   };

  //const storeData = useSelector((store) => store);

//   useEffect(() => {
//     console.log("sd",storeData);
//   }, [storeData]);
import React, { useState } from "react";
import { Input, Container, Center, Box, Button, Heading, Radio, RadioGroup, Stack } from '@chakra-ui/react';
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

  const handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    setUser((prevUser) => {
      return { ...prevUser, [name]: value };
    });
  };

  const handleSignUp = () => {
    if (
      user.firstName !== '' &&
      user.lastName !== '' &&
      user.email !== '' &&
      user.password !== '' &&
      user.confirmPassword !== '' &&
      user.gender !== ''
    ) {
      if (user.password !== user.confirmPassword) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Passwords do not match!',
          customClass: {
            confirmButton: 'teal-button',
          },
        });
      } else {
        fetch('http://localhost:8000/signup', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(user),
        })
          .then((response) => {
            if (!response.ok) {
              throw new Error('Signup request failed');
            }
            return response.json();
          })
          .then((data) => {
            if (response.status === 200) {
              Swal.fire({
                icon: 'success',
                title: 'Account Created Successfully',
              });
  
              setUser({
                firstName: '',
                lastName: '',
                email: '',
                password: '',
                confirmPassword: '',
                gender: '',
                address: '',
              });
            } else if (response.status === 400) {
              Swal.fire({
                icon: 'warning',
                title: 'This email already exists',
              });
            } else {
              Swal.fire({
                icon: 'error',
                title: 'Oops...!',
                text: 'Signup request failed',
              });
            }
          })
          .catch((error) => {
            Swal.fire({
              icon: 'error',
              title: 'Oops...!',
              text: 'Signup request failed',
            });
            console.error(error);
          });
      }
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Enter all fields',
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
          <Input
            type="text"
            variant="flushed"
            name="address"
            placeholder="Enter Address (Optional)"
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
