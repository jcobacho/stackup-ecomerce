import { FormControl, FormErrorMessage, FormLabel, Input } from "@chakra-ui/react";

function FormField({field, value, label, isRequired, placeholder, errorMessage, isInvalid, onChange}) {
    return ( 

        <FormControl isRequired={isRequired}isInvalid={isInvalid}>
            <FormLabel>{label}</FormLabel>
            <Input name={field} placeholder={placeholder} onChange={onChange} 
                            value={value}/>
            
            <FormErrorMessage>{errorMessage}</FormErrorMessage>                
            
        </FormControl>
     );
}

export default FormField;