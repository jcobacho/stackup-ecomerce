import { Box, Text, HStack, Image } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
// import Image from 'next/image'
import ProductQuantity from './ProductQuantity'
import CartItemType from '../services/types' 

const CartItem: React.FC<{ item: CartItemType }> = ({ item }): JSX.Element => {
  
  return (
    <HStack as="li" justify="space-between" align="center" listStyleType="none">
      <HStack align="center" sx={{ img: { borderRadius: '.5rem' } }}>
        <Image src={item.imageUrl} width={64} height={64} alt="" />
        <Box ml="1rem">
          <Text
            fontWeight="bold"
            fontSize="0.9375rem"
            color="black"
            textTransform="uppercase"
          >
            {item.shortName}
          </Text>
          <Text fontWeight="bold" fontSize="0.875rem">
            $ {item.price.toLocaleString('en-US')}
          </Text>
        </Box>
      </HStack>
      <ProductQuantity
        quantity={item.qty}
        // increment={increment}
        // decrement={decrement}
        width="6rem"
        height="2rem"
      />
    </HStack>
  )
}

export default CartItem