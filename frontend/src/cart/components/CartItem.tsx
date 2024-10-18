import { Box, Text, HStack, Image, Stack, Button, VStack } from '@chakra-ui/react'
import { useDispatch } from 'react-redux'
// import Image from 'next/image'
import ProductQuantity from './ProductQuantity'
import CartItemType from '../services/types' 
import { FiTrash } from 'react-icons/fi'
import { useAddToCartMutation } from '../services/cartSlice'
import { AddToCartRequest } from '../services/types'
import * as React from 'react'

const CartItem: React.FC<{ item: CartItemType }> = React.memo(({ item }): JSX.Element => {

  const [addToCart, {isLoading}] = useAddToCartMutation()

  async function HandleItemActionClick(quantity, set_qty, msg) {

    // prevent if still request pending
    if (isLoading)
      return

    const {data, error} = await addToCart({ id: item.product, quantity, set_qty } as AddToCartRequest)
      if (data){
        // raise toaster
        // distpatch to update state
        console.log(msg)
      }

      if(error){
        console.log("error?.data")
        console.log(error?.data)
      }
  }
  
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
            increment={() => {
              HandleItemActionClick(item.qty + 1, true, "item successfully updated")
            }}
            decrement={() => {
              let msg = "item successfully updated"
              const qty = item.qty - 1
              if (qty === 0){
                msg = "item successfully removed"
              }
              HandleItemActionClick(qty, true, msg)
            }}
            width="6rem"
            height="2rem"
          />
      </Box>
      <Box flexGrow={1} display={'flex'} textAlign={'end'} alignItems={'end'}>
        <Box flexGrow={1} display={'flex'} flexDirection={'column'} alignItems={'end'} h={'100%'}>
          <Button bg={'transparent'} p={0} onClick={() => {HandleItemActionClick(0, true, "item successfully removed")}}>
            <FiTrash/>
          </Button>

          {isLoading && <Button
            bg={'transparent'}
            marginTop={'auto'}
            p="0"
            isLoading={isLoading}
                        
          />}          
        </Box>
      </Box>
    </Stack>
      
    </HStack>
  )
})

export default CartItem