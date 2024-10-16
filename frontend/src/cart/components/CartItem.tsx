import { Box, Text, HStack, Image, Stack, Button } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
// import Image from 'next/image'
import ProductQuantity from './ProductQuantity'
import CartItemType from '../services/types' 
import { FiTrash } from 'react-icons/fi'

const CartItem: React.FC<{ item: CartItemType }> = ({ item }): JSX.Element => {
  
  return (
    <HStack as="li" justify="space-between" align="center" listStyleType="none">

    <Stack direction='row' w={'100%'}>

      <Image
          boxSize='100px'
          objectFit='cover'
          src={item.imageUrl}
        /> 
      
      <Box ml="1rem" display={'flex'} flexDirection={'column'}>
          <Text
            fontWeight="bold"
            fontSize="0.9375rem"
            color="black"
            textTransform="uppercase"
          >
            {item.shortName}
          </Text>
          <Text fontWeight="bold" fontSize="0.875rem">
            $ {item.price.toFixed(2)}
          </Text>

          <ProductQuantity
            quantity={item.qty}
            increment={() => alert('increase')}
            decrement={() => alert('decrease')}
            width="6rem"
            height="2rem"
          />
        </Box>
      <Box flexGrow={1} textAlign={'end'}>
        <Button bg={'transparent'} p={0}>
          <FiTrash/>
        </Button>
      
      </Box>
    </Stack>
      
    </HStack>
  )
}

export default CartItem