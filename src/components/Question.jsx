/* eslint-disable react/prop-types */
import Options from './Options'
import { useQuiz } from '../contexts/QuizContext'

function Question() {
  const { questions, index, dispatch, answer } = useQuiz()
  const question = questions[index]
  return (
    <div key={question.id}>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question
