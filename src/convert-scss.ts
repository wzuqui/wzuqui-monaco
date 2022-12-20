export function convertSCSS(
  text: string,
  callback: (element: HTMLStyleElement) => void
) {
  (window as any).Sass.compile(text, null, (result: { text: string }) => {
    const style = document.createElement('style');
    style.textContent = result.text;
    callback(style);
  });
}
