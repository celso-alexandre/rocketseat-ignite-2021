import { ElementType } from 'react';
import {
  Icon, Text, LinkProps as ChakraLinkProps, Link as ChakraLink,
} from '@chakra-ui/react';
import { ActiveLink } from '../ActiveLink';

interface Props extends ChakraLinkProps {
  icon: ElementType;
  children: string;
}

export function NavLink({
  icon,
  children,
  href,
  ...rest
}: Props) {
  return (
    <ActiveLink href={href} passHref>
      <ChakraLink display="flex" align="center" {...rest}>
        <Icon as={icon} fontSize="20" />
        <Text ml="4" fontWeight="medium">{children}</Text>
      </ChakraLink>
    </ActiveLink>
  );
}
