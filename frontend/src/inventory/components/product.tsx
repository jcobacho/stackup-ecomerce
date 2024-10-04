// import { Card, Image, Text, CardBody, CardFooter, Stack, Heading, Divider, ButtonGroup, Button } from '@chakra-ui/react'
import 'bootstrap/dist/css/bootstrap.css';

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
    Link
  } from '@chakra-ui/react'
  import { BsStar, BsStarFill, BsStarHalf } from 'react-icons/bs'
  import { FiShoppingCart } from 'react-icons/fi'

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
    return ( 
        <Flex p={50} w="full" alignItems="center" justifyContent="center">
        <Box
          bg={useColorModeValue('white', 'gray.800')}
          maxW="sm"
          borderWidth="1px"
          rounded="lg"
          shadow="lg"
          position="relative">
          {/* {data.isNew && (
            <Circle size="10px" position="absolute" top={2} right={2} bg="red.200" />
          )} */}
  
          <Image src={record.image_url} alt={`Picture of ${record.name}`} roundedTop="lg" />
  
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
                <chakra.a href={'#'} display={'flex'}>
                  <Icon as={FiShoppingCart} h={7} w={7} alignSelf={'center'} />
                </chakra.a>
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
      </Flex>
     );
}

export default Product;