/* eslint-disable react/prop-types */
function Options({ question, dispatch, answer }) {
  return (
    <div className="options">
      {question.options.map((option, index) => (
        <button
          className={`btn btn-option ${
            answer !== null
              ? index === answer
                ? 'answer'
                : index === question.correctOption
                ? 'correct'
                : 'wrong'
              : ''
          }`}
          disabled={answer !== null}
          key={index}
          onClick={() => dispatch({ type: 'newAnswer', payload: index })}
        >
          {option}
        </button>
      ))}
    </div>
  )
}

export default Options
