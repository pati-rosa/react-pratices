import React, {useState} from 'react'
import medical_records from '../medicalRecords'
const useMedicalRecords = () => {
  const [records, setRecords] = useState()

  const handleSetRecords = (userId) => {
    if(userId) {
      const newRecords = medical_records.find((record) => record.id === userId)
      setRecords(newRecords)
    } else {
      alert("Please select a patient name")
    }
  }

   const handleSetNextRecords = () => {
    const userId = Number(records.id) > medical_records.length -1 ? 1 : Number(records.id) + 1

    const newRecords = medical_records.find((item) => Number(item.id) === userId)
    setRecords(newRecords)
  }

  return {records, handleSetRecords,handleSetNextRecords}
}

export default useMedicalRecords