import { Box, Flex, Input, InputGroup, InputRightElement, Spacer, Stack } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

function ProductSearch({search, setSearch, setPage}) {
    return ( 

        <Stack direction={{base: 'column', md: 'row'}} gap={3} alignItems={'center'}  w={'100%'} mt={'8'} mb={'10'}>
            <Spacer display={{base: 'none', lg:'flex'}}/>
            <Box flexGrow={'1'} w={{base:'100%', lg:'initial'}}>
                <InputGroup>
                    
                    <Input value={search} onChange={(e) => {setSearch(e.currentTarget.value); setPage(1)}}/>
                    <InputRightElement>
                        <FiSearch />
                    </InputRightElement>
                </InputGroup>
            </Box>
            <Spacer display={{base: 'none', lg:'flex'}}/>

        </Stack>
     );
}

export default ProductSearch;