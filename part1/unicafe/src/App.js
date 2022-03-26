
import { useState } from 'react'

const Button = ({onClick, text}) => {
  return(
    <button onClick={onClick}>{text}</button>
  );
}

const StatisticsLine = ({text, value}) => {
  return (
    <tr>
    <td>{text}</td>
    <td>{value}</td> 
    </tr>
  )
}

const Statistics = ({feedback}) => {
  const score = [1,0,-1]
  const total = feedback.reduce((a,b) => a+b)
  const average = (feedback.map((val, index) => val*score[index]).reduce((a,b) => a+b))/(total > 0 ? total : 1)
  const positive = 100*feedback[0]/(total > 0 ? total : 1)
  if (total > 0){
    return (
      <>
        <h1>statistics</h1>
        <table><tbody>
          <StatisticsLine text="good" value={feedback[0]}/>
          <StatisticsLine text="neutral" value={feedback[1]}/>
          <StatisticsLine text="bad" value={feedback[2]}/>
          <StatisticsLine text="all" value={total}/>
          <StatisticsLine text="average" value={average}/>
          <StatisticsLine text="positive" value={positive + " %"}/>
          </tbody></table>
      </>
    );
  }
  return (
    <>
    <h1>statistics</h1>
    <p>No feedback given</p>
    </>
  )
  
}

const App = () => {
  const [feedback, setFeedback] = useState([0,0,0]);
  return (
    <div>
      <h1>give feedback</h1>
      <div>
      <Button onClick={()=>setFeedback([++feedback[0],feedback[1],feedback[2]])} text="good"/>
      <Button onClick={()=>setFeedback([feedback[0],++feedback[1],feedback[2]])} text="neutral"/>
      <Button onClick={()=>setFeedback([feedback[0],feedback[1],++feedback[2]])} text="bad"/>
      </div>
      <Statistics feedback={feedback}/>
    </div>
  );
}

export default App;
