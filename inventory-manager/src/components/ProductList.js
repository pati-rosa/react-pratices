import React from "react"

const ProductList = ({ products, onRemoveProduct, onRestockProduct }) => {
  return (
    <div className="layout-column justify-content-center align-items-center">
      <h3>Product List</h3>
      {products.length === 0 && <p>No products available.</p>}

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Restock</th>
            <th>Actions</th>
          </tr>
        </thead>
        {products.length > 0 && (
          <tbody data-testid="product-list">
            {products.map((product) => {
              console.log(product)
              return (
                <tr key={product.name} data-testid="product-row">
                  <td data-testid="product-name">{product.name}</td>
                  <td data-testid="product-quantity">{product.quantity}</td>
                  <td data-testid="product-price">{`$${Number(product.price).toFixed(2)}`}</td>
                  <td data-testid="product-restock">
                    {product.restock ? "Yes" : "No"}
                  </td>
                  <td>
                    <button
                      data-testid="delete-product"
                      onClick={() => onRemoveProduct(product.name)}
                    >
                      Delete
                    </button>
                    {product.restock && (
                      <button
                        data-testid="restock-product"
                        onClick={() => onRestockProduct(product.name)}
                      >
                        Restock
                      </button>
                    )}
                  </td>
                </tr>
              )
            })}
          </tbody>
        )}
      </table>
    </div>
  )
}

export default ProductList
