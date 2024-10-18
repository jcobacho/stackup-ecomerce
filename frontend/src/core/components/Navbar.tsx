import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  Stack,
  Collapse,
  Icon,
  Popover,
  PopoverTrigger,
  PopoverContent,
  useColorModeValue,
  useBreakpointValue,
  useDisclosure,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useColorMode,
  Center,
  Avatar,
} from '@chakra-ui/react'

import {
  HamburgerIcon,
  CloseIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  MoonIcon,
} from '@chakra-ui/icons'
import { FiShoppingCart } from 'react-icons/fi';
import { Link as ReactRouterLink } from 'react-router-dom'
import { logout } from '../../auth/services/authSlice';
import store, { useAppSelector } from "../../store";
import { removeCart, totalQuantity } from '../../cart/services/cartSlice';

export default function WithSubnavigation({openDrawer, isAuthenticated, authState}) {
  const { isOpen, onToggle } = useDisclosure()

  const total = useAppSelector(totalQuantity) | 0;

  function hasPerms(perms:Array<string>=[]){

    if(perms.length===0)
      return true

    let flag = false
    perms.map((perm:string) => {   
            
      if (isAuthenticated && authState?.user && authState.user[perm]){
        flag = true
        return
      }

    })
    return flag

  }

  return (
    <Box>
      <Flex
        bg={useColorModeValue('white', 'gray.800')}
        color={useColorModeValue('gray.600', 'white')}
        minH={'60px'}
        py={{ base: 2 }}
        px={{ base: 4 }}
        borderBottom={1}
        borderStyle={'solid'}
        borderColor={useColorModeValue('gray.200', 'gray.900')}
        align={'center'}>
        <Flex
          flex={{ base: 1, md: 'auto' }}
          ml={{ base: -2 }}
          display={{ base: 'flex', md: 'none' }}>
          <IconButton
            onClick={onToggle}
            icon={isOpen ? <CloseIcon w={3} h={3} /> : <HamburgerIcon w={5} h={5} />}
            variant={'ghost'}
            aria-label={'Toggle Navigation'}
          />
        </Flex>
        <Flex flex={{ base: 1 }} justify={{ base: 'center', md: 'start' }}>
          <Text
            textAlign={useBreakpointValue({ base: 'center', md: 'left' })}
            fontFamily={'heading'}
            color={useColorModeValue('gray.800', 'white')}>
            Logo
          </Text>

          <Flex display={{ base: 'none', md: 'flex' }} ml={10}>
            <DesktopNav hasPerms={hasPerms} />
          </Flex>
        </Flex>

        {/* {isAuthenticated && authState.user.isShopper &&
        <Flex flex={{ base: 1, md: 0}
        }>
            <Button onClick={openDrawer} justify={'flex-end'}
          direction={'row'}
          spacing={6}>
                <FiShoppingCart/>
                <Center
                  as="span"
                  p=".6rem"
                  position="absolute"
                  width="1rem"
                  height="1rem"
                  bg="accent"
                  fontSize="0.8125rem"
                  borderRadius="50%"
                  color="white"
                  top="-0.375rem"
                  right="-0.75rem"
                  bgColor={'black'}
                >
                  {total}
                </Center>
            </Button>
        </Flex>} */}

        {/* {!isAuthenticated? */}
        
        <Stack
          flex={{ base: 1, md: 0 }}
          justify={'flex-end'}
          direction={'row'}
          spacing={6}>


            {isAuthenticated && authState.user.isShopper &&
            <Button onClick={openDrawer} bg={'transparent'} borderRadius={'32'} _hover={{'bg': 'gray.100'}}>
                <FiShoppingCart/>
                <Center
                  as="span"
                  p=".6rem"
                  position="absolute"
                  width="1rem"
                  height="1rem"
                  bg="accent"
                  fontSize="0.8125rem"
                  borderRadius="50%"
                  color="white"
                  top="-0.375rem"
                  right="-0.75rem"
                  bgColor={'black'}
                >
                  {total}
                </Center>
            </Button>}

          {!isAuthenticated?

            <>
              <Button as={ReactRouterLink} fontSize={'sm'} fontWeight={400} variant={'link'} to={'/login'}>
                Sign In
              </Button>
              <Button
                as={ReactRouterLink}
                display={{ base: 'none', md: 'inline-flex' }}
                fontSize={'sm'}
                fontWeight={600}
                color={'white'}
                bg={'pink.400'}
                to={'/register'}
                _hover={{
                  bg: 'pink.300',
                }}>
                Sign Up
              </Button>
            </>:
            <Menu>
            <MenuButton
              as={Button}
              rounded={'full'}
              variant={'link'}
              cursor={'pointer'}
              minW={0}>
              <Avatar
                size={'sm'}
                src={'https://avatars.dicebear.com/api/male/username.svg'}
              />
            </MenuButton>
            <MenuList alignItems={'center'}>
              <br />
              <Center>
                <Avatar
                  size={'2xl'}
                  src={'https://avatars.dicebear.com/api/male/username.svg'}
                />
              </Center>
              <br />
              <Center>
                <p>{authState?.user?.username}</p>
              </Center>
              <br />
              <MenuDivider />
              {authState?.user?.isStaff && <MenuItem as={ReactRouterLink} to={'/users'}>Manage Users</MenuItem>}
              {authState?.user?.isShopper &&<MenuItem as={ReactRouterLink} to={'/orders'}>My Orders</MenuItem>}
              {authState?.user?.isSeller && <MenuItem as={ReactRouterLink} to={'/products/manage/'}>My Products</MenuItem>}
              <MenuItem onClick={() => {store.dispatch(logout()); store.dispatch(removeCart()) }}>Logout</MenuItem>
            </MenuList>
          </Menu>
            
          }
        </Stack>        
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  )
}

