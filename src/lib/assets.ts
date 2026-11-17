export const BASE_PATH = '/churrascoColombiano';

export function getAssetUrl(path: string | undefined | null): string {
  if (!path) return '';
  // Remote URLs or data URIs
  if (
    path.startsWith('http://') ||
    path.startsWith('https://') ||
    path.startsWith('data:') ||
    path.startsWith('blob:')
  ) {
    return path;
  }

  // Ensure leading slash
  const clean = path.startsWith('/') ? path : `/${path}`;

  // If already prefixed with BASE_PATH, return it
  if (clean.startsWith(BASE_PATH)) {
    return clean;
  }

  return `${BASE_PATH}${clean}`;
}
