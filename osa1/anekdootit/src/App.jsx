import { useState } from 'react'

const Button = ({ onClick, text }) => {
  return (
   <button onClick={onClick}>
      {text}
    </button>
  )
}

const MostVoted = ({ anecdotes, votes }) => {
  let mostVotedIndex = 0
  for (let i = 0; i < votes.length; i++) {
    if (votes[i] > votes[mostVotedIndex]) {
      mostVotedIndex = i
    }
  }
  if (votes[mostVotedIndex] === 0) {
    return (
      <p>No anecdote has been voted yet</p>
    )
  }
  return (
    <p>{anecdotes[mostVotedIndex]}</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)

  const next_text="Next anecdote"

  const vote_text="vote"

  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))

  const getRandom = () => {
    const randomInt = Math.floor(Math.random() * anecdotes.length)
    setSelected(randomInt)
  }

  const giveVote = () =>{
    const voteCopies = [...votes]
    voteCopies[selected] += 1
    setVotes(voteCopies)
    console.log(voteCopies)
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <p>has {votes[selected]} votes</p>
      <Button onClick={giveVote} text={vote_text} />
      <Button onClick={getRandom} text={next_text} />
      <h1>Anecdote with most votes</h1>
      <MostVoted anecdotes={anecdotes} votes={votes} />
    </div>
  )
}

export default App