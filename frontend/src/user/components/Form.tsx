import { Box, Checkbox, Divider, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, Stack } from "@chakra-ui/react";
import PasswordFormField from "../../core/components/PasswordFormField";

function UserForm({userFormData, setUserFormData, userFormErrors}) {

    return ( 

        <>
            <FormControl isInvalid={Object.keys(userFormErrors).length > 0 ? true : false }>
              <FormLabel>Username</FormLabel>
              <Input name="username" placeholder='Username' onChange={(e) =>
                                setUserFormData({ ...userFormData, username: e.target.value })} 
                                value={userFormData?.username}/>
              {userFormErrors?.username ? (
                  <FormErrorMessage>{userFormErrors?.username[0]}</FormErrorMessage>                
              ) : (
                <FormHelperText>
                  Enter the username you'd like to login with.
                </FormHelperText>
              )}
            </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" placeholder='First name' onChange={(e) =>
                                setUserFormData({ ...userFormData, firstName: e.target.value })}
                                value={userFormData?.firstName }/>
              </FormControl>

              <PasswordFormField 
                field="password" 
                value={userFormData?.password} 
                label="Password" 
                placeholder={''} 
                errorMessage={userFormErrors?.password? userFormErrors?.password[0] : ''}
                isInvalid={userFormErrors?.password ? true : false } 
                onChange={(e) => setUserFormData({ ...userFormData, password: (e.target as HTMLInputElement).value })}
                
            />
             
              <Box position='relative' marginTop={'5'}>
                Roles
                <Divider />

                <Stack spacing={[1, 5]} direction={['column', 'row']}>

                  <Checkbox size='lg' colorScheme='red' isChecked={userFormData?.isStaff} value={'isStaff'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isStaff: e.target.checked })}>
                      Is Admin?
                  </Checkbox>
                  <Checkbox size='lg' colorScheme='green' isChecked={userFormData?.isShopper} value={'isShopper'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isShopper: e.target.checked })}>
                      Is Shopper?
                  </Checkbox>
                  <Checkbox size='lg' colorScheme='orange' isChecked={userFormData?.isSeller} value={'isSeller'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isSeller: e.target.checked })}>
                      Is Seller?
                  </Checkbox>
                </Stack> 
              </Box>

        </>
     );
}

export default UserForm;