const Course = ({ course }) => {
  return (
  <div>
    <Header course={course} />
    <Content course={course} />
    <Total course={course} />
  </div>
  )
}

const Header = ({course}) => {
  // console.log("Should print header")
  return (
    <h2>{course.name}</h2>
  )
}

const Content = ({course}) => {
  return (
    <div>
      {course.parts.map(part => <Part part={part} key={part.id} />)}
    </div>
  )
}

const Part = ({part, id}) => {
  console.log({part})
  return (
    <p>{part.name} {part.exercises}</p>
  )
}

const Total = ({course}) => {
  const totalNumber = course.parts.reduce((sum, part) => sum + part.exercises, 0)
  return (
    <div>
      <p><b>Total number of exercises {totalNumber} </b></p>
    </div>
  )
}

export default Course