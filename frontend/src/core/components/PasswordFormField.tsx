import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

const PasswordFormField = ({
    field,
    value,
    label,
    isRequired = true,
    placeholder,
    errorMessage,
    isInvalid,
    onChange,
  }: {
    field: string
    value: any
    label: string
    type?: string
    isRequired?: boolean
    placeholder: string,
    errorMessage: string,
    isInvalid: boolean,
    onChange: (e:any) => void,
  }): JSX.Element => {

    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return ( 

        <FormControl isRequired={isRequired}isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>

            <InputGroup size='md'>
              <Input
                name={field}
                pr='4.5rem'
                type={show ? 'text' : 'password'}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
              />
              <InputRightElement width='4.5rem'>
                <Button h='1.75rem' size='sm' onClick={handleClick} tabIndex={-1}>
                  {show ? <FiEye/> : <FiEyeOff/>}
                </Button>
              </InputRightElement>
            </InputGroup>
            <FormErrorMessage>{errorMessage}</FormErrorMessage>                
            
        </FormControl>
     );
}

export default PasswordFormField;