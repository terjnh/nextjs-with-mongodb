import { Center, Flex, Badge, Box, Image, SimpleGrid } from '@chakra-ui/react';

export default function AirbnbExample({ props }) {

    const { param1, param2 } = props;
    console.log('param1:', param1)

    const property = {
        imageUrl: 'https://bit.ly/2Z4KKcF',
        imageAlt: 'Rear view of modern home with pool',
        beds: 3,
        baths: 2,
        title: 'Modern home in city center in the heart of historic Los Angeles',
        formattedPrice: '$1,900.00',
        reviewCount: 34,
    }

    return (
        <Center mt={8}>
            <SimpleGrid
                columns={2}
                spacing={10}
                align='center'>

                <Box maxW='sm' borderWidth='1px' borderRadius='lg' overflow='hidden'>
                    <Image boxSize='275px'
                        fit='contain'
                        src={property.imageUrl} alt={property.imageAlt} />

                    <Box p='6'>
                        <Box display='flex' alignItems='baseline'>
                            <Badge borderRadius='full' px='2' colorScheme='teal'>
                                New
                            </Badge>
                            <Box
                                color='gray.500'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                                ml='2'
                            >
                                {property.beds} beds &bull; {property.baths} baths
                            </Box>
                            <Box
                                color='red.600'
                                fontWeight='semibold'
                                letterSpacing='wide'
                                fontSize='xs'
                                textTransform='uppercase'
                                ml='2'
                            >
                                {param1} &bull; {param2}
                            </Box>
                        </Box>

                        <Box
                            mt='1'
                            fontWeight='semibold'
                            as='h4'
                            lineHeight='tight'
                            isTruncated
                        >
                            {property.title}
                        </Box>

                        <Box>
                            {property.formattedPrice}
                            <Box as='span' color='gray.600' fontSize='sm'>
                                / wk
                            </Box>
                        </Box>
                    </Box>
                </Box>
            </SimpleGrid>
        </Center>
    );

}