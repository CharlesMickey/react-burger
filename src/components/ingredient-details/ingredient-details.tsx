import { FC, memo } from 'react';
import { CONSTANTS } from '../../utils/constants';
import styleIngredientDetails from './ingredient-details.module.css';
import { useSelector } from '../../services/type/hooks';
import { ingredientSelectors } from '../../services/selectors';
import { useParams } from 'react-router';
import { TIngredientDetails } from './type';
import { ITypeIngredient } from '../../utils/type-constants';
import Preloader from '../Preloader/Preloader';

const IngredientDetails: FC<TIngredientDetails> = ({ title }) => {
  const { id } = useParams<{ id: string }>();
  const card: ITypeIngredient = useSelector(
    ingredientSelectors.allIngredients
  ).find((i: ITypeIngredient) => i._id === id) as ITypeIngredient;

  console.log(card);

  return card ? (
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
            {CONSTANTS.INGREDIENT_DETAILS.CALORIES}
          </h5>
          <p className='mt-2 text text_type_digits-default'>{card.calories}</p>
        </li>
        <li>
          <h5 className='text text_type_main-default'>
            {CONSTANTS.INGREDIENT_DETAILS.PROTEINS}
          </h5>
          <p className='mt-2 text text_type_digits-default'>{card.proteins}</p>
        </li>
        <li>
          <h5 className='text text_type_main-default'>
            {CONSTANTS.INGREDIENT_DETAILS.FAT}
          </h5>
          <p className='mt-2 text text_type_digits-default'>{card.fat}</p>
        </li>
        <li>
          <h5 className='text text_type_main-default'>
            {CONSTANTS.INGREDIENT_DETAILS.CARBOHYDRATES}
          </h5>
          <p className='mt-2 text text_type_digits-default'>
            {card.carbohydrates}
          </p>
        </li>
      </ul>
    </section>
  ) : (
    <Preloader />
  );
};

export default memo(IngredientDetails);
