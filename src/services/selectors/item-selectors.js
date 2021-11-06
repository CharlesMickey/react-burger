export const ingredientSelectors = {
  ingredientsConstructor: (store) => store.ingredients.ingredientsConstructor,
  price: (store) =>
    store.ingredients.ingredientsConstructor.bun &&
    store.ingredients.ingredientsConstructor.bun.price * 2 +
      store.ingredients.ingredientsConstructor.ingredient.reduce(
        (previousValue, currentValue) => {
          return previousValue + currentValue.price;
        },
        0
      ),
  viewedIngredient: (store) => store.ingredients.viewedIngredient,
  allIngredients: (store) => store.ingredients.allIngredients,
  orderNumber: (store) => store.order.orderNumber,
};

export const modalSelectors = {
  orderModalOpen: (store) => store.order.orderModalOpen,
  ingredientModalOpen: (store) => store.ingredients.ingredientModalOpen,
};
