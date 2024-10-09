import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    FormControl,
    FormLabel,
    Button,
    Input,
    useDisclosure,
  } from '@chakra-ui/react'
import { useState } from 'react';
import { UserCreateRequest } from '../services/types';
import { useCreateUserMutation } from '../services/userSlice';
import UserForm from './UserForm'

  export default function UserModal({ isOpen, onOpen, onClose }) {
  
    const [createUser, {isLoading: isUpdating}] = useCreateUserMutation();
    const [userFormData, setUserFormData] = useState<UserCreateRequest>({
      username: "",
      firstName: "",
      password: "",
      isShopper: false,
      isSeller: false,
      isStaff: false
    });
    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    async function handleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            const { data, error } = await createUser(userFormData)
            if (data){
              onClose()
            }

            if(error){
                alert(error.data?.detail)
            }     
            
        } catch (err) {
            alert(`Failed to create user; got ${err}`);
        }
    }
  
    return (
      <>

        <Modal
          isOpen={isOpen}
          onClose={onClose}
        >
          <ModalOverlay />

          <ModalContent>
          <form onSubmit={handleFormSubmit}>

            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

                    <UserForm userFormData={userFormData} setUserFormData={setUserFormData}/>
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={isUpdating} colorScheme='blue' mr={3} type={'submit'}>
                Save
              </Button>
              <Button onClick={onClose}>Cancel</Button>
            </ModalFooter>
            </form>

          </ModalContent>

        </Modal>

      </>
    )
  }