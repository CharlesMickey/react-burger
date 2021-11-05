export const ingredientSelectors = {
  ingredientsConstructor: (store) => store.ingredients.ingredientsConstructor,
  viewedIngredient: (store) => store.ingredients.viewedIngredient,
  allIngredients: (store) => store.ingredients.allIngredients,
  orderNumber: (store) => store.order.orderNumber,
};

export const modalSelectors = {
  orderModalOpen: (store) => store.order.orderModalOpen,
  ingredientModalOpen: (store) => store.ingredients.ingredientModalOpen,

};
