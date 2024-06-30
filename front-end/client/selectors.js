import { createSelector } from 'reselect';

const selectBasket = state => state.basket.items;

export const selectBasketItemsById = createSelector(
    [selectBasket, (state, id) => id],
    (items, id) => items.filter(item => item.id === id)
);
