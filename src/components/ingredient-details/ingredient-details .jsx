import { memo } from 'react';
import PropTypes from 'prop-types';
import { MESSAGE } from '../../utils/constants';
import styleIngredientDetails from './ingredient-details.module.css';
import { useSelector } from 'react-redux';
import { ingredientSelectors } from '../../services/selectors';
import { useParams } from 'react-router';

function IngredientDetails({ title }) {
  const { id } = useParams();
  const card =
    useSelector(ingredientSelectors.viewedIngredient) ||
    JSON.parse(localStorage.getItem('ingredients')).find((i) => i._id === id);

  return (
    card && (
      <section className={styleIngredientDetails.section}>
        {title && (
          <h2
            className={`text text_type_main-large ${styleIngredientDetails.title}`}
          >
            {title}
          </h2>
        )}
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
  title: PropTypes.string,
};
