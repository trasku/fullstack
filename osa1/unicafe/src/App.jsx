import { useState } from 'react'

const Button = ({ onClick, text }) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  // tallenna napit omaan tilaansa
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodFB = () => {
    console.log('good feedback given')
    setGood(good + 1)
  }

  const neutralFB = () => {
    console.log('neutral feedback given')
    setNeutral(neutral + 1)
  }

  const badFB = () => {
    console.log('bad feedback given')
    setBad(bad + 1)
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
    </div>
  )
}

export default App