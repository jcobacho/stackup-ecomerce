import {
    Box,
    Heading,
    SimpleGrid,
    Text,
    Stack,
    Radio,
    Spacer,
  } from '@chakra-ui/react'
  import { useState } from 'react'
import { useNavigate } from 'react-router'
import FormField from '../../core/components/FormField'
import FormLegend from '../../core/components/FormLegend'
import { usePayOrderMutation } from '../services/cartSlice'
import { PayOrderRequest } from '../services/types'
import CheckoutSummary from './CheckoutSummary'
  
  
  const CheckoutForm = (): JSX.Element => {
    
    const navigate = useNavigate();

    const [payOrder, {isLoading}] = usePayOrderMutation()

    const [formData, setFormData] = useState<PayOrderRequest>({
      name: '',
      emailAddress: "",
      address: "",
      zipcode: "",
      city: "",
      country: ""
    });
    const [formErrors, setFormErrors] = useState({});

    async function HandleFormSubmit(e){
        e.preventDefault()

        const {data, error} = await payOrder(formData)

        if (data){
            console.log("order paid successfully")
            navigate('/products')

        }

        if(error){
            setFormErrors(error?.data ?? {})
        }   

    }
      
    return (
      <Stack
        as="form"
        noValidate
        gap={3}
        onSubmit={HandleFormSubmit}
        direction={{ base: 'column', lg: 'row' }}
        alignItems={{ base: 'center', lg: 'start' }}
        spacing={{ base: '2rem' }}
        mt={{ base: '1.5rem' }}
      >
        <Spacer/>
        <Box
          borderColor="gray.200"

          borderWidth="1px"
          borderRadius="0.5rem"
          px={{ base: '1.5rem', sm: '1.75rem', lg: '3rem' }}
          pt={{ base: '1.5rem', sm: '1.875rem', lg: '3.625rem' }}
          pb={{ base: '2rem', lg: '3rem' }}
        //   maxWidth={{ lg: '45.625rem' }}
        //   flex={{ lg: '1 1 65%' }}
        >
          <Heading as="h1" fontSize={{ base: '1.75rem' }} mb={{ base: '2rem' }}>
            Checkout
          </Heading>
          <Box as="fieldset" mb="2rem">
            <FormLegend>Billing Details</FormLegend>
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
              gridGap={{ base: '1rem' }}
            >

            <FormField 
                field="name" 
                value={formData?.name} 
                label="Name" 
                isRequired={true}
                placeholder={'john Doe'} 
                errorMessage={formErrors?.name? formErrors?.name[0] : ''}
                isInvalid={formErrors?.name ? true : false } 
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}/>

            <FormField 
                field="emailAddress" 
                value={formData?.emailAddress} 
                label="Email Address" 
                isRequired={true}

                placeholder={'john Doe'} 
                errorMessage={formErrors?.emailAddress? formErrors?.emailAddress[0] : ''}
                isInvalid={formErrors?.emailAddress ? true : false } 
                onChange={(e) => setFormData({ ...formData, emailAddress: e.target.value })}/>

            </SimpleGrid>
          </Box>
          <Box as="fieldset" mb="2rem">
          
            <FormLegend>Shipping Info</FormLegend>
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
              gridTemplateAreas={{ sm: '"a a" "b c" "d ."' }}
              gridGap={{ base: '1em', sm: '1rem' }}
            >

            <FormField 
                field="address" 
                value={formData?.address} 
                label="Your Address" 
                isRequired={true}
                placeholder={'1137 Williams Avenue'} 
                errorMessage={formErrors?.address? formErrors?.address[0] : ''}
                isInvalid={formErrors?.address ? true : false } 
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}/>


            <FormField 
                field="zipcode" 
                value={formData?.zipcode} 
                label="ZIP Code" 
                isRequired={true}
                placeholder={'10001'} 
                errorMessage={formErrors?.zipcode? formErrors?.zipcode[0] : ''}
                isInvalid={formErrors?.zipcode ? true : false } 
                onChange={(e) => setFormData({ ...formData, zipcode: e.target.value })}/>


            <FormField 
                field="city" 
                value={formData?.city} 
                label="City" 
                isRequired={true}
                placeholder={'New York'} 
                errorMessage={formErrors?.city? formErrors?.city[0] : ''}
                isInvalid={formErrors?.city ? true : false } 
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}/>

            <FormField 
                field="country" 
                value={formData?.country} 
                label="Country" 
                isRequired={true}
                placeholder={'United States'} 
                errorMessage={formErrors?.country? formErrors?.country[0] : ''}
                isInvalid={formErrors?.country ? true : false } 
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}/>


            </SimpleGrid>
          </Box>
          <Box as="fieldset">
            <FormLegend>Payment Details</FormLegend>
            <SimpleGrid
              gridTemplateColumns={{ base: '1fr', sm: '1fr 1fr' }}
              gridGap={{ sm: '1rem' }}
            >
              <Text color="black" fontWeight="bold" fontSize="0.75rem" mb={2}>
                Payment Method
              </Text>

              <Box borderColor={'gray.100'} borderWidth='1px' borderRadius='md' overflow='hidden'
        //   boxShadow={'lg'}
          p={6}>
  
                <Radio size='lg' name='1' colorScheme='orange' defaultChecked>
                    Test
                </Radio>
                </Box>
              {/* <Box {...group}>
                {options.map(value => {
                  const radio = getRadioProps({ value })
                  return (
                    <Radio key={value} {...radio}>
                      {value}
                    </Radio>
                  )
                })}
              </Box> */}
            </SimpleGrid>
            
          </Box>
        </Box>
        <CheckoutSummary isLoading={isLoading}/>
        <Spacer/>

      </Stack>
    )
  }
  
  export default CheckoutForm