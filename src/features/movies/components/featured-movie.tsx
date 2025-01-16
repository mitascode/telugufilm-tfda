"use client"

import { ButtonLink } from '@/core/ui/components/button-link';
import { Padder } from '@/core/ui/components/padder';
import type { MovieBase } from '@/features/movies/types';
import { getMovieReleaseYear } from '@/features/movies/utils';
import { TmdbImage } from '@/features/tmdb/components/tmdb-image';
import InfoIcon from '@mui/icons-material/InfoOutlined';
import { Box, Stack } from '@mui/material';
import { MovieOverview } from './movie-overview';
import { MovieTitle } from './movie-title';
import { useEffect, useState } from 'react';

type FeaturedMovieProps = {
  movies: MovieBase[]
};

export function FeaturedMovie({ movies }: FeaturedMovieProps) {
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % movies.length);
    }, 3000);

    return () => clearInterval(timer);
  }, [movies.length, 3000]);



  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 460, sm: 560, md: 660 },
        display: 'grid',
      }}
    >

      <TmdbImage
        src={movies?.[currentIndex]?.backdrop_path}
        alt={movies?.[currentIndex]?.title}
        tmdbImageQuality="original"
        fill
        priority
        sx={{
          objectFit: 'cover',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage:
            'radial-gradient(farthest-side at 70% 20%, transparent, #030303)',
        }}
      />
      <Box
        sx={{
          marginTop: 'auto',
          marginBottom: 2,
        }}
      >
        <Padder>
          <Stack spacing={2} sx={{ position: 'relative', maxWidth: '75ch' }}>
            <MovieTitle
              title={movies?.[currentIndex]?.title}
              subtitle={getMovieReleaseYear(movies?.[currentIndex])?.toString()}
            />
            <div>
              <MovieOverview text={movies?.[currentIndex]?.overview} maxLines={4} />
            </div>
            <div>
              <ButtonLink
                href={`/movies/${movies?.[currentIndex]?.id}`}
                variant="outlined"
                color="primary"
                startIcon={<InfoIcon />}
              >
                More Info
              </ButtonLink>
            </div>
          </Stack>
        </Padder>
      </Box>
    </Box>
  );
}
