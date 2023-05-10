export function NfcItem({ completed, id, title, toogleNfc, deleteNfc }){
    return(
        <li key={id}>
          <label>
            <input type="checkbox" 
            checked={completed} 
            onChange={e => toogleNfc(id, e.target.checked)}
            />
            {title}
          </label>
          <button 
          onClick={() => deleteNfc(id)} 
          className="btn btn-danger">DELETE</button>
        </li>
    )
}