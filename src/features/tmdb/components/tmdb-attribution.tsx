import { NextLink } from '@/core/routing/components/next-link';
import { Box } from '@mui/material';
import Image from 'next/image';

export function TmdbAttribution() {

  return (
    <Box sx={{ padding: 2, textAlign: 'center' }}>
      <NextLink href="https://www.themoviedb.org/" aria-label="The Movie DB">
        <Image src='/logo.jpeg' width={100} height={100} alt='logo' />
      </NextLink>
    </Box>
  );
}

