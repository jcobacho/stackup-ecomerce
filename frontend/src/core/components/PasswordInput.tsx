import { Button, Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

function PasswordInput({formData, setFormData}) {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
  
    return (
      <InputGroup size='md'>
        <Input
          pr='4.5rem'
          type={show ? 'text' : 'password'}
          placeholder='Enter password'
          value={formData.password}
          onChange={(e) =>
            setFormData({ ...formData, password: e.target.value })
        }
        />
        <InputRightElement width='4.5rem'>
          <Button h='1.75rem' size='sm' onClick={handleClick}>
            {show ? <FiEye/> : <FiEyeOff/>}
          </Button>
        </InputRightElement>
      </InputGroup>
    )
  }

  export default PasswordInput;