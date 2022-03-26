import React from 'react'

const Header = (props) => {
  return <h1>{props.courseName}</h1>;
};
const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercises}
    </p>
  );
};
const Content = ({parts}) => {
  return (
    <div>
      {parts.map(part=>{
        return <Part part={part.name} exercises={part.exercises} />
      }
      )}
      
    </div>
  );
};

function Total ({parts}) {
  return (
    <p><b>
      total of {parts.reduce((prev, cur) => {return prev + cur.exercises},0)}
      </b></p>
  );
}

const Course = ({course})=>{
  return (
    <div>
      <Header courseName={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
    </div>
  )
}

export default Course