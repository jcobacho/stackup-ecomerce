import {
    Button,
    AlertDialog,
    AlertDialogOverlay,
    AlertDialogContent,
    AlertDialogHeader,
    AlertDialogBody,
    AlertDialogFooter,
  } from '@chakra-ui/react'
import * as React from 'react';
import { useDeleteUserMutation } from '../services/userSlice';

function DeleteAlertDialog({isOpen ,onClose, toDelete, setToDelete}) {


    const [deleteUser, {isLoading: isDeleting}] = useDeleteUserMutation();
    const cancelRef = React.useRef()


    return ( 


        <AlertDialog
                                            isOpen={isOpen}
                                            leastDestructiveRef={cancelRef}
                                            onClose={onClose}
                                        >
                                            <AlertDialogOverlay>
                                            <AlertDialogContent>
                                                <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                                                Delete User
                                                </AlertDialogHeader>

                                                <AlertDialogBody>
                                                Are you sure? You can't undo this action afterwards.
                                                </AlertDialogBody>

                                                <AlertDialogFooter>
                                                <Button ref={cancelRef} onClick={onClose}>
                                                    Cancel
                                                </Button>
                                                <Button isLoading={isDeleting} colorScheme='red' onClick={async (e) =>  {

                                                    if (!toDelete)
                                                        return

                                                    try {
                                                       
                                                        const { error, ...other } = await deleteUser(toDelete)
                                                        if (error?.originalStatus === 204 && error?.data === ''){
                                                            setToDelete(0)
                                                            onClose()

                                                        }
                                                        
                                                        else if(error){
                                                            alert(error.data?.detail)
                                                        }     
                                                        
                                                    } catch (err) {
                                                        alert(`Failed to create user; got ${err}`);
                                                    }
                                                    

                                                }} ml={3}>
                                                    Delete
                                                </Button>
                                                </AlertDialogFooter>
                                            </AlertDialogContent>
                                            </AlertDialogOverlay>
            </AlertDialog>


     );
}

export default DeleteAlertDialog;