import { getMetadata } from '@/core/seo/utils';
import { FIRST_PAGE } from '@/core/shared/utils';
import { Padder } from '@/core/ui/components/padder';
import { Title } from '@/core/ui/components/title';
import { FeaturedMovie } from '@/features/movies/components/featured-movie';
import { MovieInfiniteGridList } from '@/features/movies/components/movie-infinite-grid-list';
import { getPopularMovies, getSliderMovies } from '@/features/movies/data';
import { Divider, Stack } from '@mui/material';

export const dynamic = 'force-dynamic';

export const metadata = getMetadata({
  title: 'Popular Movies',
  pathname: '/movies/popular',
});

export default async function PopularMoviesPage() {
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
          <Title level={1} title="Popular Movies" />
          <MovieInfiniteGridList
            pageKeyTemplate={`/api/movies/popular?${infiniteListSearchParams.toString()}`}
            firstPage={firstPage}
            skipFirstMovie
          />
        </Padder>
      </Stack>
    </main>
  );
}
