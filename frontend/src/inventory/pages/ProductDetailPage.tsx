import { Box, Button, ButtonGroup, Container, Heading, Icon, Image, SimpleGrid, Spacer, Stack, Text } from "@chakra-ui/react";
import { useState } from "react";
import { FiShoppingCart } from "react-icons/fi";
import { useLoaderData } from "react-router";
import { useAddToCartMutation } from "../../cart/services/cartSlice";
import { AddToCartRequest } from "../../cart/services/types";
import { useAppSelector } from "../../store";
import ProductQuantity from "../components/ProductQuantity";
import { useGetProductByIdQuery } from "../services/productSlice";

function ProductDetailPage() {


    const query = useLoaderData() as number | undefined ;
    const {data:record, isFetching, error } = useGetProductByIdQuery(query ?? 0);
    const [addToCart, {isLoading}] = useAddToCartMutation()
    const [quantity, setQuantity] = useState(1)

    const loggedUser = useAppSelector((state) => state.auth.user)

    async function HandleAddToCartClick() {
        const {data, error } = await addToCart({ id: record?.id, quantity, set_qty:false } as AddToCartRequest)
        if (data){
            console.log('cart updated successfully')
        }        
    }

    return ( 

        <Stack
            gap={2}
            direction={{ base: 'column', lg: 'row' }}
            alignItems={{ base: 'center', lg: 'start' }}
            spacing={{ base: '2rem' }}
            mt={{ base: '1.5rem' }}
            mx={{ base: '0', md: '20' }}
            // flex={'1 1 30%'}
            display={'flex'}
        >
            <Spacer/>

            <Box 
                flex={{ lg: '1 1 35%' }}
                px={{ base: '1.5rem', sm: '1.75rem', lg: '3rem' }}
                pt={{ base: '1.5rem', sm: '1.875rem', lg: '3.625rem' }}
                pb={{ base: '2rem', lg: '3rem' }}
            >
            
                <Image
                    // boxSize='lg'
                    w={'100%'}
                    objectFit='cover'
                    src={record?.imageUrl}
                /> 
            </Box>
                
            <Box
                px={{ base: '1.5rem', sm: '2rem' }}
                py={{ base: '2rem' }}
                bg="white"
                flex={{ lg: '1 1 45%' }}

            >
                <Stack mt="6" spacing="3">
                    <Text color={'darkorange'} fontWeight={600} mb={1}>
                    SNEAKER COMPANY
                    </Text>
                    <Heading size="2xl" fontWeight={'600'} mb={4}>
                    {record?.name}
                    </Heading>
                    <Text color={'#aeafb3'}>
                    These low-profile sneakers are your perfect casual wear companion.
                    Featuring a durable rubber outer sole, they’ll withstand
                    everything the weather can offer.
                    </Text>
                    <ButtonGroup spacing="4">
                    <Text fontWeight={'600'} fontSize="2xl" display={'flex'}>
                        ${record?.price.toFixed(2)}
                    </Text>

                    {/* <Button
                        fontWeight={'600'}
                        display={'flex'}
                        alignSelf={'center'}
                        bg={'ghostwhite'}
                        color={'yellowgreen'}
                    >
                        50%
                    </Button> */}
                    </ButtonGroup>
                    {/* <Text as="s" color={'#aeafb3'} mt={'-4'}>
                    $250.00
                    </Text> */}

                    {loggedUser?.isShopper && <Box>
                        <ButtonGroup spacing="2" mt={6}>
                            <ProductQuantity quantity={quantity} setQuantity={setQuantity} width="6rem" height="2rem"/>
                            
                            <Button colorScheme="orange" px={'14'} color={'white'} onClick={HandleAddToCartClick} isLoading={isLoading}>
                                <Icon as={FiShoppingCart} h={4} w={4} alignSelf={''} mr={4} />

                                Add to cart
                            </Button>
                        </ButtonGroup>
                    </Box>}
                </Stack>
            </Box>
            <Spacer/>
                
        </Stack>

     );
}

export default ProductDetailPage;