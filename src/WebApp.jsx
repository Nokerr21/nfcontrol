import "./styles.css"
import { useEffect, useState } from "react"
import { Html5QrcodeScanner } from "html5-qrcode"
import Navbar from "./Navbar"
import { Route, Routes } from "react-router-dom"
import User from "./pages/User"
import Worker from "./pages/Worker"
import Home from "./pages/Home"


export default function WebApp(){
  const [message, setMessage] = useState("")
  const [scanResult, setScanResult] = useState("")
  const [scanTime, setScanTime] = useState("")

  
 

  
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
                //consoleLog("Record type:  " + record.recordType);
                //consoleLog("MIME type:    " + record.mediaType);
                var today = new Date();
                var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
                var dateTime = date+' '+time;
                consoleLog("---- data ----\n" + decoder.decode(record.data) + "\n" + "TimeStamp: " + dateTime);
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
            var today = new Date();
            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds() + ":" + today.getMilliseconds();
            var dateTime = date+' '+time;
            consoleLogWrite("Message: '" + message + "' written!" + "\n" + "TimeStamp: " + dateTime);
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

      function consoleLogQR(data) {
        var logElement = document.getElementById('logQR');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

    
    
    return (
        <>
   
            <div>
                <Navbar/>
            </div>
            <div className="container">
                <Routes>
                    <Route path="/nfc-web-app/" element={<Home />} />
                    <Route path="/nfc-web-app/worker" element={<Worker />} />
                    <Route path="/nfc-web-app/user" element={<User />} />
                </Routes>
            </div>
           
       
          
      
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