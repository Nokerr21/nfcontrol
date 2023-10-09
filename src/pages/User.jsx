import { useEffect, useState } from "react"
import "./styles.css"

export default function User(){

    function handleSubmit(e) {
        e.preventDefault()
    }


    async function readTag() {
        if ("NDEFReader" in window) {
          const ndef = new NDEFReader();
          try {
            return new Promise((resolve, reject) => {
              const ctlr = new AbortController();
              ctlr.signal.onabort = reject;
              ndef.addEventListener("reading", event => {
                ctlr.abort();
                resolve(event);
              }, { once: true });
              ndef.scan({ signal: ctlr.signal }).catch(err => reject(err));
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
            });
        
          } catch(error) {
            consoleLog(error);
          }
        } else {
          consoleLog("Web NFC is not supported.");
        }
      }
      
      function consoleLog(data) {
        var logElement = document.getElementById('logUser');
        logElement.innerHTML = ""
        logElement.innerHTML += data + '\n';
      }

    return (
        <>
        <form onSubmit={handleSubmit} className="new-item-form">
            <div className="form-row">
                <label>READ NFC</label>
                <button onClick={() => readTag()} className="btn">READ</button>
                <pre id="logUser"></pre>
            </div>
        </form>
        </>
    )  
}