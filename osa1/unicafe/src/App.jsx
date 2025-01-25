import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Average = ({ feedbacks }) => {
  const amountOfFeedbacks = feedbacks.length
  const average = amountOfFeedbacks
    ? feedbacks.reduce((sum, value) => sum + value, 0) / amountOfFeedbacks
    : 0
  return (
    <p>average {average}</p>
  )
}

const PositiveRatio = ({ good, feedbacks }) => {
  const amountOfFeedbacks = feedbacks.length
  const positiveRatio = good
    ? good / amountOfFeedbacks
    : 0
  
  return (
    <p>positive {positiveRatio*100} %</p>
  )
}

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [feedbacks, setFeedback] = useState([])

  const goodFB = () => {
    console.log('good feedback given')
    setGood(good + 1)
    setFeedback(feedbacks.concat(1))
  }

  const neutralFB = () => {
    console.log('neutral feedback given')
    setNeutral(neutral + 1)
    setFeedback(feedbacks.concat(0))
  }

  const badFB = () => {
    console.log('bad feedback given')
    setBad(bad + 1)
    setFeedback(feedbacks.concat(-1))
  }

  return (
    <div>
      <h1>give feedback</h1>
      <Button onClick={goodFB} text="good" />
      <Button onClick={neutralFB} text="neutral" />
      <Button onClick={badFB} text="bad" />
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {feedbacks.length}</p>
      <Average feedbacks={feedbacks} />
      <PositiveRatio good={good} feedbacks={feedbacks} />
    </div>
  )
}

export default App