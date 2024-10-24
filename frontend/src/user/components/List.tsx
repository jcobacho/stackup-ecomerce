import { Box, Button, ButtonGroup, Flex, Input, InputGroup, Spacer, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { UserModel } from "../services/types";
import UserRow from "./UserRow";
import { useDeleteUserMutation, useGetAllUsersQuery } from '../services/userSlice';
import Loading from "../../core/components/Loading";
import DeleteAlertDialog from "../../core/components/DeleteAlertDialog";

function UserList({debouncedSearch, page}) {

    const [toDelete, setToDelete] = useState(0)
    const {data, isFetching} = useGetAllUsersQuery({search: debouncedSearch, page});
    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation();

    const  { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const records = data?.results ?? []

    return ( 
<>
        <DeleteAlertDialog title={'Delete User'} isOpen={isOpenDelete}
                                            onClose={onCloseDelete}
                                            toDelete={toDelete}
                                            setToDelete={setToDelete}
                                            deleteFn={deleteUser}
                                            isDeleting={isDeleting}
                                            />
        
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

                        {!isFetching && records.map((record: UserModel) => (
                            
                            <UserRow key={record.id} record={record} setToDelete={setToDelete} onOpenDelete={onOpenDelete}/>
                        ))}
                       
                    
                    </Tbody>
                    <tfoot>

                       
                    </tfoot>
                
                </Table>
            </TableContainer>}

            {isFetching && <Loading/>}
            
            </>
     );
}

export default UserList;