import { Box, Button, Heading, HStack, List, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { cartItems, totalQuantity, useEmptyCartMutation } from "../services/cartSlice";
import CartEmpty from "./CartEmpty";
import CartItem from "./CartItem";

function CartDrawerBody({onClose}) {

    const orderitems = useAppSelector(cartItems) ?? []
    const totalQty = useAppSelector(totalQuantity) ?? 0

    const [emptyCart, {isLoading}] = useEmptyCartMutation()

    async function HandleEmptyCartClick(e) {
      e.preventDefault()

      const {data, error} = await emptyCart()
      if (data){
        console.log('cart emptied successfully')
      }
      if (error){
        console.log(error.data.detail)
      }
      
    }

    return ( 

        <>
        {orderitems.length > 0 ? (
            <Box>
              <HStack justify="space-between" mb="2rem">
                <Heading as="h3" fontSize="1.125rem" letterSpacing="0.0806rem">
                  Cart ({totalQty})
                </Heading>
                <Button
                  variant="link"
                  fontSize="0.9375rem"
                  textTransform="capitalize"
                  m="0"
                  isLoading={isLoading}
                  textDecoration="underline"
                  onClick={HandleEmptyCartClick}
                  _hover={{
                    color: 'accent',
                  }}
                >
                  Remove all
                </Button>
              </HStack>
              {!!orderitems.length && (
                <List spacing="1.5rem" mb="2rem">
                  {orderitems.map(cartItem => (
                    <CartItem item={cartItem} key={cartItem.id} />
                  ))}
                </List>
              )}
              
            </Box>
          ) : (
            <CartEmpty/>
          )}
</>

     );
}

export default CartDrawerBody;