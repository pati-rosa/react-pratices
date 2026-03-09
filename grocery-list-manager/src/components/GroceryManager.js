import React from "react"
import GroceryForm from "./GroceryForm"
import GroceryList from "./GroceryList"
import useItems from "../hooks/useItems"

const GroceryManager = () => {
  const {
    itemsToShow,
    purchasedFlag,
    errors,
    setPurchasedFlag,
    handleOnAddItem,
    handleOnMarkAsPurchased,
  } = useItems()

  return (
    <div>
      <GroceryForm onAddItem={handleOnAddItem} errors={errors} />

      <div className="filter-buttons">
        <button
          data-testid="filter-purchased"
          onClick={() => setPurchasedFlag(true)}
        >
          Purchased
        </button>
        <button
          data-testid="filter-unpurchased"
          onClick={() => setPurchasedFlag(false)}
        >
          Unpurchased
        </button>
      </div>

      {!purchasedFlag ? (
        <h2 data-testid="list-heading">Unpurchased Items</h2>
      ) : (
        <h2 data-testid="list-heading">Purchased Items</h2>
      )}

      <GroceryList
        items={itemsToShow}
        onMarkAsPurchased={handleOnMarkAsPurchased}
      />
    </div>
  )
}

export default GroceryManager
