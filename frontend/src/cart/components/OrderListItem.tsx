import { CheckIcon, CloseIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";
import { Button, Checkbox, Image, Stack, Td, Tr } from "@chakra-ui/react";
import * as React from "react";

const OrderListItem = React.memo(function OrderListItem({record}) {
   

    return ( 

        <Tr data-id={record.id}>
            <Td>
                #{record.id}
            </Td>   
            <Td>{record.shippingInfo}</Td>
            <Td>$ {record.totalAmount}</Td>
            <Td>
                {record.paid? <CheckIcon color={'green.400'}/>: <CloseIcon color={'red.400'}/> }
            </Td>
           
        </Tr>


     );
})

export default OrderListItem;