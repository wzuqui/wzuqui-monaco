export function salvarUrlEstado(
  html: string,
  scss: string,
  typescript: string
) {
  const json = JSON.stringify({ html, scss, typescript });
  const base64 = btoa(json);
  window.location.hash = '#' + base64;
}
