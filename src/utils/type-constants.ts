export interface ITypeIngredient {
  calories: number;
  carbohydrates: number;
  fat: number;
  image: string;
  image_large: string;
  image_mobile: string;
  name: string;
  price: number;
  proteins: number;
  type: string;
  __v: number;
  _id: string;
  count?: number;
}

export type TIngredientWithUniqueId = ITypeIngredient & {
  uniqueId: string;
};

export type TUserDataApi = {
  name: string;
  email: string;
  password: string;
};

export type TLoginDataApi = {
  email: string;
  password: string;
};

export type TNewPasswordApi = {
  password: string;
  token: string;
};

export type TResetPasswordDataApi = string;
export type TFuncVoid = () => void;
