import { Box } from './styled';

export function Banner({ children }: { children: React.ReactNode | string }) {
  return <Box>{children}</Box>;
}
