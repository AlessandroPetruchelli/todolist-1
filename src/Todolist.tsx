import {Button} from "./Button";
import {FilterValuesType, TaskType} from "./App";
import {ChangeEvent, KeyboardEvent, useState} from "react";
import {log} from "node:util";

type TodolistPropsType = {
    title: string,
    tasks: Array<TaskType>,
    removeTask: (taskId: number) => void
    changeFilter: (nameBtn: FilterValuesType) => void
    addTask: (text: string) => void
}

export const Todolist = ({title, tasks, removeTask, changeFilter, addTask}: TodolistPropsType) => {

    const [text, setText] = useState('');
    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setText(event.currentTarget.value);
    }
    const onKeyPressHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            addTask(text);
            setText('');
        }
    }
    const onClickAddTaskHandler = () => {
        addTask(text);
        setText('');
    }
    const changeFilterAllHandler = () => {
        changeFilter('All')
    }
    const changeFilterActiveHandler = () => {
        changeFilter('Active')
    }
    const changeFilterCompletedHandler = () => {
        changeFilter('Completed')
    }
    const tasksList = tasks.length ?
        tasks.map(t => {
            const onClickRemoveTaskHandler = () => {
                removeTask(t.id)
            }
            return (
                <li key={t.id}>
                    <input type="checkbox" checked={t.isDone}/>
                    <span>{t.title} </span>
                    <Button title='x' onClickHandler={onClickRemoveTaskHandler}/>
                </li>
            )
        }) :
        <span>Тасок нет</span>

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input
                    value={text}
                    onChange={onChangeInputHandler}
                    onKeyPress={onKeyPressHandler}/>
                <Button onClickHandler={onClickAddTaskHandler} title='+'/>
            </div>
            {tasksList}
            <div>
                <Button onClickHandler={changeFilterAllHandler} title='All'/>
                <Button onClickHandler={changeFilterActiveHandler} title='Active'/>
                <Button onClickHandler={changeFilterCompletedHandler} title='Completed'/>
            </div>
        </div>
    );
};

