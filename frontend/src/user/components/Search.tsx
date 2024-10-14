import { Box, Input, InputGroup, InputRightAddon } from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";

function SearchUser({search, setSearch, setPage}) {

    return ( 

        <Box>
            <InputGroup size='sm'>
                <Input placeholder='mysite' value={search} onChange={(e) => {setSearch(e.currentTarget.value); setPage(1)}}/>
            <InputRightAddon><FiSearch/></InputRightAddon></InputGroup>
        </Box>

     );
}

export default SearchUser;