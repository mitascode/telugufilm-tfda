import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getPopularMovies, getSliderMovies, getTopRatedMovies } from '@/features/movies/data';
import { Divider, Stack } from '@mui/material';

export const dynamic = 'force-dynamic';

export default async function News() {
  const [firstPage, sliders] = await Promise.all([
    getPopularMovies(FIRST_PAGE),
    getSliderMovies()
  ]);

  const infiniteListSearchParams = new URLSearchParams();
  infiniteListSearchParams.set('page', '%pageIndex%');

  return (
    <main>
      <FeaturedMovie movies={sliders} />
      <Stack spacing={2}>
        <Divider />
        <Padder>
          <Title level={1} title="News" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/news?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
