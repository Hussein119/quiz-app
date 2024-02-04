/* eslint-disable react/prop-types */
function FinishButton({ dispatch, answer, index, numQuestions }) {
  if (answer !== null && index === numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: 'finished' })
        }}
      >
        Finish
      </button>
    )
}

export default FinishButton
