import {
    Drawer,
    DrawerBody,
    DrawerFooter,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    
  } from '@chakra-ui/react'
import { Link } from 'react-router-dom';
import CartDrawer from '../../cart/components/CartDrawer';

function Sidebar({ isOpen, onClose }) {

    const amount = 432.00

    const items = [
      {id: 1, shortName: "Tesla v3", price: 2500.00, cartImage: '', quantity:1},
      {id: 2, shortName: "Iphone 15", price: 785.00, cartImage: '', quantity:2},

    ]


    return ( 
        <Drawer onClose={onClose} isOpen={isOpen} size={'md'}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{`My Cart`}</DrawerHeader>
          <DrawerBody>

          <CartDrawer onClose={onClose}/>          
            
          </DrawerBody>
        </DrawerContent>
      </Drawer>
     );
}

export default Sidebar;