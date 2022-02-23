import { Box, Button, Flex, Spacer } from '@chakra-ui/react';
import NextLink from 'next/link';
import { useColorMode } from '@chakra-ui/react';

export default function Navbar() {
    const { colorMode, toggleColorMode } = useColorMode()

    return (
        // <nav className={styles.nav}>
        //     <ul className={styles.list}>
        //         <li className={styles.item}>
        //             <Link href="/">
        //                 <a>Home</a>
        //             </Link>
        //         </li>
        //         <li>
        //             <Link href="/add-post">
        //                 <a>Add post</a>
        //             </Link>
        //         </li>
        //     </ul>
        // </nav>

        <Flex>
            <Box ml={20} p='4' bg='orange.200'>
                <NextLink href="/">
                    Home</NextLink>
            </Box>
            <Box p='4' bg='orange.300'>
                <NextLink href="/add-post">
                    Add post
                </NextLink>
            </Box>
            <Box p='4' bg='orange.400'>
                <NextLink href="/posts">
                    View posts
                </NextLink>
            </Box>
            <Spacer />
            
            
            <Box p='4' bg='gray.300'>
                <NextLink href="/">
                    Another home button
                </NextLink>
            </Box>
            <Box mr={20} p='4' bg='gray.400' onClick={toggleColorMode}>
                Toggle {colorMode === 'light' ? 'Dark' : 'Light'}
            </Box>
        </Flex>
    );
}