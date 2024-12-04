import React, {useState} from 'react';
import './App.css';
import {Button} from "./Button";
import {Todolist} from "./Todolist";

export type TaskType = {
    id: number;
    title: string;
    isDone: boolean;
}
export type FilterValuesType = 'All' | 'Active' | 'Completed';

function App() {

//BLL
    const todoListTitle = 'What to learn';


    // [{},{},{}]
    const [tasks, setTasks] = useState<TaskType[]>([
        {id: 1, title: 'HTML', isDone: true},
        {id: 2, title: 'CSS', isDone: true},
        {id: 3, title: 'React', isDone: false},
    ]);


    // функция удаления тасок
    const removeTask = (taskId: number) => {  //callback
        const nextState: TaskType[] = tasks.filter(t => t.id !== taskId);
        setTasks(nextState);
    }
    // функция добавления тасок
    const addTask = (text: string) => {
        const newTask = {
            id: 4,
            title: text,
            isDone: false
        }
        const newTasks = [newTask, ...tasks];
        setTasks(newTasks);
    }

    // функция фильтрации тасок
    const changeFilter = (nameBtn: FilterValuesType) => {
        setFilter(nameBtn)
    };




//GUI

        //'all'
    const [filter, setFilter] = useState<FilterValuesType>('All');
    // durshlag
    let filteredTasks = [...tasks];

    if (filter === 'Active') {
        // durshlag
        filteredTasks = tasks.filter(t => !t.isDone)  // durshlag фильтруем
    }
    if (filter === 'Completed') {
        // durshlag
        filteredTasks = tasks.filter(t => t.isDone) // durshlag фильтруем
    }

    return (
        <div className="App">
            <Todolist
                title={todoListTitle}
                tasks={filteredTasks}// durshlag
                removeTask={removeTask}
                changeFilter={changeFilter}
                addTask={addTask}
            />
        </div>
    );
}


export default App;
