import {
  Avatar, Box, Flex, Text,
} from '@chakra-ui/react';

export function Profile() {
  return (
    <Flex
      align="center"
    >
      <Box mr="4" textAlign="right">
        <Text>Celso Alexandre</Text>
        <Text
          color="gray.300"
          fontSize="small"
        >
          celsoalexandre@live.com
        </Text>
      </Box>

      <Avatar
        size="md"
        name="Celso Alexandre"
        src="https://github.com/celso-alexandre.png"
      />
    </Flex>
  );
}
