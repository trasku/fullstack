import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad, feedbacks}) => {
  const amountOfFeedbacks = feedbacks.length
  const average = amountOfFeedbacks
    ? feedbacks.reduce((sum, value) => sum + value, 0) / amountOfFeedbacks
    : 0

  const positiveRatio = amountOfFeedbacks
    ? good*100 / amountOfFeedbacks
    : 0

  if (feedbacks.length === 0) {
    return <p>No feedback given</p>
  }

  return (
    <table>
      <tbody>
        <StatisticsRow text="good" value={good} />
        <StatisticsRow text="neutral" value={neutral} />
        <StatisticsRow text="bad" value={bad} />
        <StatisticsRow text="all" value={feedbacks.length} />
        <StatisticsRow text="average" value={average} />
        <StatisticsRow text="positive" value={positiveRatio} isPercentage />
      </tbody>
    </table>
  )
}

const StatisticsRow = ({ text, value, isPercentage }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{isPercentage ? `${value} %` : value}</td>
    </tr>
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
      <Statistics good={good} neutral={neutral} bad={bad} feedbacks={feedbacks} />
    </div>
  )
}

export default App