const DesktopNav = ({hasPerms}) => {
  const linkColor = useColorModeValue('gray.600', 'gray.200')
  const linkHoverColor = useColorModeValue('gray.800', 'white')
  const popoverContentBgColor = useColorModeValue('white', 'gray.800')

  return (
    <Stack direction={'row'} spacing={4}>
      {NAV_ITEMS.map((navItem) => {  

        if(hasPerms(navItem.perms)){
          return <Box key={navItem.label} >
          <Popover trigger={'hover'} placement={'bottom-start'}>
            <PopoverTrigger>
              <Box
                as={ReactRouterLink}
                p={2}
                // href={navItem.href ?? '#'}
                fontSize={'sm'}
                fontWeight={500}
                color={linkColor}
                _hover={{
                  textDecoration: 'none',
                  color: linkHoverColor,
                }}
                to={navItem.href}>
                    {navItem.label}
                
              </Box>
            </PopoverTrigger>

            {navItem.children && (
              <PopoverContent
                border={0}
                boxShadow={'xl'}
                bg={popoverContentBgColor}
                p={4}
                rounded={'xl'}
                minW={'sm'}>
                <Stack>
                  {navItem.children.map((child) => (
                    <DesktopSubNav key={child.label} {...child} />
                  ))}
                </Stack>
              </PopoverContent>
            )}
          </Popover>
        </Box>
        }
                  })}
    </Stack>
  )
}

const DesktopSubNav = ({ label, href, subLabel }: NavItem) => {
  return (
    <Box
      as="a"
      href={href}
      role={'group'}
      display={'block'}
      p={2}
      rounded={'md'}
      _hover={{ bg: useColorModeValue('pink.50', 'gray.900') }}>
      <Stack direction={'row'} align={'center'}>
        <Box>
          <Text
            transition={'all .3s ease'}
            _groupHover={{ color: 'pink.400' }}
            fontWeight={500}>
            {label}
          </Text>
          <Text fontSize={'sm'}>{subLabel}</Text>
        </Box>
        <Flex
          transition={'all .3s ease'}
          transform={'translateX(-10px)'}
          opacity={0}
          _groupHover={{ opacity: '100%', transform: 'translateX(0)' }}
          justify={'flex-end'}
          align={'center'}
          flex={1}>
          <Icon color={'pink.400'} w={5} h={5} as={ChevronRightIcon} />
        </Flex>
      </Stack>
    </Box>
  )
}

const MobileNav = () => {
  return (
    <Stack bg={useColorModeValue('white', 'gray.800')} p={4} display={{ md: 'none' }}>
      {NAV_ITEMS.map((navItem) => (
        <MobileNavItem key={navItem.label} {...navItem} />
      ))}
    </Stack>
  )
}

const MobileNavItem = ({ label, children, href }: NavItem) => {
  const { isOpen, onToggle } = useDisclosure()

  return (
    <Stack spacing={4} onClick={children && onToggle}>
      <Box
        py={2}
        as="a"
        href={href ?? '#'}
        justifyContent="space-between"
        alignItems="center"
        _hover={{
          textDecoration: 'none',
        }}>
        <Text fontWeight={600} color={useColorModeValue('gray.600', 'gray.200')}>
          {label}
        </Text>
        {children && (
          <Icon
            as={ChevronDownIcon}
            transition={'all .25s ease-in-out'}
            transform={isOpen ? 'rotate(180deg)' : ''}
            w={6}
            h={6}
          />
        )}
      </Box>

      <Collapse in={isOpen} animateOpacity style={{ marginTop: '0!important' }}>
        <Stack
          mt={2}
          pl={4}
          borderLeft={1}
          borderStyle={'solid'}
          borderColor={useColorModeValue('gray.200', 'gray.700')}
          align={'start'}>
          {children &&
            children.map((child) => (
              <Box as="a" key={child.label} py={2} href={child.href}>
                {child.label}
              </Box>
            ))}
        </Stack>
      </Collapse>
    </Stack>
  )
}

interface NavItem {
  label: string
  subLabel?: string
  children?: Array<NavItem>
  href?: string
  perms?: Array<string>
}

const NAV_ITEMS: Array<NavItem> = [
  {
    label: 'Home',
    href: '/',
    
  },
  {
    label: 'Products',
    href: '/products',
    // perms: ['isShopper', 'isSeller']

  },
  // {
  //   label: 'Users',
  //   href: '/users',
  //   perms: ['isStaff']

  // },
//   {
//     label: 'Find Work',
//     children: [
//       {
//         label: 'Job Board',
//         subLabel: 'Find your dream design job',
//         href: '#',
//       },
//       {
//         label: 'Freelance Projects',
//         subLabel: 'An exclusive list for contract work',
//         href: '#',
//       },
//     ],
//   },
//   {
//     label: 'Learn Design',
//     href: '#',
//   },
//   {
//     label: 'Hire Designers',
//     href: '#',
//   },
]