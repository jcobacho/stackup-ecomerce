import { DeleteIcon, EditIcon } from '@chakra-ui/icons';
import {
    Table,
    Thead,
    Tbody,
    Tfoot,
    Tr,
    Th,
    Td,
    TableCaption,
    TableContainer,
    Spinner,
    Center,
    Stack,
    Checkbox,
    Button,
    useDisclosure,
  } from '@chakra-ui/react'
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useAppSelector } from '../../store';
import UserModal from '../components/Modal';
import { UserModel } from '../services/types';
import { useGetAllUsersQuery, useUpdateUserPermissionMutation } from '../services/userSlice';

function UserPage() {

    const {data, isFetching} = useGetAllUsersQuery();

    const records = data?.results ?? []

    const [updateUserPermission, {isLoading: isUpdating, originalArgs}] = useUpdateUserPermissionMutation();
    
    const  { isOpen, onOpen, onClose }= useDisclosure()

    // const count = useSelector(selectTotalUsers);
    // const records = useSelector(selectAllUsers);
    // const usersLoading = useSelector(state => state.users.loading);
    // const records = []
    // console.log("records")
    // console.log(records)
    // console.log("originalArgs")
    // console.log(originalArgs)

    async function onRoleChange(e) {
        e.preventDefault();

        const dataid = e.target.closest('tr').dataset.id
        const role = e.target.value
        const value = e.target.checked

        let params = {}
        params[role] = value
        params['id'] = dataid

        try {

            const { error } = await updateUserPermission(params)
            if(error){
                alert(error.data?.detail)
            }     
            
        } catch (err) {
            alert(`Failed to login; got ${err}`);
        }
    }

    return ( 

        <>
            <Button onClick={onOpen}>Create</Button>
            <UserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose}/>

            {isFetching && <Center style={{ marginTop: "30vh" }}> <Spinner /></Center>}

            {!isFetching && 
            
            <TableContainer>
                <Table variant='simple'>
                    <TableCaption>Imperial to metric conversion factors</TableCaption>
                    <Thead>
                    <Tr>
                        <Th>Username</Th>
                        <Th>First Name </Th>
                        <Th>Roles </Th>
                        <Th>Actions </Th>
                    </Tr>
                    </Thead>
                    <Tbody>

                        {records.map((record: UserModel) => (
                            
                            <Tr key={record.id} data-id={record.id}>
                                <Td>{record.username}</Td>
                                <Td>{record.firstName}</Td>
                                <Td>
                                    <Stack spacing={[1, 5]} direction={['column', 'row']}>
                                        <Checkbox size='lg' colorScheme='red' readOnly={true} isChecked={record.isStaff} value={'isStaff'} onChange={onRoleChange}>
                                            Is Staff?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='green' readOnly={true} isChecked={record.isShopper} value={'isShopper'} onChange={onRoleChange}>
                                            Is Shopper?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='orange' readOnly={true} isChecked={record.isSeller} value={'isSeller'} onChange={onRoleChange}>
                                            Is Seller?
                                        </Checkbox>
                                    </Stack>  
                                </Td>
                                <Td>
                                    <Stack direction='row' spacing={4}>
                                        <Button leftIcon={<EditIcon />} colorScheme='teal' variant='solid' onClick={() => alert('clicked')}>
                                            Edit
                                        </Button>
                                        <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='outline'>
                                            Delete
                                        </Button>
                                    </Stack>

                                </Td>
                            </Tr>
                        ))}

                    
                    </Tbody>
                
                </Table>
            </TableContainer>}
        </>
     );
}

export default UserPage;