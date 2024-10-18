import { Box, Button, Container, Flex, FormControl, FormLabel, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { useState } from "react";
import UserForm from "../components/Form";
import { Link as ReactRouterLink, useNavigate } from 'react-router-dom'
import { ProductAdminCreateRequest } from "../services/types";
import ProductAdminForm from "../components/Form";
import { useCreateProductMutation } from "../services/productSlice";

function CreateProductAdminPage() {

    const [createProduct, {isLoading: isCreating}] = useCreateProductMutation();

    const [formData, setFormData] = useState<ProductAdminCreateRequest>({});
    const [formErrors, setFormErrors] = useState();

    const navigate = useNavigate();

    async function HandleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            
            const { data, error } = await createProduct(formData)            

            if (data){
              navigate('/products/manage/')
            }

            if(error){
                setFormErrors(error?.data ?? {})
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

                        <ProductAdminForm formData={formData} setFormData={setFormData} formErrors={formErrors} />
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

export default CreateProductAdminPage;