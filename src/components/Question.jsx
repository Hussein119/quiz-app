/* eslint-disable react/prop-types */
import Options from './Options'
function Question({ question, dispatch, answer }) {
  console.log(question)
  return (
    <div key={question.id}>
      <h4>{question.question}</h4>
      <Options question={question} dispatch={dispatch} answer={answer} />
    </div>
  )
}

export default Question
