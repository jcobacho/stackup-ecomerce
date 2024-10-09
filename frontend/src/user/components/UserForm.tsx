import { Box, Checkbox, Divider, FormControl, FormLabel, Input, Stack } from "@chakra-ui/react";

function UserForm({userFormData, setUserFormData}) {

    return ( 

        <>
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input name="username" placeholder='Username' onChange={(e) =>
                                setUserFormData({ ...userFormData, username: e.target.value })} />
            </FormControl>
  
              <FormControl mt={4}>
                <FormLabel>First Name</FormLabel>
                <Input name="firstName" placeholder='First name' onChange={(e) =>
                                setUserFormData({ ...userFormData, firstName: e.target.value })}/>
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Password</FormLabel>
                <Input name="password" type='password' placeholder='Password' onChange={(e) =>
                                setUserFormData({ ...userFormData, password: e.target.value })} />
              </FormControl>

              <Box position='relative' marginTop={'5'}>
                Roles
                <Divider />

                <Stack spacing={[1, 5]} direction={['column', 'row']}>

                  <Checkbox size='lg' colorScheme='red' value={'isStaff'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isStaff: e.target.checked })}>
                      Is Admin?
                  </Checkbox>
                  <Checkbox size='lg' colorScheme='green' value={'isShopper'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isShopper: e.target.checked })}>
                      Is Shopper?
                  </Checkbox>
                  <Checkbox size='lg' colorScheme='orange' value={'isSeller'} onChange={(e) =>
                                setUserFormData({ ...userFormData, isSeller: e.target.checked })}>
                      Is Seller?
                  </Checkbox>
              </Stack> 
              </Box>

        </>
     );
}

export default UserForm;