import { Box, Button, Container, Flex, FormControl, FormLabel, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { updateAuthenticatedUser } from "../../auth/services/authSlice";
import { useAppDispatch, useAppSelector } from "../../store";
import UserForm from "../components/Form";
import { UserUpdateRequest } from "../services/types";
import { useUpdateUserMutation, useGetUserByIdQuery } from "../services/userSlice";
import { Link as ReactRouterLink, useLoaderData, useNavigate } from 'react-router-dom'
import NotFound from "../../core/pages/404";


function EditUser() {

    const navigate = useNavigate();

    const dispatch = useAppDispatch()

    const query = useLoaderData() as number | undefined ;

    const {data:record, isFetching, error } = useGetUserByIdQuery(query ?? 0);
    
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();

    const [userFormData, setUserFormData] = useState<UserUpdateRequest>(record);
    
    const [userFormErrors, setUserFormErrors] = useState({});

    const authState = useAppSelector((state) => state.auth);

    useEffect(() => setUserFormData({
        id: query ?? 0,
        username: record?.username ?? '',
        firstName: record?.firstName ?? '',
        isStaff: record?.isStaff ?? false,
        isSeller: record?.isSeller ?? false,
        isShopper: record?.isShopper ?? false,
    }), [record])

    if (isFetching)
    	return (
        	<div>
            	<h1>Loading user posts data...</h1>
        	</div>
    	);
        
    else if (error?.status === 404){
        return <NotFound/>
    }    

    async function HandleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            
            const { data, error } = await updateUser({...userFormData, id: record.id})            

            if (data){
              if (data.id === authState?.user?.id){
                dispatch(updateAuthenticatedUser(data))
              }
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
            <Box
                mt={'15px'}
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
                            }} isLoading={isUpdating} colorScheme='blue' mr={3} type={'submit'}>
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

export default EditUser;