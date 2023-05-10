import "./styles.css"
import { useEffect, useState } from "react"

export default function WebApp(){

    function handleSubmit(e) {
        e.preventDefault()
    }

    async function readTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            await ndef.scan();
            ndef.onreading = event => {
              const decoder = new TextDecoder();
              for (const record of event.message.records) {
                consoleLog("Record type:  " + record.recordType);
                consoleLog("MIME type:    " + record.mediaType);
                consoleLog("=== data ===\n" + decoder.decode(record.data));
              }
            }
          } catch(error) {
            consoleLog(error);
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }
      
      async function writeTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            await ndef.write("What Web Can Do Today");
            consoleLog("NDEF message written!");
          } catch(error) {
            consoleLog(error);
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
    
    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre id="log"></pre>
                <TextBoxContent />
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
    
      
    
    
}