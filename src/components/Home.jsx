/* eslint-disable react/prop-types */
import QuestionForm from './QuestionForm'
function Home({ dispatch }) {
  return (
    <>
      <header className="app-header">
        <img src={`${import.meta.env.BASE_URL}quiz.ico`} alt="quiz" />
        <h1>Create your quiz now</h1>
      </header>

      <div style={{ textAlign: 'center', marginTop: '30px' }}>
        <QuestionForm dispatch={dispatch} />
      </div>
    </>
  )
}

export default Home
