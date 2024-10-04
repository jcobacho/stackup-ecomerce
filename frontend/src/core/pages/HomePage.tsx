import Header from '../components/Header'
import { Outlet } from "react-router-dom";
import ScrollToTop from 'react-scroll-to-top';
import { useDisclosure } from '@chakra-ui/react';
import Sidebar from '../components/Sidebar';

function HomePage() {
    const { isOpen, onOpen, onClose } = useDisclosure()

    return ( 
    
        <div className="App">
            <Header openDrawer={onOpen}/>
            <main>
                <Outlet />
                <ScrollToTop/>
            </main>
            <Sidebar isOpen={isOpen} onClose={onClose}/>
         </div>    
    );
}

export default HomePage;