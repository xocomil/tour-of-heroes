import { withImmutableState } from '@angular-architects/ngrx-toolkit';
import { computed } from '@angular/core';
import {
  PartialStateUpdater,
  patchState,
  signalStore,
  withComputed,
  withMethods,
} from '@ngrx/signals';
import { create } from 'mutative';
import { isMessage, Message } from '../models/message.model';

type MessageState = {
  messages: Message[];
};

const createDefaultState = (): MessageState => ({
  messages: [],
});

export const MessageStore = signalStore(
  withImmutableState(createDefaultState()),
  withComputed((state) => ({
    prettyMessages: computed(() => {
      return state
        .messages()
        .map((message) => `[${message.component}]: ${message.message}`);
    }),
  })),
  withMethods((state) => ({
    add(message: Message) {
      console.log('message added', message);

      patchState(state, updateMessages(state.messages(), message));
    },
    clear() {
      patchState(state, { messages: [] });
    },
  })),
);

function updateMessages(
  messages: Message[],
  message: Message,
): PartialStateUpdater<{ messages: Message[] }> {
  return (state) => {
    if (!isMessage(message)) {
      return { messages };
    }

    return create(state, (draft) => {
      draft.messages = draft.messages.concat(message);
    });
  };
}
