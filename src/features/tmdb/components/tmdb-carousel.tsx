"use client"

import React, { useState, useEffect } from 'react';
import { Box, Radio, RadioGroup, FormControlLabel, FormControl } from '@mui/material';
import { useTmdbConfigurationContext } from './tmdb-configuration-context';

interface CarouselProps {
  images: string[];
  interval?: number;
}

export const TmdbCarousel: React.FC<CarouselProps> = ({ images, interval = 3000 }) => {

  const { getImageUrl } = useTmdbConfigurationContext();
  const [currentIndex, setCurrentIndex] = useState<number>(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval]);

  const handleRadioChange = (event: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setCurrentIndex(parseInt(value, 10));
  };

  return (
    <Box
      sx={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        margin: '0',
        overflow: 'hidden',
        // borderRadius: 2,
        objectFit: 'cover',
      }}
    >

      <Box
        component="img"
        src={images[currentIndex]}
        alt={`carousel-slide-${currentIndex}`}
        sx={{
          width: '100%',
          height: 'auto',
          objectFit: 'cover',
          // borderRadius: 2,
        }}
      />

      <FormControl sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
        <RadioGroup
          row
          aria-label="carousel navigation"
          name="carousel"
          value={currentIndex.toString()}
          onChange={handleRadioChange}
        >
          {images.map((_, index) => (
            <FormControlLabel
              key={index}
              value={index.toString()}
              control={<Radio size="small" sx={{ '&.Mui-checked': { color: '#1976d2' } }} />}
              label=""
            />
          ))}
        </RadioGroup>
      </FormControl>
    </Box>
  );
};

