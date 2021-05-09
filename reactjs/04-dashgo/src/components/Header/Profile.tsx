import {
  Avatar, Box, Flex, Text,
} from '@chakra-ui/react';

interface Props {
  showProfileData?: boolean;
}

export function Profile({
  showProfileData = true,
}: Props) {
  return (
    <Flex
      align="center"
    >
      {showProfileData && (
        <Box mr="4" textAlign="right">
          <Text>Celso Alexandre</Text>
          <Text
            color="gray.300"
            fontSize="small"
          >
            celsoalexandre@live.com
          </Text>
        </Box>
      )}

      <Avatar
        size="md"
        name="Celso Alexandre"
        src="https://github.com/celso-alexandre.png"
      />
    </Flex>
  );
}
