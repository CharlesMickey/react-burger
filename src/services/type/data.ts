export type TOrderData = {
  name: string;
  order: { number: number };
  success: boolean;
};

export type TIngredientsCounter = {
  [index: string]: number;
};

type TUserInfo = {
  [key: string]: string;
};

export type TUserData = {
  success: boolean;
  user: TUserInfo;
};

export type TUserDataWithToken = TUserData & {
  accessToken: string;
  refreshToken: string;
};
