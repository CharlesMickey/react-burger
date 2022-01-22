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

describe('ingredientReducer', () => {
  it('should return the initial state', () => {
    expect(ingredientReducer(undefined, {})).toEqual(initialIngredientState);
  });

  it('should handle GET_ITEMS_REQUEST', () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: types.GET_ITEMS_REQUEST,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsRequest: true,
      })
    );
  });

  it('should handle GET_ITEMS_SUCCESS', () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: types.GET_ITEMS_SUCCESS,
        items: [{}],
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsFailed: false,
        allIngredients: [{}],
        itemsRequest: false,
      })
    );
  });

  it('should handle GET_ITEMS_ERROR', () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: types.GET_ITEMS_ERROR,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        itemsFailed: true,
        itemsRequest: false,
      })
    );
  });

  it('should handle GET_VIEWED_INGREDIENT', () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: types.GET_VIEWED_INGREDIENT,
        item: {},
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        viewedIngredient: {},
      })
    );
  });

  it('should handle ADD_INGREDIENT_CONSTRUCTOR', () => {
    expect(
      ingredientReducer(initialIngredientState, {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          uniqueId: 0.6283965720469555,
        },
      })
    ).toEqual(
      expect.objectContaining({
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
            image_mobile:
              'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
            image_large:
              'https://code.s3.yandex.net/react/code/bun-01-large.png',
            __v: 0,
            uniqueId: 0.6283965720469555,
          },
          ingredient: [],
          counter: {},
        },
      })
    );
  });

  it('should handle DEL_INGREDIENT_CONSTRUCTOR', () => {
    expect(
      ingredientReducer(initialIngredientState, {
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
          image_mobile:
            'https://code.s3.yandex.net/react/code/bun-01-mobile.png',
          image_large: 'https://code.s3.yandex.net/react/code/bun-01-large.png',
          __v: 0,
          uniqueId: 0.6283965720469555,
        },
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        ingredientsConstructor: {
          bun: null,
          ingredient: [],
          counter: {},
        },
      })
    );
  });

  it('should handle CLEAR_CONSTRUCTOR_INGREDIENTS', () => {
    expect(
      ingredientReducer(initialIngredientState, {
        type: types.CLEAR_CONSTRUCTOR_INGREDIENTS,
      })
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        ingredientsConstructor: {
          bun: null,
          ingredient: [],
          counter: {},
        },
      })
    );
  });

  it('should handle INCREASE_INGREDIENTS', () => {
    expect(
      ingredientReducer(
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
      )
    ).toEqual(
      expect.objectContaining({
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
      })
    );
  });

  it('should handle REDUCE_INGREDIENTS', () => {
    expect(
      ingredientReducer(
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
      )
    ).toEqual(
      expect.objectContaining({
        ...initialIngredientState,
        ingredientsConstructor: {
          bun: null,
          ingredient: [],
          counter: { '60d3b41abdacab0026a733cd': 9 },
        },
      })
    );
  });

  it('should handle DRAG_CONSTRUCTOR_INGREDIENT', () => {
    expect(
      ingredientReducer(
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
      )
    ).toEqual(
      expect.objectContaining({
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
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
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
              image_large:
                'https://code.s3.yandex.net/react/code/bun-01-large.png',
              __v: 0,
              uniqueId: 0.6283965720469556,
            },
          ],
          counter: {},
        },
      })
    );
  });
});
