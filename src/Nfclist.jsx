import { NfcItem } from "./NfcItem"

export function NfcList({ nfcs, toogleNfc, deleteNfc }){
    return (
        <ul className="list">
        {nfcs.length === 0 && "NO NFCS"}
        {nfcs.map(nfc => {
          return (
            <NfcItem id = {nfc.id} completed={nfc.completed} title={nfc.title} key={nfc.id} toogleNfc={toogleNfc} deleteNfc={deleteNfc} />
          )
        })}
        </ul>
    )
}