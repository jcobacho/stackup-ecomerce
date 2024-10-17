// import { Card, Image, Text, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'

import {
    Flex,
    Circle,
    Box,
    Image,
    Badge,
    useColorModeValue,
    Icon,
    chakra,
    Tooltip,
    Link,
    Button
  } from '@chakra-ui/react'
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
  import { FiShoppingCart } from 'react-icons/fi'
import { useAddToCartMutation } from '../../cart/services/cartSlice'
import { AddToCartRequest } from '../../cart/services/types'
  interface RatingProps {
    rating: number
    numReviews: number
  }

  function Rating({ rating, numReviews }: RatingProps) {
    return (
      <Box display="flex" alignItems="center">
        {Array(5)
          .fill('')
          .map((_, i) => {
            const roundedRating = Math.round(rating * 2) / 2
            if (roundedRating - i >= 1) {
              return (
                <BsStarFill
                  key={i}
                  style={{ marginLeft: '1' }}
                  color={i < rating ? 'teal.500' : 'gray.300'}
                />
              )
            }
            if (roundedRating - i === 0.5) {
              return <BsStarHalf key={i} style={{ marginLeft: '1' }} />
            }
            return <BsStar key={i} style={{ marginLeft: '1' }} />
          })}
        <Box as="span" ml="2" color="gray.600" fontSize="sm">
          {numReviews} review{numReviews > 1 && 's'}
        </Box>
      </Box>
    )
  }

function Product({record}) {

    const [addToCart, {isLoading}] = useAddToCartMutation()

    async function HandleAddToCart(){

      const {data, error} = await addToCart({ id: record.id, quantity: 1 } as AddToCartRequest)
      if (data){
        // raise toaster
        // distpatch to update state
        console.log("display toastr")
        // dispatch(updateCartState(data as CartModel))
      }

      if(error){
        console.log("error?.data")
        console.log(error?.data)
      }

    }

    return ( 
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="md"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          {/* {data.isNew && (
            <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />
          )} */}
  
          {/* <Image src={record.imageUrl} alt={`Picture of ${record.name}`} roundedTop="lg" /> */}
  
          <Image
          boxSize='200px'
          w={'100%'}
          objectFit='cover'
          src={record.imageUrl}
        /> 
          <Box p="6">
            <Box display="flex" alignItems="baseline">
              {/* {data.isNew && (
                <Badge rounded="full" px="2" fontSize="0.8em" colorScheme="red">
                  New
                </Badge>
              )} */}
            </Box>
            <Flex mt="1" justifyContent="space-between" alignContent="center">
              <Box
                fontSize="2xl"
                fontWeight="semibold"
                lineHeight="tight"
                isTruncated>

                <chakra.a href={'#'} display={'flex'}>
                    {record.name}
                </chakra.a>
                
              </Box>
              <Tooltip
                label="Add to cart"
                bg="white"
                placement={'top'}
                color={'gray.800'}
                fontSize={'1.2em'}>
                <Button bg={'transparent'} type={'button'} display={'flex'} isLoading={isLoading} onClick={() => {
                    HandleAddToCart()
                }}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </Button>
              </Tooltip>
            </Flex>
  
            <Flex justifyContent="space-between" alignContent="center">
              {/* <Rating rating={data.rating} numReviews={data.numReviews} /> */}
              <Box fontSize="2xl" color={useColorModeValue('gray.800', 'white')}>
                <Box as="span" color={'gray.600'} fontSize="lg">
                  $
                </Box>
                {record.price?.toFixed(2)}
              </Box>
            </Flex>
          </Box>
        </Box>
     );
}

export default Product;