/* eslint-disable react/prop-types */
/* eslint-disable react/no-unescaped-entities */
import { useQuiz } from '../contexts/QuizContext'

function StartScreen() {
  const { numQuestions, dispatch } = useQuiz()
  return (
    <div className="start">
      <h2>Welcome to the React quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: 'start' })
        }}
      >
        Let's start
      </button>
    </div>
  )
}

export default StartScreen
