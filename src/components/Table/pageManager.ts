

export function getPages(totalCount: number, size: number): number {
  return Math.ceil(totalCount / size);
}
