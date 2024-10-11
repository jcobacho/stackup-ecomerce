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
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@chakra-ui/react'
import * as React from 'react';
import { useState } from 'react';
import Loading from '../../core/components/Loading';
import DeleteAlertDialog from '../components/DeleteAlertDialog';
// import { useState } from 'react';
// import { useSelector } from 'react-redux';
// import { useAppSelector } from '../../store';
import UserModal from '../components/Modal';
import { UserModel } from '../services/types';
import { useGetAllUsersQuery } from '../services/userSlice';

function UserPage() {

    const {data, isFetching} = useGetAllUsersQuery();

    const records = data?.results ?? []

    
    const  { isOpen, onOpen, onClose }= useDisclosure()
    const  { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete }= useDisclosure()
    const [selectedRecord, setSelectedRecord] = useState({
        username: "",
        firstName: "",
        isShopper: false,
        isSeller: false,
        isStaff: false
    })

    const [toDelete, setToDelete] = useState(0)


    function handleEditButton(e, record){

        setSelectedRecord(record)
        onOpen()

    }

    function handleCreateButton(e){

        setSelectedRecord({
            username: "",
            firstName: "",
            isShopper: false,
            isSeller: false,
            isStaff: false
        })
        onOpen()

    }

    return ( 

        <>
            <Button onClick={handleCreateButton}>Create</Button>
            <UserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} record={selectedRecord}/>
            <DeleteAlertDialog isOpen={isOpenDelete}
                                            onClose={onCloseDelete}
                                            toDelete={toDelete}
                                            setToDelete={setToDelete}/>
            
            {isFetching && <Loading/>}

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
                                        <Checkbox size='lg' colorScheme='red' pointerEvents={'none'} readOnly={true} isChecked={record.isStaff}>
                                            Is Staff?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='green' pointerEvents={'none'} readOnly={true} isChecked={record.isShopper}>
                                            Is Shopper?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='orange' pointerEvents={'none'} readOnly={true} isChecked={record.isSeller}>
                                            Is Seller?
                                        </Checkbox>
                                    </Stack>  
                                </Td>
                                <Td>
                                    <Stack direction='row' spacing={4}>
                                        <Button leftIcon={<EditIcon />} colorScheme='teal' variant='solid' onClick={(e) => handleEditButton(e, record)}>
                                            Edit
                                        </Button>
                                        <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='outline' onClick={(e) => {setToDelete(record.id); onOpenDelete()}}>
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