import * as types from '../actions';
import { ingredientReducer } from './ingredients';

const initialIngredientState = {
  allIngredients: [],
  itemsRequest: false,
  itemsFailed: false,
  viewedIngredient: null,
  ingredientsConstructor: {
    bun: null,
    ingredient: [],
    counter: {},
  },
};

test('ingredientReducer', () => {
  let state;
  state = ingredientReducer(initialIngredientState, {
    type: types.GET_ITEMS_REQUEST,
  });
  expect(state).toEqual({
    ...initialIngredientState,
    itemsRequest: true,
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.GET_ITEMS_SUCCESS,
    items: [{}],
  });
  expect(state).toEqual({
    ...initialIngredientState,
    itemsFailed: false,
    allIngredients: [{}],
    itemsRequest: false,
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.GET_ITEMS_ERROR,
  });
  expect(state).toEqual({
    ...initialIngredientState,
    itemsFailed: true,
    itemsRequest: false,
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.GET_VIEWED_INGREDIENT,
    item: {},
  });
  expect(state).toEqual({
    ...initialIngredientState,
    viewedIngredient: {},
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.ADD_INGREDIENT_CONSTRUCTOR,
    item: {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      uniqueId: 0.6283965720469555,
    },
  });
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: {
        _id: '60d3b41abdacab0026a733c7',
        name: 'Флюоресцентная булка R2-D3',
        type: 'bun',
        proteins: 44,
        fat: 26,
        carbohydrates: 85,
        calories: 643,
        price: 988,
        image: 'https://code.s3.yandex.net/react/code/bun-01.png',
        image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
        image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
        __v: 0,
        uniqueId: 0.6283965720469555,
      },
      ingredient: [],
      counter: {},
    },
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.DEL_INGREDIENT_CONSTRUCTOR,
    item: {
      _id: '60d3b41abdacab0026a733c7',
      name: 'Флюоресцентная булка R2-D3',
      type: 'bun',
      proteins: 44,
      fat: 26,
      carbohydrates: 85,
      calories: 643,
      price: 988,
      image: 'https://code.s3.yandex.net/react/code/bun-01.png',
      image_mobile: 'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
      image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
      __v: 0,
      uniqueId: 0.6283965720469555,
    },
  });
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: null,
      ingredient: [],
      counter: {},
    },
  });
  state = ingredientReducer(initialIngredientState, {
    type: types.CLEAR_CONSTRUCTOR_INGREDIENTS,
  });
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: null,
      ingredient: [],
      counter: {},
    },
  });

  state = ingredientReducer(
    {
      ...initialIngredientState,
      ingredientsConstructor: {
        bun: null,
        ingredient: [
          {
            _id: '60d3b41abdacab0026a733cd',
          },
          {
            _id: '60d3b41abdacab0026a733cd',
          },
        ],
      },
    },
    {
      type: types.INCREASE_INGREDIENTS,
      id: '60d3b41abdacab0026a733cd',
      typeForCounter: 'sauce',
    }
  );
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: null,
      ingredient: [
        {
          _id: '60d3b41abdacab0026a733cd',
        },
        {
          _id: '60d3b41abdacab0026a733cd',
        },
      ],
      counter: { '60d3b41abdacab0026a733cd': 2 },
    },
  });

  state = ingredientReducer(
    {
      ...initialIngredientState,
      ingredientsConstructor: {
        ...initialIngredientState.ingredientsConstructor,
        counter: { '60d3b41abdacab0026a733cd': 10 },
      },
    },
    {
      type: types.REDUCE_INGREDIENTS,
      id: '60d3b41abdacab0026a733cd',
      typeForCounter: 'sauce',
    }
  );
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: null,
      ingredient: [],
      counter: { '60d3b41abdacab0026a733cd': 9 },
    },
  });

  state = ingredientReducer(
    {
      ...initialIngredientState,
      ingredientsConstructor: {
        ...initialIngredientState.ingredientsConstructor,
        ingredient: [
          {
            _id: '60d3b41abdacab0026a733c7',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
            uniqueId: 0.6283965720469556,
          },
          {
            _id: '60d3b41abdacab0026a733c7',
            name: 'Флюоресцентная булка R2-D3',
            type: 'bun',
            proteins: 44,
            fat: 26,
            carbohydrates: 85,
            calories: 643,
            price: 988,
            image: 'https://code.s3.yandex.net/react/code/bun-01.png',
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
            uniqueId: 0.6283965720469555,
          },
        ],
      },
    },
    {
      type: types.DRAG_CONSTRUCTOR_INGREDIENT,
      dragIndex: 1,
      hoverIndex: 0,
    }
  );
  expect(state).toEqual({
    ...initialIngredientState,
    ingredientsConstructor: {
      bun: null,
      ingredient: [
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          uniqueId: 0.6283965720469555,
        },
        {
          _id: '60d3b41abdacab0026a733c7',
          name: 'Флюоресцентная булка R2-D3',
          type: 'bun',
          proteins: 44,
          fat: 26,
          carbohydrates: 85,
          calories: 643,
          price: 988,
          image: 'https://code.s3.yandex.net/react/code/bun-01.png',
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          uniqueId: 0.6283965720469556,
        },
      ],
      counter: {},
    },
  });
});
