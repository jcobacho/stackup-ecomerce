import { Box, Checkbox, Divider, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";
import FormField from "../../core/components/FormField";
import PasswordFormField from "../../core/components/PasswordFormField";
import { RegisterError, RegisterRequest } from "../services/types";

const RegistrationForm = ({
    formData, setFormData, formErrors
  }: {
    formData: RegisterRequest
    setFormData: (...args: any) => void
    formErrors: RegisterError
  
  }): JSX.Element => {
    return ( 

        <>

            <FormField 
                field="username" 
                value={formData?.username} 
                label="Username" 
                placeholder={'mynick'} 
                errorMessage={formErrors?.username? formErrors?.username[0] : ''}
                isInvalid={formErrors?.username ? true : false } 
                onChange={(e) => setFormData({ ...formData, username: (e.target as HTMLInputElement).value })}
                                
            />

            <FormField 
                field="firstName" 
                value={formData?.firstName} 
                label="First Name" 
                placeholder={'John'} 
                errorMessage={formErrors?.firstName? formErrors?.firstName[0] : ''}
                isInvalid={formErrors?.firstName ? true : false } 
                onChange={(e) => setFormData({ ...formData, firstName: (e.target as HTMLInputElement).value })}
                
            />

            <PasswordFormField 
                field="password" 
                value={formData?.password} 
                label="Password" 
                placeholder={''} 
                errorMessage={formErrors?.password? formErrors?.password[0] : ''}
                isInvalid={formErrors?.password ? true : false } 
                onChange={(e) => setFormData({ ...formData, password: (e.target as HTMLInputElement).value })}
                
            />

            <PasswordFormField 
                field="password2" 
                value={formData?.password2} 
                label="Repeat Password" 
                placeholder={''} 
                errorMessage={formErrors?.password2? formErrors?.password2[0] : ''}
                isInvalid={formErrors?.password2 ? true : false } 
                onChange={(e) => setFormData({ ...formData, password2: (e.target as HTMLInputElement).value })}
                
            />

            <Box position='relative' marginTop={'5'}>
                Roles

                <Divider mb={2} />

                <Stack spacing={[1, 5]} direction={['column', 'row']}>

                  <Checkbox size='lg' colorScheme='green' isChecked={formData?.isShopper} value={'isShopper'} onChange={(e) =>
                                setFormData({ ...formData, isShopper: e.target.checked })}>
                      Is Shopper?
                  </Checkbox>
                  <Checkbox size='lg' colorScheme='orange' isChecked={formData?.isSeller} value={'isSeller'} onChange={(e) =>
                                setFormData({ ...formData, isSeller: e.target.checked })}>
                      Is Seller?
                  </Checkbox>
                </Stack> 
            </Box>

        </>
    );
}

export default RegistrationForm;