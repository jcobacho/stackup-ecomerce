import { Button, FormControl, FormErrorMessage, FormLabel, Input, InputGroup, InputRightElement, Textarea } from "@chakra-ui/react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import PasswordInput from "./PasswordInput";
// FormField({field, value, label, type, isRequired, placeholder, errorMessage, isInvalid, onChange})
const FormField = ({
    field,
    value,
    label,
    type = 'text',
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
    return ( 

        <FormControl isRequired={isRequired}isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>

            {type == 'textarea' &&
                <Textarea name={field} placeholder={placeholder} onChange={onChange} 
                value={value}></Textarea> }         
            
            
            {type == 'text' || type == 'number' &&  <Input name={field} type={type} placeholder={placeholder} onChange={onChange} 
                            value={value}/>}

            
            <FormErrorMessage>{errorMessage}</FormErrorMessage>                
            
        </FormControl>
     );
}

export default FormField;