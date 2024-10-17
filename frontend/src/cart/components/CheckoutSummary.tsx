import { Box, Button, Heading, HStack, Image, List, Text } from "@chakra-ui/react";
import { useAppSelector } from "../../store";
import { cartItems, totalAmount } from "../services/cartSlice";

function CheckoutSummary({isLoading}) {

    const orderitems = useAppSelector(cartItems) ?? []

    const amount = useAppSelector(totalAmount) ?? 0

    return ( 

        <Box
      px={{ base: '1.5rem', sm: '2rem' }}
      py={{ base: '2rem' }}
      bg="white"
    //   flexGrow={{ lg: 1 }}
    >
      <Heading fontSize={{ base: '1.125rem' }} letterSpacing="0.0806rem">
        Summary
      </Heading>
      {orderitems.length > 0 ? (
        <List as="ul" spacing="1.5rem" mt="2rem">
          {orderitems.map(item => (
            <HStack align="center" as="li" key={item.id} spacing="1.5rem">
              <Image
                src={item.imageUrl}
                borderRadius="0.5rem"
                boxSize="4rem"
              />
              <Box width="100%">
                <HStack justify="space-between" width="100%">
                  <Text
                    fontWeight="bold"
                    fontSize="0.9375rem"
                    color="black"
                    textTransform="uppercase"
                  >
                    {item.shortName}
                  </Text>
                  <Text
                    fontWeight="bold"
                    fontSize="0.9375rem"
                    alignSelf="flex-start"
                  >
                    x{item.qty}
                  </Text>
                </HStack>

                <Text fontWeight="bold" fontSize="0.875rem">
                  $ {item.price.toLocaleString('en-US')}
                </Text>
              </Box>
            </HStack>
          ))}
        </List>
      ) : (
        <Text textAlign="center" mt="1.5rem" fontWeight="bold">
          No Items in cart
        </Text>
      )}

      <Box mt="2rem">
            <HStack justify="space-between" mb="1.5rem" p={6}>
                <Text textTransform="uppercase">Total</Text>
                <Text fontSize=" 1.125rem" fontWeight="bold" color="black">
                  $ {amount.toFixed(2)}
                </Text>
               
              </HStack>

              <Box>
                <Button
                type="submit"
                isLoading={isLoading}
                //   as={Link}
                  cursor="pointer"
                //   to={'/checkout'}
                  width="100%"
                //   onClick={onClose}

                >
                  Pay
                </Button>
              </Box>
      </Box>
    </Box>

     );
}

export default CheckoutSummary;