import React, { useState } from "react"

const GroceryForm = ({ onAddItem, errors }) => {
  const formInitialState = {
    name: "",
    quantity: 1,
  }

  const [formData, setFormData] = useState(formInitialState)

  const handleOnChange = (e) => {
    const { name, value } = e.currentTarget

    setFormData({
      ...formData,
      [name]: name === "quantity" ? Number(value) : value,
    })
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    onAddItem(formData)
    setFormData(formInitialState)
  }

  return (
    <form className="ma-20" onSubmit={handleOnSubmit}>
      {(errors.name || errors.quantity) && (
        <p data-testid="error-message" className="error">
          {errors.name}
          {errors.quantity}
        </p>
      )}

      <input
        data-testid="input-name"
        className="ma-5 pa-5"
        type="text"
        placeholder="Item Name"
        name="name"
        value={formData.name}
        onChange={handleOnChange}
      />

      <input
        data-testid="input-quantity"
        className="ma-5 pa-5"
        type="number"
        placeholder="Quantity"
        name="quantity"
        value={formData.quantity}
        onChange={handleOnChange}
      />

      <button data-testid="add-button" className="ma-5 pa-10" type="submit">
        Add Item
      </button>
    </form>
  )
}

export default GroceryForm
