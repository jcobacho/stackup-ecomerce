import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Button,
    
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import CartDrawer from '../../cart/components/CartDrawer';
import CartDrawerFooter from '../../cart/components/CartDrawerFooter';

function Sidebar({ isOpen, onClose }) {

    return ( 
        <Drawer onClose={onClose} isOpen={isOpen} size={'sm'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`My Cart`}</DrawerHeader>
          <DrawerBody>

            <CartDrawer onClose={onClose}/>          
            
          </DrawerBody>

          <CartDrawerFooter/>


        </DrawerContent>
      </Drawer>
     );
}

export default Sidebar;