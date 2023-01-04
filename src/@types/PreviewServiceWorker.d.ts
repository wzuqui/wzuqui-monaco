/// <reference lib="webworker" />

declare module PreviewServiceWorker {
  interface MessageResponse {
    type: 'page-response';
    url: string;
    body: string;
    headers: Record<string, string>;
    status: number;
  }

  interface MessageRequest {
    type: 'page-request';
    url: string;
  }

  interface MessageReload {
    type: 'page-reload';
    url: string;
  }

  type Message = MessageResponse | MessageRequest | MessageReload;

  interface ExtendableMessageEvent extends ExtendableEvent {
    data: Message;
  }
}
