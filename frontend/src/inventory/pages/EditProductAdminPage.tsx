import { Box, Button, Container, Flex, FormControl, FormLabel, Spacer, useColorModeValue, VStack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Link as ReactRouterLink, useLoaderData, useNavigate } from 'react-router-dom'
import { ProductAdminCreateError, ProductAdminCreateRequest, ProductAdminUpdateRequest } from "../services/types";
import ProductAdminForm from "../components/Form";
import { useGetAdminProductByIdQuery, useUpdateProductMutation } from "../services/productSlice";
import NotFound from "../../core/pages/404";

function EditProductAdminPage() {

    const query = useLoaderData() as number | undefined ;

    const {data:record, isFetching, error } = useGetAdminProductByIdQuery(query ?? 0);
    
    const [updateProduct, {isLoading: isUpdating}] = useUpdateProductMutation();

    const [formData, setFormData] = useState<ProductAdminUpdateRequest>(record);
    const [formErrors, setFormErrors] = useState<ProductAdminCreateError>({});

    const navigate = useNavigate();

    useEffect(() => setFormData({
        id: query ?? 0,
        name: record?.name ?? '',
        description: record?.description ?? '',
        imageUrl: record?.imageUrl ?? '',
        price: record?.price ?? 0,
    }), [record])

    if (isFetching)
    	return (
        	<div>
            	<h1>Loading products data...</h1>
        	</div>
    	);
        
    else if (error?.status === 404){
        return <NotFound/>
    } 

    async function HandleFormSubmit(){

        try {
            
            const { data, error } = await updateProduct(formData)            

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

export default EditProductAdminPage;