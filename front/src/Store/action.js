// export const addToCart = (pokemon) => {
//   return {
//     type: 'ADD_TO_CART',
//     payload: pokemon
//   };
// };


export const ADD_TO_CART = 'ADD_TO_CART';

export const addToCart = (pokemon) => {
  return {
    type: ADD_TO_CART,
    payload: pokemon
  };
};
