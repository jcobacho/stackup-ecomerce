import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Stack, Td, Tr } from "@chakra-ui/react";
import * as React from "react";

const UserRow = React.memo(function UserRow({record, handleEditButton, setToDelete, onOpenDelete}) {
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
                    <Button leftIcon={<EditIcon />} colorScheme='teal' variant='solid' onClick={(e) => handleEditButton(e, record)}>
                        Edit
                    </Button>
                    <Button leftIcon={<DeleteIcon />} colorScheme='red' variant='outline' onClick={(e) => {setToDelete(record.id); onOpenDelete()}}>
                        Delete
                    </Button>
                    
                </Stack>

            </Td>
        </Tr>


     );
})

export default UserRow;