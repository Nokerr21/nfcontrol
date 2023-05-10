import { useEffect, useState } from "react"
import "./styles.css"
import { NewNfcForm } from "./NewNfcForm"
import { NfcList } from "./Nfclist"

export default function App() {
  
  const [nfcs, setNfc] = useState(() => {
    const localValue = localStorage.getItem("ITEMS")  // to read data from local storage
    if (localValue == null ) return []
    return JSON.parse(localValue)
  })

  useEffect(() => {  // to store data in local storage
    localStorage.setItem("ITEMS", JSON.stringify(nfcs))
  }, [nfcs])

  function toogleNfc(id, completed){
    setNfc(currentNfcs => {
      return currentNfcs.map(nfc => {
        if(nfc.id === id){
          return {...nfc, completed}
        }
        return nfc
      })
    })
  }

  function deleteNfc(id){
    setNfc(currentNfcs => {
      return currentNfcs.filter(nfc => nfc.id !== id)
    })
  }

  function addNfc(title){
    setNfc((currentNfcs) => {
          return [...currentNfcs, {id: crypto.randomUUID(), title, completed: false},]
        })
  }

  return (
    <>
      <NewNfcForm onSubmit={addNfc}/>
      <h1 className = "header">NFC read</h1>
      <NfcList nfcs={nfcs} toogleNfc={toogleNfc} deleteNfc={deleteNfc} />
    </>
    
  )
  
}