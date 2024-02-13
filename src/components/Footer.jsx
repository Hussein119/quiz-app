/* eslint-disable react/prop-types */
import NextButton from './NextButton'
import FinishButton from './FinishButton'
import Timer from './Timer'
import { useQuiz } from '../contexts/QuizContext'

function Footer() {
  const { dispatch, answer, index, numQuestions, secondsRemaining } = useQuiz()
  return (
    <footer>
      <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
      <NextButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
      <FinishButton
        dispatch={dispatch}
        answer={answer}
        index={index}
        numQuestions={numQuestions}
      />
    </footer>
  )
}

export default Footer
