export type Message = {
  component: string;
  message: string;
};

export function createMessage(component: string, message: string): Message {
  return { component, message };
}

export function isMessage(message: unknown): message is Message {
  if (typeof message !== 'object') return false;

  if (message == null) {
    return false;
  }

  if ('message' in message && 'component' in message) {
    return true;
  }

  return false;
}
