import { Box, Button, Container, Flex, FormControl, FormLabel, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import UserForm from "../components/Form";
import { UserCreateRequest } from "../services/types";
import { useCreateUserMutation } from "../services/userSlice";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'


function CreateUser() {
    const [createUser, {isLoading: isCreating}] = useCreateUserMutation();

    const [userFormData, setUserFormData] = useState<UserCreateRequest>({});
    const [userFormErrors, setUserFormErrors] = useState({});

    const navigate = useNavigate();

    async function HandleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            
            const { data, error } = await createUser(userFormData)            

            if (data){
              navigate('/users')
            }

            if(error){
                setUserFormErrors(error?.data ?? {})
            }     
            
        } catch (err) {
            alert(`Failed to create user; got ${err}`);
        }
    }

    return ( 


        <Container>
            <Box mt={'15px'}
                // bg={useColorModeValue('white', 'gray.700')}
                borderRadius="lg"
                p={8}
                // color={useColorModeValue('gray.700', 'whiteAlpha.900')}
                shadow="base">

                <form onSubmit={HandleFormSubmit}>

                    <VStack spacing={5}>

                        <UserForm userFormData={userFormData} setUserFormData={setUserFormData} userFormErrors={userFormErrors} />
                        <Flex>

                            <Spacer/>
                            <Button bg="blue.400" _hover={{
                            bg: 'blue.500',
                            }} isLoading={isCreating} colorScheme='blue' mr={3} type={'submit'}>
                            Save
                            </Button>
                            <Button as={ReactRouterLink} to={-1 as any}>Cancel</Button>
                        </Flex>

                    </VStack>
                </form>
              </Box>
        </Container>

     );
}

export default CreateUser;