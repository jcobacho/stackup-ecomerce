import { DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Image, Stack, Td, Tr } from "@chakra-ui/react";
import * as React from "react";
import { Link as ReactRouterLink } from 'react-router-dom'

const ListItem = React.memo(function ListItem({record, setToDelete, onOpenDelete}) {
   

    return ( 

        <Tr data-id={record.id}>
            <Td><Image
                boxSize='70px'
                objectFit='cover'
                src={record.imageUrl}
                /> 
            </Td>
            <Td>{record.name}</Td>
            <Td>{record.description}</Td>
            <Td>{record.price}</Td>
            <Td>
                <Stack direction='row' spacing={4}>
                    <Button as={ReactRouterLink}                         
                        to={`/products/admin/${record.id}/edit`} 
                        bg={'transparent'}
                        p={0}
                        _hover={{bg: 'transparent'}}
                        >
                        <EditIcon />
                    </Button>
                    <Button bg={'transparent'}
                        p={0}
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

export default ListItem;