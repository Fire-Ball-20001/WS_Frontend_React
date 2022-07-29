import { MovieDto } from '../../models/movieDto';

export function getDataIsPage(
  data: MovieDto[],
  page: number,
  count: number
): MovieDto[] {
  if (page > getPages(data, count) || page < 0) {
    return getDataIsPage(data, 0, count);
  }

  const startIndex = page * count;

  return data.filter(
    (_, index: number) => index >= startIndex && index < startIndex + count
  );
}

export function getPages(data: MovieDto[], count: number): number {
  return Math.ceil(data.length / count);
}
