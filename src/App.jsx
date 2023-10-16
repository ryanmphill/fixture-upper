import { useState } from 'react'
import { Grid } from 'react-loading-icons'
import './App.css'
import { ConvertedData } from './components/home/ConvertedData';
import { InputData } from './components/home/InputData';

function App() {
  const [copyState, setCopyState] = useState({
    value: '',
    copied: false,
  })
  const [JSONData, setJSONData] = useState("")
  const [dataLoading, setDataLoading] = useState(false)

  return (
    <>
      <header className="fixture_upper__header">
        <h1 id="title">Fixture Upper</h1>
        <h3 id="subtitle">Convert your JSON data to Django fixtures in seconds!</h3>
      </header>
      <InputData
        copyState={copyState}
        setCopyState={setCopyState}
        setJSONData={setJSONData}
        setDataLoading={setDataLoading} />
      {
        dataLoading &&
        <div id="loadingIcon">
          <Grid stroke={'#7373e875'} fill={'#7373e875'} speed={1.5}/>
        </div>
      }
      {
        JSONData.length > 0 && 
        <ConvertedData
          JSONData={JSONData}
          copyState={copyState}
          setCopyState={setCopyState} />
      }
    </>
  )
}

export default App
