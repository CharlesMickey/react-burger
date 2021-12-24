import { RootState } from '../type';

export const wsSelectors = {
  wsData: (store: RootState) => store.ws.data,
  wsDataAuth: (store: RootState) => store.wsAuth.data,
};
