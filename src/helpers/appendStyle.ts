export function appendStyle(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  scss: string
) {
  try {
    convertSCSS(scss, (element: HTMLStyleElement) => {
      if (iframeRef.current) {
        if (iframeRef.current.contentWindow) {
          iframeRef.current.contentWindow.document.head.appendChild(element);
        }
      }
    });
  } catch (error) {
    console.log(error);
  }
}

function convertSCSS(
  text: string,
  callback: (element: HTMLStyleElement) => void
) {
  (window as any).Sass.compile(text, null, (result: { text: string }) => {
    const style = document.createElement('style');
    style.textContent = result.text;
    callback(style);
  });
}
