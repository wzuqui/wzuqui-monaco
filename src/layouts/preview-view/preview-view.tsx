import { useEffect, useRef } from 'react';

import { helpers } from '../../features/workspace/helpers';
import { defaultRoot } from '../../features/workspace/initialState';
import { ITreeNode } from '../../interfaces/tree-node';
import { startRootListening, store } from '../../store';
import { getMimeType, mimeTypes } from '../../utils/getMimeType';
import { transpileModule } from '../../utils/transpileModule';
import { Container, Content, Header, Iframe } from './preview-view.styles';

export function PreviewView() {
  const BASE_URL = `${location.href}preview-service-worker.io`;
  const src = `${BASE_URL}/index.html`;
  const ref = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const serviceWorker = window.navigator.serviceWorker;
    if (serviceWorker) {
      async function handleMessage(event: MessageEvent<PreviewServiceWorker.Message>) {
        const controller = serviceWorker.controller;

        if (!controller) return;
        if (!(event.data.type === 'page-request')) return;

        const { url } = event.data;

        const response = await previewResponse(url, BASE_URL);
        controller.postMessage(response);
      }
      serviceWorker.addEventListener('message', handleMessage);
      return () => serviceWorker.removeEventListener('message', handleMessage);
    }
  }, []);

  useEffect(() => {
    const listener = startRootListening({
      type: 'setTreeNodeContent',
      effect: _ => {
        ref.current?.contentWindow?.location.reload();
      },
    });
    return () => listener();
  }, [ref]);

  return (
    <Container className="preview-view">
      <Header>
        <a
          href={src}
          target="_blank"
          rel="noreferrer"
        >
          {' '}
          Open in new tab{' '}
        </a>
      </Header>
      <Content>
        <Iframe
          ref={ref}
          src={src}
        />
      </Content>
    </Container>
  );
}

async function previewResponse(url: string, BASE_URL: string) {
  let response: PreviewServiceWorker.MessageResponse = {
    type: 'page-response',
    url: url,
    body: 'page not found (front-end)',
    headers: { 'Content-Type': 'text/html' },
    status: 404,
  };

  const node = getTreeNode(url, BASE_URL);
  if (node) {
    const mimeType = getMimeType(node.full_name);
    const output = getContent(node, mimeType);
    response = {
      type: 'page-response',
      url: url,
      body: output,
      headers: { 'Content-Type': mimeType },
      status: 200,
    };
  }

  return response;
}

function getTreeNode(url: string, BASE_URL: string) {
  const fullName = url.replace(BASE_URL + '/', defaultRoot);
  const node = helpers.findNodeRecursiveWithoutExtension(
    store.getState().workspace.treeNode,
    fullName
  );
  return node;
}

function getContent(node: ITreeNode, mimeType: string) {
  if (mimeType === 'text/html') {
    return node.content;
  }
  if (mimeType === mimeTypes.ts) {
    return transpileModule(node.content);
  }
  return node.content;
}
