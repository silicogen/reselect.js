import { createSelector } from "@reduxjs/toolkit";

const selectShopItems = (state) => state.shop.items;
const selectTaxPercent = (state) => state.shop.taxPercent;

const selectItemsByCategory = createSelector(
      // Usual first input - extract value from `state`
      state => state.shop.items,
      // Take the second arg, `category`, and forward to the output selector
      (state, category) => "fruit"
    ,
    // Output selector gets (`items, category)` as args
    (items, category) => items.filter(item => item.category === category)
  )

const selectSubtotal = createSelector(selectShopItems, (items) =>
    items.reduce((subtotal, item) => 
    subtotal + item.value, 0)
);

const selectCount = createSelector(selectShopItems, (items) => items.length);

const selectTax = createSelector(
    selectSubtotal, 
    selectTaxPercent,
    (subtotal, taxPercent) => subtotal * (taxPercent / 100)
);

const selectTotal = createSelector(
    selectSubtotal,
    selectTax,
    (subtotal, tax) => ({ total: subtotal + tax })
);

const exampleState = {
    shop: {
        taxPercent: 8,
        items: [
            { name: "apple", value: 1.2, category: "fruit" },
            { name: "orange", value: 0.95, category: "fruit" },
            { name: "potato", value: 0.5, category: "vegetable" },
        ],
    },
};

console.log(selectSubtotal(exampleState)); // 2.15
console.log(selectTax(exampleState)); // 0.172
console.log(selectTotal(exampleState)); // { total: 2.322 }
console.log(selectCount(exampleState)); // 3
console.log(selectItemsByCategory(exampleState)); // 3
