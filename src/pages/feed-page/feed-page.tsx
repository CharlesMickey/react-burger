import React, { memo } from 'react';
import OrderIngredients from '../../components/order-ingredients/order-ingredients';
import styleFeed from './feed-page.module.css';


function FeedPage() {
  return (
    <main className={styleFeed.main}>
        <OrderIngredients />
    </main>
  );
}

export default memo(FeedPage);
