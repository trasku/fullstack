const Header = (course) => {
  return (
    <h1>{course.course}</h1>
  )
}

const Content = (params) => {
  return (
    <div>
      <Part part={params.part1} exercises={params.exercises1} />
      <Part part={params.part2} exercises={params.exercises2} />
      <Part part={params.part3} exercises={params.exercises3} />
    </div>
  )
}

const Part = (part) => {
  return (
    <p>{part.part} {part.exercises}</p>
  )
}

const Total = (sum) => {
  return (
    <div>
      <p>Number of exercises {sum.sum}</p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const part1 = 'Fundamentals of React'
  const exercises1 = 10
  const part2 = 'Using props to pass data'
  const exercises2 = 7
  const part3 = 'State of a component'
  const exercises3 = 14

  return (
    <div>
      <Header course={course} />
      <Content part1={part1} exercises1={exercises1} part2={part2} exercises2={exercises2} part3={part3} exercises3={exercises3} />
      <Total sum={exercises1 + exercises2 + exercises3} />
    </div>
  )
}

export default App