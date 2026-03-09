import { useState } from "react"

const useProducts = () => {
  const [products, setProducts] = useState([])

  const handleAddProduct = ({ formData }) => {
    if (!formData.name || !formData.quantity || !formData.price) {
      alert("All fields are required.")
      return
    }

    if (Number(formData.quantity) <= 0) {
      alert("Quantity cannot be zero or negative.")
      return
    }

    const findProduct = products.find(
      (product) => product.name === formData.name,
    )

    if (findProduct) {
      alert("Product name must be unique.")
      return
    }

    setProducts((prev) => {
      return [
        ...prev,
        {
          ...formData,
          restock: formData.quantity < 5 ? true : false,
        },
      ]
    })
  }

  const handleDeleteProduct = (name) => {
    const newProducts = products.filter((product) => product.name !== name)

    setProducts(newProducts)
  }

  const handleRestockProduct = (name) => {
    const newProducts = products.map((product) => {
      if (product.name === name) {
        return {
          ...product,
          quantity: Number(product.quantity) + 5,
          restock: false,
        }
      } else {
        return product
      }
    })

    setProducts(newProducts)
  }

  return {
    products,
    handleAddProduct,
    handleDeleteProduct,
    handleRestockProduct,
  }
}

export default useProducts
