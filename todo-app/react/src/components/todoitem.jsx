import { Checkbox, IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';
import DeleteIcon from '@mui/icons-material/Delete';

const TodoItem = (props) => {
    const {emitDeleteTodoItem} = props;
    const [todoItem, setTodoItem] = useState(props.data);
    const [isDirty, setDirty] = useState(false);
    useEffect(() => {
        if (isDirty){
            fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`,{
                method:"PUT",
                headers:{
                    "content-type":"application/json"
                },
                body: JSON.stringify(todoItem)
            })
            .then(response => response.json())
            .then(data => {
                setDirty(false);
                setTodoItem(data);
            });
        }
    },[todoItem, isDirty])

    function updateTask(e){
        setDirty(true);
        setTodoItem({...todoItem, task: e.target.value});
    }
    
    function deleteTodoItem(){
        fetch(`http://localhost:8080/api/todoItems/${todoItem.id}`,{
                method:"DELETE",
                headers:{
                    "content-type":"application/json"
                },
            })
            .then(response => {
                emitDeleteTodoItem(todoItem);
            });

    }

    return (
        <div>
        <Checkbox
        checked={todoItem.isDone} 
        onChange={()=> {
            setDirty(true);
            setTodoItem({...todoItem, isDone: !todoItem.isDone})}}
        />
        {
            todoItem.isDone ? 
            <input type='text' className='done' value={todoItem.task} onChange={updateTask}/> : 
            <input type='text' value={todoItem.task} onChange={updateTask}/>
        }

        <IconButton aria-label="delete" size="large" onClick={deleteTodoItem}>
        <DeleteIcon fontSize="inherit" color="primary" />
        </IconButton>
        {/* <span style={{marginLeft: '2rem', cursor:'pointer'}} onClick={deleteTodoItem}>🗑️</span> */}
      </div>
    );
};

export default TodoItem;