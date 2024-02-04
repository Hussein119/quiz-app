/* eslint-disable react/prop-types */
function RestartButton({ dispatch }) {
  return (
    <button
      className="btn btn-ui"
      onClick={() => {
        dispatch({ type: 'restart' })
      }}
    >
      Restart Quiz
    </button>
  )
}

export default RestartButton
