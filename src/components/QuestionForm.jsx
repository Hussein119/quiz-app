/* eslint-disable react/prop-types */
import { useState } from 'react'
import useLocalStorageState from './useLocalStorageState'

const initialQuestionState = {
  question: '',
  options: ['', '', '', ''],
  correctOption: 0,
  points: 10,
}

function QuestionForm({ dispatch }) {
  const [questionData, setQuestionData] = useState(initialQuestionState)
  const [value, setValue] = useLocalStorageState([], 'dataReceived')

  console.log([questionData])

  const onSubmit = (data) => {
    setValue([data])
  }
  const onFinish = () => {
    dispatch({ type: 'dataReceived' })
    dispatch({ type: 'start' })
  }

  const handleInputChange = (event) => {
    const { name, value } = event.target
    setQuestionData((prevData) => ({
      ...prevData,
      [name]: value,
    }))
  }

  const handleOptionChange = (event, index) => {
    const newOptions = [...questionData.options]
    newOptions[index] = event.target.value
    setQuestionData((prevData) => ({
      ...prevData,
      options: newOptions,
    }))
  }

  const handleCorrectOptionChange = (event) => {
    setQuestionData((prevData) => ({
      ...prevData,
      correctOption: parseInt(event.target.value, 10),
    }))
  }

  const handlePointsChange = (event) => {
    setQuestionData((prevData) => ({
      ...prevData,
      points: parseInt(event.target.value, 10),
    }))
  }

  const handleSubmit = (event) => {
    event.preventDefault()
    onSubmit(questionData)
    setQuestionData(initialQuestionState)
  }

  const handleFinish = () => {
    onFinish()
  }

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <label style={labelStyle}>Enter question:</label>
      <input
        type="text"
        name="question"
        value={questionData.question}
        onChange={handleInputChange}
        required
        style={inputStyle}
      />

      <label style={labelStyle}>Enter options:</label>
      {questionData.options.map((option, index) => (
        <div key={index}>
          <input
            type="text"
            value={option}
            onChange={(event) => handleOptionChange(event, index)}
            required
            style={inputStyle}
          />
        </div>
      ))}

      <label style={labelStyle}>Choose the correct option:</label>
      <select
        value={questionData.correctOption}
        onChange={handleCorrectOptionChange}
        style={selectStyle}
      >
        {questionData.options.map((option, index) => (
          <option key={index} value={index}>
            Option {index + 1}
          </option>
        ))}
      </select>

      <label style={labelStyle}>Enter question points:</label>
      <input
        type="number"
        name="points"
        value={questionData.points}
        onChange={handlePointsChange}
        required
        style={inputStyle}
      />

      <br />
      <br />

      <button type="submit" style={submitButtonStyle}>
        Add Question
      </button>

      <button type="button" onClick={handleFinish} style={finishButtonStyle}>
        Finish
      </button>
    </form>
  )
}

// Styles
const formStyle = {
  textAlign: 'center',
  margin: '20px',
}

const labelStyle = {
  display: 'block',
  marginBottom: '10px',
  fontSize: '18px',
}

const inputStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '400px',
  marginBottom: '10px',
}

const selectStyle = {
  padding: '10px',
  fontSize: '16px',
  border: '1px solid #ccc',
  borderRadius: '5px',
  width: '300px',
  marginBottom: '10px',
}

const submitButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  background: '#007BFF',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
}

const finishButtonStyle = {
  padding: '10px 20px',
  fontSize: '16px',
  background: '#28A745',
  color: '#fff',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
}
export default QuestionForm
