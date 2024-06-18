import React from 'react';
import { VStack, Box, Divider, AspectRatio, Center, Stack, HStack, Heading, Text, Image } from 'native-base';

export default function Profile() {
  return (
    <Box alignItems="center" mt="5">
      <Text fontSize="lg" fontWeight="bold" color="coolGray.800" mb="5">
        EMPLOYEE
      </Text>
      <Box
        maxW="80"
        rounded="lg"
        overflow="hidden"
        borderColor="coolGray.200"
        borderWidth="1"
        _dark={{
          borderColor: "coolGray.600",
          backgroundColor: "gray.700"
        }}
        _web={{
          shadow: 2,
          borderWidth: 0
        }}
        _light={{
          backgroundColor: "gray.50"
        }}
      >
        <Box>
          <AspectRatio w="100%" ratio={16 / 9}>
            {/* <Image
              source={require('../../assets/images/ktm.jpg')}
              alt="image"
              resizeMode="cover"
              width="100%"
              height="100%"
            /> */}
          </AspectRatio>
          <Center
            bg="violet.500"
            _dark={{
              bg: "violet.400"
            }}
            _text={{
              color: "warmGray.50",
              fontWeight: "700",
              fontSize: "xs"
            }}
            position="absolute"
            bottom="0"
            px="3"
            py="1.5"
          >
            PHOTO
          </Center>
        </Box>
        <Stack p="4" space={3}>
          <Stack space={2}>
            <Heading size="md" ml="-1" color="coolGray.800">
              <Text fontSize="md" fontWeight="bold">BioMetric Code : 1615</Text>
            </Heading>
            <Heading size="md" ml="-1" color="coolGray.800">
              <Text fontSize="md" fontWeight="bold">Date of Birth : 12/11/199</Text>
            </Heading>
            <Heading size="md" ml="-1" color="coolGray.800">
              <Text fontSize="md" fontWeight="bold">Date of Joining : 18/3/2024</Text>
            </Heading>
          </Stack>
        </Stack>
      </Box>
    </Box>
  );
}
