import { Box, Button, ButtonGroup, Flex, Input, InputGroup, Spacer, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { UserModel } from "../services/types";
import DeleteAlertDialog from "./DeleteAlertDialog";
import UserRow from "./UserRow";
import { useGetAllUsersQuery } from '../services/userSlice';
import Loading from "../../core/components/Loading";

function UserList({records, isLoading, handleEditButton}) {

    const [toDelete, setToDelete] = useState(0)

    const  { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete }= useDisclosure()

    if(isLoading)
        return  <Loading/>

    return ( 
<>
        <DeleteAlertDialog isOpen={isOpenDelete}
                                            onClose={onCloseDelete}
                                            toDelete={toDelete}
                                            setToDelete={setToDelete}/>
        
        {<TableContainer>
                <Table variant='simple'>
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
                            
                            <UserRow key={record.id} record={record} handleEditButton={handleEditButton} setToDelete={setToDelete} onOpenDelete={onOpenDelete}/>
                        ))}

                    
                    </Tbody>
                    <tfoot>

                       
                    </tfoot>
                
                </Table>
            </TableContainer>}
            <Flex minWidth='max-content' alignItems='center' gap='2'>
                <Box p='2'>
                    <Spacer />

                </Box>
                <Spacer />
                <ButtonGroup gap='2'>
                    <Button colorScheme='teal'>Prev</Button>
                    <Input value="1" />
                    <Button colorScheme='teal'>Next</Button>
                </ButtonGroup>
            </Flex>
            </>
     );
}

export default UserList;