import { Movie } from '../../models/Movie';

export function getDataIsPage(
  data: Movie[],
  page: number,
  count: number
): Movie[] {
  if (page > getPages(data, count) || page < 0) {
    return getDataIsPage(data, 0, count);
  }

  const startIndex = page * count;

  return data.filter(
    (_, index: number) => index >= startIndex && index < startIndex + count
  );
}

export function getPages(data: Movie[], count: number): number {
  return Math.ceil(data.length / count);
}
