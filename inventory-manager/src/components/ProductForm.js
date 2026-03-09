import React, { useState } from "react"

const ProductForm = ({ onAddProduct }) => {
  const [formData, setFormData] = useState({
    name: "",
    quantity: "",
    price: "",
  })

  const handleOnChangeFormData = (e) => {
    const { name, value } = e.currentTarget
    setFormData((prev) => {
      return {
        ...prev,
        [name]: value,
      }
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()
    onAddProduct({ formData })
  }
  return (
    <form data-testid="product-form" onSubmit={handleOnSubmit}>
      <input
        className="mr-10"
        data-testid="product-name-input"
        type="text"
        placeholder="Product Name"
        name="name"
        value={formData.name}
        onChange={handleOnChangeFormData}
      />
      <input
        className="mr-10"
        data-testid="product-quantity-input"
        type="text"
        placeholder="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleOnChangeFormData}
      />
      <input
        data-testid="product-price-input"
        type="text"
        step="0.01"
        placeholder="Price"
        name="price"
        value={formData.price}
        onChange={handleOnChangeFormData}
      />
      <button data-testid="add-product-button" type="submit">
        Add Product
      </button>
    </form>
  )
}

export default ProductForm
