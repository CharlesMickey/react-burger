import { ITypeIngredient } from '../../utils/type-constants';
import { RootState } from '../type';

export const ingredientSelectors = {
  ingredientsConstructor: (store: RootState) =>
    store.ingredients.ingredientsConstructor,
  price: (store: RootState) =>
    store.ingredients.ingredientsConstructor.bun &&
    store.ingredients.ingredientsConstructor.bun.price * 2 +
      store.ingredients.ingredientsConstructor.ingredient.reduce(
        (previousValue: number, currentValue: ITypeIngredient): number => {
          return previousValue + currentValue.price;
        },
        0
      ),
  viewedIngredient: (store: RootState) => store.ingredients.viewedIngredient,
  allIngredients: (store: RootState) => store.ingredients.allIngredients,
  orderNumber: (store: RootState) => store.order.orderNumber,
};

export const modalSelectors = {
  orderModalOpen: (store: RootState) => store.order.orderModalOpen,
};
