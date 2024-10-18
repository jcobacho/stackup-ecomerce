// 'use client'

import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Stack,
  Button,
  Text,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react';
import { RegisterError, RegisterRequest } from '../services/types';
import { useRegisterMutation } from '../services/authSlice'
import { useNavigate } from 'react-router';
import RegistrationForm from '../components/RegistrationForm';
import { Link } from 'react-router-dom';

export default function RegisterPage() {

  const [formData, setFormData] = useState<RegisterRequest>({
    username: "",
    firstName: "",
    isShopper: false,
    isSeller: false,
    password: "",
    password2: ""
  });
  const [formErrors, setFormErrors] = useState<RegisterError>({});
  const [register, { isLoading }] = useRegisterMutation();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {

      const { data, error} = await register(formData)
      if (data){
        return navigate('/login')

      }
      if(error){
        console.log("error.data")
        console.log(error.data)
        // alert(error.data?.detail)
        setFormErrors(error?.data)
      }     
      
    } catch (err) {
        alert(`Failed to register; got ${err}`);
    }
  }

  return (
    <Flex
      minH={'100vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        {/* <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Text color={'blue.400'}>features</Text> ✌️
          </Text>
        </Stack> */}
        <Box
          rounded={'lg'}
          bg={useColorModeValue('white', 'gray.700')}
          boxShadow={'lg'}
          p={8}>
          <Stack as={'form'} spacing={4} onSubmit={onSubmit}>

              
              <RegistrationForm formData={formData} setFormData={setFormData} formErrors={formErrors}/>

              <Stack spacing={6}>
                
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  isLoading={isLoading}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'>
                  Register
                </Button>

                <Box alignItems={'center'} textAlign={'center'}>
                  <Link to={'/login'} color='teal.500'>Already have an account?</Link>
                </Box>
              </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}