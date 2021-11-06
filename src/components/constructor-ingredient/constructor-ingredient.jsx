import {
  ConstructorElement,
  DragIcon,
} from '@ya.praktikum/react-developer-burger-ui-components';
import React, { useRef } from 'react';
import { useDrag, useDrop } from 'react-dnd';
import { useDispatch } from 'react-redux';
import {
  DEL_INGREDIENT_CONSTRUCTOR,
  REDUCE_INGREDIENTS,
} from '../../services/actions/actions-ingredients-type';
import styleConstructor from './constructor-ingredient.module.css';

const ConstructorIngredient = ({ ingredient, index, id, moveItem }) => {
  const dispatch = useDispatch();

  const ref = useRef(null);
  const [, drop] = useDrop({
    accept: 'ingredient-constructor',
    hover: (item, monitor) => {
      if (!ref.current) {
        return;
      }
      const dragIndex = item.index;
      const hoverIndex = index;
      if (dragIndex === hoverIndex) {
        return;
      }
      const hoverBoundingRect = ref.current?.getBoundingClientRect();
      const hoverMiddleY =
        (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
      const clientOffset = monitor.getClientOffset();
      const hoverClientY = clientOffset.y - hoverBoundingRect.top;
      if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
        return;
      }
      if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
        return;
      }
      moveItem(dragIndex, hoverIndex);
      item.index = hoverIndex;
    },
  });

  const [{ isDragging }, darg] = useDrag({
    type: 'ingredient-constructor',
    item: () => {
      return { id, index };
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  darg(drop(ref));

  const opacity = isDragging ? 0 : 1;

  return (
    <li ref={ref} style={{ opacity }} className={styleConstructor.listItem}>
      <div className={styleConstructor.dragIcon}>
        <DragIcon type='primary' />
      </div>
      <ConstructorElement
        text={ingredient.name}
        price={ingredient.price}
        thumbnail={ingredient.image}
        handleClose={() => {
          dispatch({
            type: DEL_INGREDIENT_CONSTRUCTOR,
            id: ingredient.uniqueId,
          });
          dispatch({
            type: REDUCE_INGREDIENTS,
            id: ingredient._id,
            typeForCounter: ingredient.type,
          });
        }}
      />
    </li>
  );
};

export default ConstructorIngredient;
