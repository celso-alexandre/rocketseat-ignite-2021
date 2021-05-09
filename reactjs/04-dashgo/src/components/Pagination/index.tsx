import { Box, Stack } from '@chakra-ui/react';
import { PaginationItem } from './PaginationItem';

export function Pagination() {
  return (
    <Stack
      direction={['column', 'row']}
      mt="8"
      justify="space-between"
      align="center"
      spacing="6"
    >
      <Box>
        <strong>0</strong>
        {' '}
        -
        {' '}
        <strong>10</strong>
        {' '}
        de
        {' '}
        <strong>100</strong>
      </Box>
      <Stack direction="row" spacing="2">
        <PaginationItem isCurrent>1</PaginationItem>
        <PaginationItem>2</PaginationItem>
      </Stack>
    </Stack>
  );
}
