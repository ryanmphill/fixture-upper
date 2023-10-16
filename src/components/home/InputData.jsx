import { useRef, useState } from "react"
import { convertToFixture } from "../../fetchers/convertToFixture"

export const InputData = ({ copyState, setCopyState, setJSONData, setDataLoading }) => {
    const userJSONinput = useRef(null)
    const userModelInput = useRef(null)
    const [errorMessages, setErrorMessages] = useState([])

    // Define placeholder example for input field
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

        // Reset copy state and error message state
        setCopyState({ ...copyState, copied: false })
        setErrorMessages([])

        setDataLoading(true)

        e.target.disabled = true

        const data = {
            model: userModelInput.current.value,
            JSON: JSONdata
        }

        try {
            const response = await convertToFixture(data)
            console.log(response)
            let formattedResponse = JSON.stringify(response, null, 2)
            setJSONData(formattedResponse)
            e.target.disabled = false
            setDataLoading(false)
        } catch (error) {
            console.error(error)
            window.alert("Something went wrong")
            e.target.disabled = false
            setDataLoading(false)
        }
    }
    return <>
        <div className="fixture_upper__container">
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
                        <div className="error_message">
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
                    {errorMessages.includes("JSONError") &&
                        <div className="error_message">
                            Please make sure your input is an array of valid JSON data ex: &#91; &#123; "property": "value" &#125; &#93;
                        </div>}
                </div>

                <button onClick={(e) => handleSubmit(e)}>Submit</button>
            </section>
        </div>
    </>
}