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
import { useEffect, useState } from 'react';
import { UserCreateRequest, UserUpdateRequest } from '../services/types';
import { useCreateUserMutation, useUpdateUserMutation } from '../services/userSlice';
import UserForm from './UserForm'

  export default function UserModal({ isOpen, onOpen, onClose, record }) {
  
    const [createUser, {isLoading: isCreating}] = useCreateUserMutation();
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();

    
    const [userFormData, setUserFormData] = useState<UserUpdateRequest | UserCreateRequest>({
      username: "",
      firstName: "",
      password: "",
      isShopper: false,
      isSeller: false,
      isStaff: false
  });

    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    useEffect(() => {

      if(record?.id)
        setUserFormData(record)

    }, [record])

    async function handleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            let result;
            // let data, error;
            if(record?.id){
              result = await updateUser({...userFormData, id: record.id})


            }else{
              result = await createUser(userFormData)

            }
            const { data, error } = result;

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
          <form onSubmit={handleFormSubmit} >

            <ModalHeader>Create your account</ModalHeader>
            <ModalCloseButton />
            <ModalBody pb={6}>

                  <UserForm userFormData={userFormData} setUserFormData={setUserFormData}/>
            </ModalBody>
  
            <ModalFooter>
              <Button isLoading={isUpdating || isCreating} colorScheme='blue' mr={3} type={'submit'}>
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