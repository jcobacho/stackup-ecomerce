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
import { useState } from 'react';
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
    const [selectedRecord, setSelectedRecord] = useState({})

    function handleEditButton(e, record){

        setSelectedRecord(record)
        onOpen()

    }

    return ( 

        <>
            <Button onClick={(e) => {setSelectedRecord({}); onOpen()}}>Create</Button>
            <UserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} record={selectedRecord}/>

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
                                        <Checkbox size='lg' colorScheme='red' readOnly={true} isChecked={record.isStaff}>
                                            Is Staff?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='green' readOnly={true} isChecked={record.isShopper}>
                                            Is Shopper?
                                        </Checkbox>
                                        <Checkbox size='lg' colorScheme='orange' readOnly={true} isChecked={record.isSeller}>
                                            Is Seller?
                                        </Checkbox>
                                    </Stack>  
                                </Td>
                                <Td>
                                    <Stack direction='row' spacing={4}>
                                        <Button leftIcon={<EditIcon />} colorScheme='teal' variant='solid' onClick={(e) => handleEditButton(e, record)}>
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