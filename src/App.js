
import {useState, useRef} from 'react';
import './App.css';

function App() {

    const [list, setList]= useState([]);
    const newtask= useRef("");
    const [search, newsearch]= useState('');
    console.log(list);
    
    
    const addtask= ()=>{
        localStorage.setItem('lists', JSON.stringify([...list, newtask.current.value]));
        setList([...list, newtask.current.value]);
        newtask.current.value='';

    }
    const deleteTask=(i)=>{
        const delList= [...list];
        delList.splice(i,1);
        setList(delList);
        localStorage.setItem('lists', JSON.stringify(delList));

    }
    const updateTask= (e,i)=>{
        const uptask= [...list];
        uptask.splice(i,1,e.target.value);
        setList(uptask);
        localStorage.setItem('lists', JSON.stringify(uptask));

    }
    const keyEnter= (e)=>{
      if(e.key === 'Enter'){
        addtask(e);
      }
    }

   
  return (

    <div className="App">
        <div className="search">
          <input type="text" placeholder="Search Task" onChange={(e)=> newsearch(e.target.value)}></input>
        </div>
        <h1 className="heading">To do App</h1> 
        <div className="inputs">
            <input placeholder="anything you want to do" type="text" ref={newtask} onKeyDown={keyEnter}/>     
            <button className="btn" onClick= {addtask}>Add Task</button>            
        </div>


        <div className="container">           
            {
                list.map((val,i)=>{
                  if(val.toLowerCase().includes(search.toLowerCase())){

                    return(
                    <div class="list" key={i}> 
                        <input type="text" value={val} onChange={(e)=> {updateTask(e,i)}}></input>
                        <span className="icon" onClick={()=>{deleteTask(i)}}>❌</span>
                    </div>

                    )
                  }
                })
            }            
        </div>

    </div>
    
  );
}

export default App;
