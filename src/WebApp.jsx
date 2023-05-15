import "./styles.css"
import { useEffect, useState } from "react"

export default function WebApp(){
  const [message, setMessage] = useState("")

  const abortController = new AbortController();
  

    async function stopRead(){
      abortController.signal.onabort = e => {};
      document.getElementById('btnStop').onclick = e => {
      abortController.abort();
      };
    }

    function handleSubmit(e) {
        e.preventDefault()
    }

    async function readTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            await ndef.scan({signal: abortController.signal});
            ndef.onreading = event => {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                //consoleLog("Record type:  " + record.recordType);
                //consoleLog("MIME type:    " + record.mediaType);
                consoleLog("---- data ----\n" + decoder.decode(record.data));
              }
            }
          } catch(error) {
            consoleLog(error);
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }
      
      async function writeTag(message) {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            await ndef.write(message);
            consoleLogWrite("Message: '" + message + "' written!");
            setMessage("")
          } catch(error) {
            consoleLogWrite(error);
            setMessage("")
          }
        } else {
          consoleLogWrite("Web NFC is not supported.");
        }
      }
      
      function consoleLog(data) {
        var logElement = document.getElementById('log');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

      function consoleLogWrite(data) {
        var logElement = document.getElementById('logWrite');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

    
    
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <button onClick={() => stopRead()} id="btnStop" className="btn">STOP</button>
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
                <pre id="logWrite"></pre>
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