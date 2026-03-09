import { useCallback, useMemo, useState } from "react"

const useItems = () => {
  const errorsInitialState = {
    name: "",
    quantity: "",
  }
  const [items, setItems] = useState([])
  const [errors, setErrors] = useState(errorsInitialState)
  const [purchasedFlag, setPurchasedFlag] = useState(false)

  const itemsToShow = useMemo(() => {
    return items.filter((item) =>
      purchasedFlag ? item.purchased : !item.purchased,
    )
  }, [items, purchasedFlag])

  const handleOnAddItem = useCallback((formData) => {
    if (formData.quantity <= 0) {
      setErrors((prev) => {
        return {
          ...prev,
          quantity: "Quantity must be a positive number.",
        }
      })
      return
    }

    if (!formData.name) {
      setErrors((prev) => {
        return {
          ...prev,
          name: "Item name cannot be empty.",
        }
      })
      return
    }

    if (formData.name && formData.quantity >= 0) {
      setItems((prev) => [
        ...prev,
        {
          ...formData,
          purchased: false,
        },
      ])
      setErrors(errorsInitialState)
    }
  }, [])

  const handleOnMarkAsPurchased = useCallback((item) => {
    setItems((prev) =>
      prev.map((i) =>
        i.name === item.name
          ? {
              ...i,
              purchased: true,
            }
          : i,
      ),
    )
  }, [])

  return {
    itemsToShow,
    purchasedFlag,
    errors,
    setPurchasedFlag,
    handleOnAddItem,
    handleOnMarkAsPurchased,
  }
}

export default useItems
