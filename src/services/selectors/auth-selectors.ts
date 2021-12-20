import { RootState } from "../type";

export const userSelectors = {
  authData: (store: RootState) => store.auth,
};
