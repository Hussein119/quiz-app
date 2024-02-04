/* eslint-disable react/prop-types */
function NextButton({ dispatch, answer, index, numQuestions }) {
  if (answer !== null && index < numQuestions - 1)
    return (
      <button
        className="btn btn-ui"
        onClick={() => {
          dispatch({ type: 'next' })
        }}
      >
        Next
      </button>
    )
}

export default NextButton
