export type TConstructorIngredientProps<T> = {
  ingredient: T;
  id: string;
  index: number;
  moveItem: (dragIndex: number, hoverIndex: number) => void;
};
export type TConstructorIndex = {
  id: string;
  index: number;
};
