import mime from 'mime-types';

export const mimeTypes = {
  ...mime.types,
  js: 'text/javascript',
  jsx: 'text/javascript',
  ts: 'text/javascript',
  tsx: 'text/javascript',
};

export function getMimeType(fullName: string) {
  const extension = getExtension(fullName);
  const result = extension ? mimeTypes[extension] || 'text/plain' : 'text/plain';
  return result;
}

export function getExtension(fullName: string) {
  const extension = fullName.split('.').pop();
  return extension;
}

export function getFullNameWithoutExtension(fullName: string) {
  const extension = getExtension(fullName);
  const result = fullName.replace(`.${extension}`, '');
  return result;
}
