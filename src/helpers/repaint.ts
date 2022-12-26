import { appendStyle } from './appendStyle';
import { appendTypeScript } from './appendTypeScript';

export function repaint(
  iframeRef: React.RefObject<HTMLIFrameElement>,
  html: string,
  scss: string,
  typescript: string
) {
  if (iframeRef) {
    if (iframeRef.current) {
      if (iframeRef.current.contentWindow) {
        if (iframeRef.current) {
          if (iframeRef.current.contentWindow) {
            iframeRef.current.contentWindow.document.open();
            iframeRef.current.contentWindow.document.write(html);
            iframeRef.current.contentWindow.document.write(eruda);
            iframeRef.current.contentWindow.document.close();
            appendStyle(iframeRef, scss);
            appendTypeScript(iframeRef, typescript);
          }
        }
      }
    }
  }
}

const eruda = `
<script src="//cdn.jsdelivr.net/npm/eruda"></script>
<script>
  eruda.init();
  eruda.position({x: '95%', y: '55%'});
  eruda.show();
</script>`.trim();
