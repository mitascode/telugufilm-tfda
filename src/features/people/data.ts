import type { Id, PaginationResponse } from '@/core/shared/types';
import type {
  PersonCasting,
  PersonCrew,
  PersonDetails,
  PersonListItem,
} from '@/features/people/types';
import {
  filterPermittedMovies,
  filterPermittedPageResults,
  isPersonPermitted,
} from '@/features/permitted-contents/utils';
import { tmdbClient } from '@/features/tmdb/utils';
import { cache } from 'react';
import 'server-only';
import { ImageInfo } from '../media/types';

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

export const getPerson = cache(async (personId: Id) => {
  const searchParams = new URLSearchParams();

  const person = await tmdbClient.get<PersonDetails>(
    `/person&person_id=${personId}`,
    searchParams,
  );

  if (!isPersonPermitted(person)) return null;

  return person;
});

export const getPersonImages = cache(async (personId: Id) => {
  const images = await tmdbClient.get<{ profiles: ImageInfo[] }>(
    `/person.images&person_id=${personId}`,
  );

  return images.profiles;
});

export const getPersonCredits = cache(async (personId: Id) => {
  const credits = await tmdbClient.get<{
    cast: PersonCasting[];
    crew: PersonCrew[];
  }>(`/person.credits&person_id=${personId}`);

  credits.cast = filterPermittedMovies(credits.cast);
  credits.crew = filterPermittedMovies(credits.crew);

  return credits;
});



