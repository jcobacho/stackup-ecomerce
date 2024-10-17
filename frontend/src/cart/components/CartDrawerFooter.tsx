import { Box, Button, HStack, Spacer, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { totalAmount, totalQuantity } from "../services/cartSlice";

function CartDrawerFooter() {

    const amount = useAppSelector(totalAmount) ?? 0
    const quantity = useAppSelector(totalQuantity) ?? 0 

    return ( 

        <>
        {quantity > 0  && (
        <Box>
            <HStack justify="space-between" mb="1.5rem" p={6}>
                <Text textTransform="uppercase">Total</Text>
                <Text fontSize=" 1.125rem" fontWeight="bold" color="black">
                  $ {amount.toFixed(2)}
                </Text>
               
              </HStack>

              <Box p={6}>
                <Button
                  as="a"
                  cursor="pointer"
                  onClick={() => alert('got to checkout!')}
                  width="100%"
                >
                  Checkout
                </Button>
              </Box>
          </Box> )}

          </>
      
     );
}

export default CartDrawerFooter;