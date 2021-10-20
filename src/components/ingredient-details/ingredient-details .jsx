import React, { memo } from 'react';
import { MESSAGE } from '../../utils/constants';
import { dataPropTypes } from '../../utils/constants';
import styleIngredientDetails from './ingredient-details.module.css';

function IngredientDetails({ card }) {
  return (
    card && (
      <section className={styleIngredientDetails.section}>
        <img
          src={card.image_large}
          alt={card.name}
          className={styleIngredientDetails.img}
        />
        <p className='mt-4 mb-8 text text_type_main-medium'>{card.name}</p>
        <ul className={styleIngredientDetails.ul}>
          <li>
            <h5 className='text text_type_main-default'>
              {MESSAGE.INGREDIENT_DETAILS.CALORIES}
            </h5>
            <p className='mt-2 text text_type_digits-default'>
              {card.calories}
            </p>
          </li>
          <li>
            <h5 className='text text_type_main-default'>
              {MESSAGE.INGREDIENT_DETAILS.PROTEINS}
            </h5>
            <p className='mt-2 text text_type_digits-default'>
              {card.proteins}
            </p>
          </li>
          <li>
            <h5 className='text text_type_main-default'>
              {MESSAGE.INGREDIENT_DETAILS.FAT}
            </h5>
            <p className='mt-2 text text_type_digits-default'>{card.fat}</p>
          </li>
          <li>
            <h5 className='text text_type_main-default'>
              {MESSAGE.INGREDIENT_DETAILS.CARBOHYDRATES}
            </h5>
            <p className='mt-2 text text_type_digits-default'>
              {card.carbohydrates}
            </p>
          </li>
        </ul>
      </section>
    )
  );
}

export default memo(IngredientDetails);

IngredientDetails.propTypes = {
  card: dataPropTypes,
};
