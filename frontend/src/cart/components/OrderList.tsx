import { Table, TableContainer, Tbody, Th, Thead, Tr } from "@chakra-ui/react";
import { useState } from "react";
import Loading from "../../core/components/Loading";
import { useGetMyOrdersQuery } from "../services/cartSlice";
import { OrderModel } from "../services/types";
import OrderListItem from "./OrderListItem";

function OrderList({debouncedSearch, page}) {

    const {data, isFetching} = useGetMyOrdersQuery({search: debouncedSearch, page});
    const records = data?.results ?? []

    return ( 
<>
        {<TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>ID</Th>
                        <Th>Shipping </Th>
                        <Th>Amount</Th>
                        <Th>Paid </Th>
                    </Tr>
                    </Thead>
                    <Tbody>

                        {!isFetching && records.map((record: OrderModel) => (
                            
                            <OrderListItem key={record.id} record={record}/>
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

export default OrderList;