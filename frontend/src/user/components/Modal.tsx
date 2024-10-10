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
import { useAppDispatch, useAppSelector } from '../../store';
import { UserCreateRequest, UserUpdateRequest } from '../services/types';
import { useCreateUserMutation, useUpdateUserMutation } from '../services/userSlice';
import UserForm from './UserForm'
import { updateAuthenticatedUser } from '../../auth/services/authSlice';

export default function UserModal({ isOpen, onOpen, onClose, record }) {
  
    const [createUser, {isLoading: isCreating}] = useCreateUserMutation();
    const [updateUser, {isLoading: isUpdating}] = useUpdateUserMutation();

    const authState = useAppSelector((state) => state.auth);
   
    const [userFormData, setUserFormData] = useState<UserUpdateRequest | UserCreateRequest>(record);
    const dispatch = useAppDispatch()

    
    // const initialRef = React.useRef(null)
    // const finalRef = React.useRef(null)

    useEffect(() => {

      setUserFormData(record)

    }, [setUserFormData, record])

    async function handleFormSubmit(e){
        // const form = e.target
        e.preventDefault();

        try {

            let result;
            // let data, error;
            if(record?.id){
              result = await updateUser({...userFormData, id: record.id})
              // update authState if the logged user was modified
            }else{
              result = await createUser(userFormData)

            }
            const { data, error } = result;

            if (data){
              if (data.id === authState?.user?.id){
                dispatch(updateAuthenticatedUser(data))
              }

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

            <ModalHeader>{userFormData?.id ? 'Edit': 'Create'} User</ModalHeader>
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