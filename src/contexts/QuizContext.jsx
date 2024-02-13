/* eslint-disable react/prop-types */
import { createContext, useContext, useReducer } from 'react'

const QuizContext = createContext()

const initialState = {
  questions: [
    {
      question: 'Which is the most popular JavaScript framework?',
      options: ['Angular', 'React', 'Svelte', 'Vue'],
      correctOption: 1,
      points: 10,
      id: '2b5b',
    },
    {
      question: 'Which company invented React?',
      options: ['Google', 'Apple', 'Netflix', 'Facebook'],
      correctOption: 3,
      points: 10,
      id: '498a',
    },
    {
      question: "What's the fundamental building block of React apps?",
      options: ['Components', 'Blocks', 'Elements', 'Effects'],
      correctOption: 0,
      points: 10,
      id: '2226',
    },
    {
      question:
        "What's the name of the syntax we use to describe the UI in React components?",
      options: ['FBJ', 'Babel', 'JSX', 'ES2015'],
      correctOption: 2,
      points: 10,
      id: '2e66',
    },
    {
      question: 'How does data flow naturally in React apps?',
      options: [
        'From parents to children',
        'From children to parents',
        'Both ways',
        'The developers decides',
      ],
      correctOption: 0,
      points: 10,
      id: '8610',
    },
    {
      question: 'How to pass data into a child component?',
      options: ['State', 'Props', 'PropTypes', 'Parameters'],
      correctOption: 1,
      points: 10,
      id: '4ecf',
    },
    {
      question: 'When to use derived state?',
      options: [
        'Whenever the state should not trigger a re-render',
        'Whenever the state can be synchronized with an effect',
        'Whenever the state should be accessible to all components',
        'Whenever the state can be computed from another state variable',
      ],
      correctOption: 3,
      points: 30,
      id: '41af',
    },
    {
      question: 'What triggers a UI re-render in React?',
      options: [
        'Running an effect',
        'Passing props',
        'Updating state',
        'Adding event listeners to DOM elements',
      ],
      correctOption: 2,
      points: 20,
      id: '8eec',
    },
    {
      question: 'When do we directly "touch" the DOM in React?',
      options: [
        'When we need to listen to an event',
        'When we need to change the UI',
        'When we need to add styles',
        'Almost never',
      ],
      correctOption: 3,
      points: 20,
      id: '6749',
    },
    {
      question: 'In what situation do we use a callback to update state?',
      options: [
        'When updating the state will be slow',
        'When the updated state is very data-intensive',
        'When the state update should happen faster',
        'When the new state depends on the previous state',
      ],
      correctOption: 3,
      points: 30,
      id: '576f',
    },
    {
      question:
        'If we pass a function to useState, when will that function be called?',
      options: [
        'On each re-render',
        'Each time we update the state',
        'Only on the initial render',
        'The first time we update the state',
      ],
      correctOption: 2,
      points: 30,
      id: '73d8',
    },
    {
      question:
        "Which hook to use for an API request on the component's initial render?",
      options: ['useState', 'useEffect', 'useRef', 'useReducer'],
      correctOption: 1,
      points: 10,
      id: '48a1',
    },
    {
      question:
        'Which variables should go into the useEffect dependency array?',
      options: [
        'Usually none',
        'All our state variables',
        'All state and props referenced in the effect',
        'All variables needed for clean up',
      ],
      correctOption: 2,
      points: 30,
      id: '7c64',
    },
    {
      question: 'An effect will always run on the initial render.',
      options: [
        'True',
        'It depends on the dependency array',
        'False',
        'In depends on the code in the effect',
      ],
      correctOption: 0,
      points: 30,
      id: '35e1',
    },
    {
      question:
        "When will an effect run if it doesn't have a dependency array?",
      options: [
        'Only when the component mounts',
        'Only when the component unmounts',
        'The first time the component re-renders',
        'Each time the component is re-rendered',
      ],
      correctOption: 3,
      points: 20,
      id: 'a948',
    },
  ],
  status: 'ready',
  index: 0,
  answer: null,
  points: 0,
  highScore: 0,
  secondsRemaining: null,
}

const SECS_PER_QUESTION = 30

function reducer(state, action) {
  switch (action.type) {
    case 'dataReceived':
      return {
        ...state,
        questions: action.payload,
        status: action.payload.length > 0 ? 'ready' : 'error',
      }
    case 'dataFailed':
      return { ...state, status: 'error' }
    case 'start':
      return {
        ...state,
        status: 'active',
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      }
    case 'next':
      return { ...state, index: state.index + 1, answer: null }
    case 'newAnswer': {
      const question = state.questions?.at(state.index)
      const updatedState = {
        ...state,
        answer: action.payload,
        points:
          question && action.payload === question.correctOption
            ? state.points + question.points
            : state.points,
      }
      return updatedState
    }
    case 'finished':
      return {
        ...state,
        status: 'finished',
        highScore:
          state.points > state.highScore ? state.points : state.highScore,
      }
    case 'restart':
      return {
        ...initialState,
        questions: state.questions,
        status: 'ready',
      }
    case 'tick':
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? 'finished' : state.status,
      }

    default:
      throw new Error('Action is unknown')
  }
}

/*   useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8080/questions')
        const data = await response.json()
        dispatch({ type: 'dataReceived', payload: data })
      } catch (error) {
        dispatch({ type: 'dataFailed' })
      }
    }

    fetchData()
  }, [dispatch]) */

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highScore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState)

  const numQuestions = questions.length
  const maxPoints = questions.reduce((prev, cur) => prev + cur.points, 0)

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highScore,
        secondsRemaining,
        dispatch,
        numQuestions,
        maxPoints,
      }}
    >
      {children}
    </QuizContext.Provider>
  )
}

function useQuiz() {
  const context = useContext(QuizContext)
  if (context === undefined)
    throw new Error('QuizContext was used outside of its Provider')
  return context
}

export { QuizProvider, useQuiz }
