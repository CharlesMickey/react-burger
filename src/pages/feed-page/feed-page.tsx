import React, { memo, useEffect } from 'react';
import OrderIngredients from '../../components/order-ingredients/order-ingredients';
import OrdersBoard from '../../components/orders-board/orders-board';
import styleFeed from './feed-page.module.css';
import {
  WS_CONNECTION_CLOSED,
  WS_CONNECTION_START,
} from '../../services/actions';
import { wsSelectors } from '../../services/selectors/wc-selectors';
import { useDispatch, useSelector } from '../../services/type/hooks';

function FeedPage() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return () => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    };
  }, [dispatch]);

  const wsData = useSelector(wsSelectors.wsData);

  // console.log(
  //   (new Date(wsData.orders[0]?.createdAt).getTimezoneOffset() * -1) / 60
  // );

  return (
    <main className={styleFeed.main}>
      <OrderIngredients orders={wsData.orders} />
      <OrdersBoard data={wsData} />
    </main>
  );
}

export default memo(FeedPage);
