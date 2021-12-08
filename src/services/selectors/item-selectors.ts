import { ITypeIngredient } from '../../utils/type-constants';

export const ingredientSelectors = {
  ingredientsConstructor: (store: any) =>
    store.ingredients.ingredientsConstructor,
  price: (store: any) =>
    store.ingredients.ingredientsConstructor.bun &&
    store.ingredients.ingredientsConstructor.bun.price * 2 +
      store.ingredients.ingredientsConstructor.ingredient.reduce(
        (previousValue: number, currentValue: ITypeIngredient): number => {
          return previousValue + currentValue.price;
        },
        0
      ),
  viewedIngredient: (store: any) => store.ingredients.viewedIngredient,
  allIngredients: (store: any) => store.ingredients.allIngredients,
  orderNumber: (store: any) => store.order.orderNumber,
};

export const modalSelectors = {
  orderModalOpen: (store: any) => store.order.orderModalOpen,
};
