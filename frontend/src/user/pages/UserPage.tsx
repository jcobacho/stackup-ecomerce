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
import { FiSearch } from 'react-icons/fi';
import UserList from '../components/List';
import UserModal from '../components/Modal';
import { useGetAllUsersQuery } from '../services/userSlice';
import { useDebounce } from '../../core/hooks/useDebounce';

function UserPage() {

    const [search, setSearch] = useState('')
    const [page, setPage] = useState(1)

    const debouncedSearch = useDebounce(search, 300)

    const {data, isFetching} = useGetAllUsersQuery({search: debouncedSearch, page});

    const records = data?.results ?? []
    
    const  { isOpen, onOpen, onClose }= useDisclosure()
    const [selectedRecord, setSelectedRecord] = useState({
        username: "",
        firstName: "",
        isShopper: false,
        isSeller: false,
        isStaff: false
    })    

    function handleEditButton(e, record){

        setSelectedRecord(record)
        onOpen()

    }

    function handleCreateButton(e){

        setSelectedRecord({
            username: "",
            firstName: "",
            isShopper: false,
            isSeller: false,
            isStaff: false
        })
        onOpen()

    }

    return ( 

        <>

            <UserModal isOpen={isOpen} onOpen={onOpen} onClose={onClose} record={selectedRecord}/>

            <VStack   

                divider={<StackDivider borderColor='gray.200' />}

                spacing={4}
                align='stretch'
                >
                <Box h={'15px'}>

                </Box>
                <Box w={"100%"} display='flex' >
                    <Box>
                        <Button onClick={handleCreateButton}>Create</Button>
                    </Box>
                    <Spacer />
                    <Box>
                        <InputGroup size='sm'>
                            <Input placeholder='mysite' value={search} onChange={(e) => {setSearch(e.currentTarget.value); setPage(1)}}/>
                        <InputRightAddon><FiSearch/></InputRightAddon></InputGroup>
                    </Box>
                </Box>
                <Box w={"100%"} >
                    <UserList records={records} isLoading={isFetching} handleEditButton={handleEditButton}/>
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