import type { PaginationResponse } from '@/core/shared/types';
import type {
  PersonListItem,
} from '@/features/people/types';
import {
  filterPermittedMovies,
  filterPermittedPageResults,
} from '@/features/permitted-contents/utils';
import { tmdbClient } from '@/features/tmdb/utils';
import { cache } from 'react';
import 'server-only';

export const getPopularPeople = cache(async (page: number) => {
  const searchParams = new URLSearchParams();
  searchParams.set('page', page.toString());

  const people = await tmdbClient.get<PaginationResponse<PersonListItem>>(
    '/person.popular',
    searchParams,
  );

  const permittedPeople = filterPermittedPageResults(people);

  permittedPeople.results.forEach((person) => {
    person.known_for = filterPermittedMovies(person.known_for);
  });

  return permittedPeople;
});



