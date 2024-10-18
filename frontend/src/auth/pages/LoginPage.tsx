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
import { LoginRequest } from '../services/types';
import { useLoginMutation } from '../services/authSlice'
import { useNavigate } from 'react-router';
import PasswordInput from '../../core/components/PasswordInput';

export default function LoginPage() {

  const [loginFormData, setLoginFormData] = useState<LoginRequest>({
      username: "",
      password: "",
  });

  const [login, { isLoading }] = useLoginMutation();
  const navigate = useNavigate();

  async function onSubmit(e) {
    e.preventDefault();
    try {

      const { data, error} = await login(loginFormData)
      if (data){
        return navigate('/')

      }
      if(error){
        alert(error.data?.detail)
      }     
      
    } catch (err) {
        alert(`Failed to login; got ${err}`);
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
          <Stack as={'form'} spacing={10} onSubmit={onSubmit}>

              <FormControl id="email">
                <FormLabel>Username</FormLabel>
                <Input type="username" value={loginFormData.username}
                            onChange={(e) =>
                                setLoginFormData({ ...loginFormData, username: e.target.value })
                            }/>
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <PasswordInput formData={loginFormData} setFormData={setLoginFormData}/>
              </FormControl>
              <Stack spacing={10}>
                
                <Button
                  bg={'blue.400'}
                  color={'white'}
                  isLoading={isLoading}
                  _hover={{
                    bg: 'blue.500',
                  }}
                  type='submit'>
                  Sign in
                </Button>
              </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  )
}