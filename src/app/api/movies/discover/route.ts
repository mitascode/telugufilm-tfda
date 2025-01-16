import { getDiscoverMovies } from '@/features/movies/data';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const { searchParams } = request.nextUrl;

  const page = Number(searchParams.get('page'));
  const genreId = Number(searchParams.get('genreId')) || undefined;
 
  const sortBy = searchParams.get('sortBy') || undefined;

  const moviesPage = await getDiscoverMovies(page, genreId, sortBy);

  return NextResponse.json(moviesPage);
}
