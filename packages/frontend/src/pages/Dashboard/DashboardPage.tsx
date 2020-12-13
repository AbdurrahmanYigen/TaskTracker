import React, { ChangeEvent, useEffect, useState } from "react";
import styled from "styled-components/macro";
import { Task, TaskItem, TaskList, TableRow } from "./components/TaskItem"
import { AddTaskForm } from "./components/AddTaskForm"
import { AddButton } from "./components/AddButton"
import { Modal } from "../../components/Modal"
import { EditTaskForm } from "./components/EditTaskForm"
import { Input } from "../../components/Input"

export const DashboardPage = () => {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [addTaskVisible, setAddTaskVisible] = useState(false);
    const [editTask, setEditTask] = useState<Task | null>(null);
    const [filteredTasks, setFilteredTasks] = useState<Task[]>([]);
    const [filtering, setFiltering] = useState<boolean>(false);

    const fetchTasks = async function () {
        const tasksRequest = await fetch("/api/task", {
            headers: { 'content-type': "application/json" },
        });
        if (tasksRequest.status === 200) {
            const taskJSON = await tasksRequest.json();
            setTasks(taskJSON.data)
        }
    };
    useEffect(() => {
        fetchTasks();
    }, [])

    const filterTasks = (e: ChangeEvent<HTMLInputElement>) => {
        setFilteredTasks(tasks.filter(filteredTask => (
            filteredTask.name.includes(e.target.value) ||
            filteredTask.description.includes(e.target.value) ||
            filteredTask.labels.some(label => (
                label.name.includes(e.target.value)
            ))
        )))
        if (e.target.value === "") {
            setFiltering(false);
        } else {
            setFiltering(true);
        }
    }

    return (
        <div>
            <div css={`
            display: flex;
            flex-direction: row;
            width: 100%;
        `}>
                <div><h1>Dashboard</h1></div>
                <div css={`
                flex: 1;
                justify-content: flex-end;
                display: flex;
                align-items: center;
            `}>
                    <AddButton onClick={() => {
                        setAddTaskVisible(true)
                    }}>Create Task</AddButton>
                </div>
            </div>
            <Input id="filterfield" type="text" name="filter" label="filter" onChange={filterTasks} />
            {addTaskVisible && (
                <Modal title="Create Task" onCancel={() => { setAddTaskVisible(false) }}>
                    <AddTaskForm afterSubmit={() => {
                        setAddTaskVisible(false);
                        fetchTasks();
                    }} />
                </Modal>
            )}
            {editTask && (
                <Modal title="Edit Task" onCancel={() => { setEditTask(null) }}>
                    <EditTaskForm afterSubmit={() => {
                        setEditTask(null);
                        fetchTasks();
                    }}
                        task={editTask} />
                </Modal>
            )}
            <TaskList>
                <thead>
                    <tr css={`
                    background-color: rgb(40, 40, 40);
                `}>
                        <th>Name</th>
                        <th>Description</th>
                        <th>Labels</th>
                        <th>Total tracked Time</th>
                        <th> </th>
                    </tr>
                </thead>
                <tbody>
                    {!filtering && (
                        tasks.map(task => (
                            <TableRow key={task.id}>
                                <TaskItem
                                    onClickEditTask={() => { setEditTask(task) }}
                                    key={task.id}
                                    task={task}
                                    fetchTasks={() => {fetchTasks()}}>
                                </TaskItem>
                            </TableRow>
                        )))}
                    {filtering && (
                        filteredTasks.map(task => (
                            <TableRow key={task.id}>
                                <TaskItem
                                    onClickEditTask={() => { setEditTask(task) }}
                                    key={task.id}
                                    task={task}>
                                </TaskItem>
                            </TableRow>
                        )))}
                </tbody>
            </TaskList>
        </div>
    );
}