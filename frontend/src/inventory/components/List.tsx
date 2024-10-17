import { Box, Button, ButtonGroup, Flex, Input, InputGroup, Spacer, Table, TableCaption, TableContainer, Tbody, Th, Thead, Tr, useDisclosure } from "@chakra-ui/react";
import { useState } from "react";
import { ProductModel } from "../services/types";
import Loading from "../../core/components/Loading";
import ListItem from "./ListItem";
import DeleteAlertDialog from "../../core/components/DeleteAlertDialog";
import { useDeleteProductMutation, useGetAllAdminProductsQuery } from "../services/productSlice";

function ProductAdminList({debouncedSearch, page}) {

    const [toDelete, setToDelete] = useState(0)
    const {data, isFetching} = useGetAllAdminProductsQuery({search: debouncedSearch, page});
    const [deleteProduct, {isLoading: isDeleting}] = useDeleteProductMutation();


    const  { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure()
    const records = data?.results ?? []

    return ( 
<>
        <DeleteAlertDialog title={'Delete Product'} isOpen={isOpenDelete}
                                            onClose={onCloseDelete}
                                            toDelete={toDelete}
                                            setToDelete={setToDelete}
                                            deleteFn={deleteProduct}
                                            isDeleting={isDeleting}/>
        
        {<TableContainer>
                <Table variant='simple'>
                    <Thead>
                    <Tr>
                        <Th>Image</Th>
                        <Th>Name</Th>
                        <Th>Description </Th>
                        <Th>Price </Th>
                        <Th>Actions </Th>
                    </Tr>
                    </Thead>
                    <Tbody>

                        {!isFetching && records.map((record: ProductModel) => (
                            
                            <ListItem key={record.id} record={record} setToDelete={setToDelete} onOpenDelete={onOpenDelete}/>
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

export default ProductAdminList;