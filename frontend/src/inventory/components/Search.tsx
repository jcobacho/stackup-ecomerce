import { Box, Flex, Input, InputGroup, InputRightElement, Spacer, Stack } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

function ProductSearch({search, setSearch, setPage}) {
    return ( 

        <Stack direction={'row'} gap={4} alignItems={'center'}  w={'100%'} mt={'8'} mb={'10'}>
            <Spacer/>
            <Box flexGrow={'1'}>
            <InputGroup>
                
                <Input value={search} onChange={(e) => {setSearch(e.currentTarget.value); setPage(1)}}/>
                <InputRightElement>
                    <FiSearch />
                </InputRightElement>
            </InputGroup>
            </Box>
            <Spacer/>

        </Stack>
     );
}

export default ProductSearch;