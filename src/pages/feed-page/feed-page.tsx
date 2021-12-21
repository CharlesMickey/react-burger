import React, { memo } from 'react';
import OrderIngredients from '../../components/order-ingredients/order-ingredients';
import OrdersBoard from '../../components/orders-board/orders-board';
import styleFeed from './feed-page.module.css';

function FeedPage() {
  return (
    <main className={styleFeed.main}>
      <OrderIngredients />
      <OrdersBoard />
    </main>
  );
}

export default memo(FeedPage);
