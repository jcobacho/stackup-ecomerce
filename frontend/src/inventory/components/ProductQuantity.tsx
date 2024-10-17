import { Flex, Button as ChakraButton, Center, Input } from '@chakra-ui/react'

const ProductQuantity = ({
  quantity,
  setQuantity,
  width,
  height,
}: {
  quantity: number
  setQuantity: (qty: number) => void
  width: string
  height: string
}): JSX.Element => {
  return (
    <Flex bg="gray.100" alignItems="center" width={width} height={height} mt={'auto'}>
      <Button sign="-" handleClick={() => setQuantity(quantity-1)} />
      <Center fontSize="0.8125rem" fontWeight="bold" width="30%">
        {quantity}
        
      </Center>
      <Button sign="+" handleClick={() => setQuantity(quantity+1)} />
    </Flex>
  )
}

const Button = ({
  sign,
  handleClick,
}: {
  sign: string
  handleClick: () => void
}): JSX.Element => {
  return (
    <ChakraButton
      onClick={handleClick}
      width="40%"
      height="100%"
      color="text"
      fontSize="0.9375rem"
      fontWeight="bold"
      border="none"
      p="0"
      bg="transparent"
      _hover={{
        bg: 'gray.200',
        color: 'accent',
      }}
    >
      {sign}
    </ChakraButton>
  )
}

export default ProductQuantity