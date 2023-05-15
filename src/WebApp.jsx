import "./styles.css"
import { useEffect, useState } from "react"

export default function WebApp(){
  const [message, setMessage] = useState("")

    function handleSubmit(e) {
        e.preventDefault()
        setMessage("")
    }

    async function readTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          const abortController = new AbortController();
          try {
            await ndef.scan();
            ndef.onreading = event => {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                //consoleLog("Record type:  " + record.recordType);
                //consoleLog("MIME type:    " + record.mediaType);
                consoleLog("---- data ----\n" + decoder.decode(record.data));
                abortController.abort();
              }
            }
          } catch(error) {
            consoleLog(error);
            abortController.abort();
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }
      
      async function writeTag(message) {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          const abortController = new AbortController();
          try {
            await ndef.write(message);
            consoleLog("NDEF message written!");
            abortController.abort();
          } catch(error) {
            consoleLog(error);
            abortController.abort();
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }
      
      function consoleLog(data) {
        var logElement = document.getElementById('log');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre id="log"></pre>
            </div>
            <div className="form-row">
                <label>WRITE TO NFC</label>
                <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                type="text"
                id="message"
                />
                <button onClick={() => writeTag(message)} className="btn">WRITE</button>
                <pre id="log"></pre>
            </div>
        </form>
        </>
    )

    const [nfcs, setNfc] = useState(() => {
        const localValue = localStorage.getItem("ITEMS")  // to read data from local storage
        if (localValue == null ) return []
        return JSON.parse(localValue)
      })
    
      useEffect(() => {  // to store data in local storage
        localStorage.setItem("ITEMS", JSON.stringify(nfcs))
      }, [nfcs])
    

      function TextBoxContent() {
        // JSON obj from https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Objects/JSON#arrays_as_json
        const exampleJSON = [
          {
            name: "Molecule Man",
            age: 29,
            secretIdentity: "Dan Jukes",
            powers: ["Radiation resistance", "Turning tiny", "Radiation blast"]
          },
          {
            name: "Madame Uppercut",
            age: 39,
            secretIdentity: "Jane Wilson",
            powers: [
              "Million tonne punch",
              "Damage resistance",
              "Superhuman reflexes"
            ]
          }
        ];
      
        const parseJsonIntoConsoleStr = (item, index) => {
          return (
            <p key={index}>
              {item.name}'s true identity is {item.secretIdentity}
            </p>
          );
        };
      
        return exampleJSON.map(parseJsonIntoConsoleStr);
      }
      
    
    
}