function Header() {
  return (
    <header className="app-header">
      <img src={`${import.meta.env.BASE_URL}quiz.ico`} alt="quiz" />
      <h1 style={{ marginRight: '270px' }}>Quiz</h1>
    </header>
  )
}

export default Header
