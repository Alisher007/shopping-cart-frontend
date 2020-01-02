import React from 'react';

const ProductDetails = ({ product, remove, add }) => {
  return (
    <div>
      <span className="TodoText">{product.pk}</span>
      <span className="TodoText">{product.name}</span>
      {/* <span className="TodoText">{product.quantity}</span> */}
          <button className="RemoveTodo" onClick={remove}>Remove</button>
          <button className="RemoveTodo" onClick={add}>Add</button>
    </div>
  );
}

export default ProductDetails;