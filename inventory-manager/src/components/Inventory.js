import React, { useState } from "react"
import ProductList from "./ProductList"
import ProductForm from "./ProductForm"
import useProducts from "../hooks/useProducts"

const Inventory = () => {
  const {
    products,
    handleAddProduct,
    handleDeleteProduct,
    handleRestockProduct,
  } = useProducts()
  return (
    <div className="layout-column justify-content-center align-items-center">
      <h2>Inventory Management</h2>
      <ProductForm onAddProduct={handleAddProduct} />
      <ProductList
        products={products}
        onRemoveProduct={handleDeleteProduct}
        onRestockProduct={handleRestockProduct}
      />
    </div>
  )
}

export default Inventory
