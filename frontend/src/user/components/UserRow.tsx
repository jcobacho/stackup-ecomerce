import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Stack, Td, Tr } from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from 'react-router-dom'

const UserRow = React.memo(function UserRow({record, setToDelete, onOpenDelete}) {   

    return ( 

        <Tr data-id={record.id}>
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
                    <Button as={ReactRouterLink}
                        bg={'transparent'}
                        p={0}
                        _hover={{bg: 'transparent'}}
                        to={`/users/${record.id}/edit`} 
                    >
                        <EditIcon />
                    </Button>
                    <Button bg={'transparent'} p={0}
                        _hover={{bg: 'transparent'}}
                        color={'tomato'}
                        onClick={(e) => {e.preventDefault(); setToDelete(record.id); onOpenDelete()}}>
                        <DeleteIcon />
                    </Button>
                    
                </Stack>

            </Td>
        </Tr>


     );
})

export default UserRow;