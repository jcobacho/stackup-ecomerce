import {
    Box,
    Button,
    ButtonGroup,
    Flex,
    Input,
    InputGroup,
    InputLeftAddon,
    InputRightAddon,
    Spacer,
    StackDivider,
    Text,
    useDisclosure,    
    VStack
  } from '@chakra-ui/react'
import { useState } from 'react';
import UserList from '../components/List';
import { useGetAllUsersQuery } from '../services/userSlice';
import { useDebounce } from '../../core/hooks/useDebounce';
import SearchUser from '../components/Search';
import { Link as ReactRouterLink } from 'react-router-dom'


function UserPage() {

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 300)

    const {data, isFetching} = useGetAllUsersQuery({search: debouncedSearch, page});

    const records = data?.results ?? []
    
    return ( 

        <>

            <VStack   

                divider={<StackDivider borderColor='gray.200' />}

                spacing={4}
                align='stretch'
                >
                <Box h={'15px'}></Box>
                <Box w={"100%"} display='flex' >
                    <Box>
                        <Button as={ReactRouterLink} to={'/users/create'}>Create</Button>
                    </Box>
                    <Spacer />
                    <SearchUser search={search} setSearch={setSearch} setPage={setPage}/>
                    
                </Box>
                <Box w={"100%"} >
                    <UserList records={records} isLoading={isFetching}/>
                </Box>
                <Box>
                    <Flex minWidth='max-content' alignItems='center' gap='2'>
                        <Box p='2'>
                            <Spacer />
                        </Box>
                        <Spacer />
                        <ButtonGroup gap='2'>
                            {data?.previous && <Button onClick={(e) => setPage(page-1)} colorScheme='teal'>{'<'}</Button>}
                            <Text>{'Page: ' + page}</Text>
                            {data?.next && <Button onClick={(e) => setPage(page+1)} colorScheme='teal'>{'>'}</Button>}
                        </ButtonGroup>
                        <Spacer />

                    </Flex>
                </Box>
                <Box h={'100px'}></Box>
            </VStack>

        </>
     );
}

export default UserPage;