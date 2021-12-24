export type TWsActions = {
  wsInit: string;
  wsSendMessage: string;
  onOpen: string;
  onClose: string;
  onError: string;
  onMessage: string;
};

export type TOrder = {
  _id: string;
  ingredients: Array<string>;
  name: string;
  status: string;
  number: number;
  createdAt: string;
  updatedAt: string;
};

export type TWSData = {
  success: boolean;
  orders: TOrder[];
  total: number;
  totalToday: number;
};
