import { useRef, useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { darcula } from 'react-syntax-highlighter/dist/esm/styles/prism';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import './App.css'
import { convertToFixture } from './fetchers/convertToFixture';

function App() {
  const userJSONinput = useRef(null)
  const userModelInput = useRef(null)
  const [copyState, setCopyState] = useState({
    value: '',
    copied: false,
  })
  const [errorMessages, setErrorMessages] = useState([])
  const [JSONData, setJSONData] = useState("")

  const exampleData = `[
    {
      "id": 1,
      "property": "example1"
    },
    {
      "id": 2,
      "property": "example2"
    },
    {
      "id": 3,
      "property": "example3"
    }
]
  `

  const handleSubmit = async (e) => {
    e.preventDefault
    const errors = []
    let JSONdata = null

    try {
      JSONdata = JSON.parse(userJSONinput.current.value)
    } catch (error) {
      errors.push("JSONError")
    }

    if (userModelInput.current.value.length === 0) {
      errors.push("modelError")
    }

    if (errors.length > 0) {
      setErrorMessages(errors)
      return;
    }

    const data = {
      model: userModelInput.current.value,
      JSON: JSONdata
    }

    try {
      const response = await convertToFixture(data)
      console.log(response)
      let formattedResponse = JSON.stringify(response, null, 2)
      setJSONData(formattedResponse)
    } catch (error) {
      console.error(error)
    }
      
    

    // console.log(typeof JSON.parse(userJSONinput.current.value))
    // console.log(userModelInput.current.value)
  }

  return (
    <>
      <header>
        <h1>Fixture Upper</h1>
        <h3>Convert your raw JSON data to Django fixtures in seconds!</h3>
      </header>
      <section className="fixture_upper__formSection">
        <div className="fixture_upper__formField">
          <label htmlFor="userModelInput">Name of Model</label>
          <input 
          className="fixture_upper--input"
          id="userModelInput"
          placeholder="Name of Model"
          ref={userModelInput}
          />
          {errorMessages.includes("modelError") && 
          <div style={{color: 'red'}}>
            Please input the name of your Django model
          </div>}
        </div>
        <div className="fixture_upper__formField">
          <label htmlFor="userJSONInput">Paste Your JSON Data Here</label>
          <textarea
          className="fixture_upper--input"
          id="userJSONInput"
          placeholder={exampleData}
          ref={userJSONinput}
          >
          </textarea>
        </div>
        
        {errorMessages.includes("JSONError") && 
        <div style={{color: 'red'}}>
          Please make sure your input is valid JSON ex: &#123; "property": "value" &#125;
        </div>}
        
        <button onClick={(e) => handleSubmit(e)}>Submit</button>
      </section>
      <section className="fixture_upper__codeSection">
        {
          JSONData.length > 0 && <>
            <CopyToClipboard text={JSONData}
              onCopy={() => setCopyState({ ...copyState, copied: true })}>
              <button>Copy to clipboard 📋</button>
            </CopyToClipboard>
            {copyState?.copied ? <div style={{ color: 'red' }}>Copied.</div> : <></>}
            <SyntaxHighlighter language="javascript" style={darcula} id="codeBlock">
              {JSONData}
            </SyntaxHighlighter>
          </>
        }
      </section>
    </>
  )
}

export default App
