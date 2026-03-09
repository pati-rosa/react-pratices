import React from "react"

const GroceryList = ({ items, onMarkAsPurchased }) => {
  return (
    <ul data-testid="grocery-list" className="grocery-list w-50 ma-auto">
      {items.length > 0 &&
        items.map((item) => (
          <li
            key={item.name}
            className="grocery-item"
            data-testid="grocery-item"
          >
            <div>
              <span data-testid="grocery-name">
                {item.name} - {item.quantity}
              </span>

              {!item.purchased && (
                <div>
                  <button
                    data-testid="mark-purchased"
                    onClick={() => onMarkAsPurchased(item)}
                  >
                    Mark as Purchased
                  </button>
                </div>
              )}
            </div>
          </li>
        ))}
    </ul>
  )
}

export default GroceryList
