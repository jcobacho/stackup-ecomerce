import Header from '../components/Header'
import { Outlet } from "react-router-dom";
import ScrollToTop from 'react-scroll-to-top';
import { Box, useDisclosure } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

function Root() {
    const { isOpen, onOpen, onClose } = useDisclosure()
    
    return ( 
    
        <div className="App">
            <Header openDrawer={onOpen}/>
            <main>

                <Box ml={'15rem'} mr={'15rem'}>
                    <Outlet />
                </Box>
                <ScrollToTop/>
            </main>
            <Sidebar isOpen={isOpen} onClose={onClose}/>
         </div>    
    );
}

export default Root;