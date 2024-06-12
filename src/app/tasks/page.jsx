import styles from './taskPage.css';


async function loadTask(){
  const res = await  fetch('https://jsonplaceholder.typicode.com/posts')
  const data = await res.json()
  return data
}


async  function taskPage() {
  const tasks = await loadTask();
  return (
    <div className='background'>
      <header className='header'> <h1 className='h1'>Lista de pollas</h1></header>
    
    <div className='container'>
          {tasks.map((task) => (
            <div key={task.id} className='containertask'>
              
              <h3>{task.title}</h3>
              <p>{task.body}</p>
            </div>
          ))}

    </div>
    </div>
  );
}
  
  export default taskPage;

