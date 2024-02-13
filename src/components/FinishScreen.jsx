/* eslint-disable react/prop-types */
import RestartButton from './RestartButton'
import { useQuiz } from '../contexts/QuizContext'
function FinishScreen() {
  const { points, maxPoints, highScore, dispatch, index, numQuestions } =
    useQuiz()
  const percentage = (points / maxPoints) * 100
  let emoji
  if (percentage === 100) emoji = '🥇'
  if (percentage >= 80 && percentage < 100) emoji = '🥈'
  if (percentage >= 60 && percentage < 80) emoji = '🥳'
  if (percentage >= 50 && percentage < 60) emoji = '🙄'
  if (percentage > 0 && percentage < 50) emoji = '🙃'
  if (percentage === 0) emoji = '🤦'
  return (
    <>
      <p className="result">
        <span>{emoji}</span>
        You scored <strong>{points}</strong> out of {maxPoints} (
        {Math.ceil(percentage)}%)
      </p>
      <p className="highScore">HighScore: {highScore} points</p>

      <RestartButton
        dispatch={dispatch}
        index={index}
        numQuestions={numQuestions}
      />
    </>
  )
}

export default FinishScreen
