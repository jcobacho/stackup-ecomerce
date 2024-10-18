import { useState } from 'react';
import { useDebounce } from '../../core/hooks/useDebounce';
// import SearchUser from '../components/Search';
import { Link as ReactRouterLink } from 'react-router-dom'
import { Box, Button, Spacer, StackDivider, VStack } from '@chakra-ui/react';
import AdminSearch from '../../core/components/AdminSearch';
import OrderList from '../components/OrderList';


function OrdersPage() {

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 300)
    return ( 

        <VStack   

        divider={<StackDivider borderColor='gray.200' />}

        spacing={4}
        align='stretch'
        >
            <Box h={'15px'}></Box>
            <Box w={"100%"} display='flex' >
                
                <Spacer />
                <Spacer />
                <AdminSearch search={search} setSearch={setSearch} setPage={setPage}/>
                
            </Box>
            <Box w={"100%"} >
                <OrderList debouncedSearch={debouncedSearch} page={page}/>
            </Box>

            <Box h={'100px'}></Box>
        </VStack>

     );
}

export default OrdersPage;