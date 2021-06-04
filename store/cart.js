export const state = () => {
  return {
    products: []
  }
};

export const mutations = {
  setProduct(state, { productId, count }) {
    let isDelete = false;
    if (count <= 0) {
      isDelete = true;
    }
    if (state.products.filter(product => product.id == productId).length) {
      let targetProduct = state.products.indexOf(state.products.filter(product => product.id == productId)[0]);
      if(isDelete) {
        state.products.splice(targetProduct, 1);
        return;
      }
      state.products[targetProduct].count = count;
    } else {
      if(isDelete) return;  
      state.products.push({ id: productId, count })
    }
  },
}