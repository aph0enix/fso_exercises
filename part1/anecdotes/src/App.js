
import { useState } from 'react'
function App() {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Uint8Array(anecdotes.length))
  console.log(...votes)
  return (
    <>
    <h1>Anecdote of the day</h1>
    <div>{anecdotes[selected]}</div>
    <div>has {votes[selected] || 0} votes</div>
    <button onClick={()=>{
      const newVotes = [...votes]
      newVotes[selected] = newVotes[selected] + 1 || 1
      setVotes(newVotes)
    }}>
      vote
    </button>
    <button onClick={()=>{let random= Math.floor(anecdotes.length * Math.random());console.log(random);setSelected(random)}}>
      next anecdotes
    </button>
    <h1>Anecdote with most votes</h1>
    <div>{(()=>{
      const mostVoted = anecdotes.reduce((prev, current, index)=>{
        console.log("index: ",index)
        if (votes[index]>prev[1])
          return [current,votes[index]]
        else
          return prev
      },[null,-1]);
      console.log("most ", mostVoted)
      return mostVoted[0];
    })()
    }</div>
    <div>has {Math.max(...votes)} votes</div>
    </>
  );
}

export default App;
