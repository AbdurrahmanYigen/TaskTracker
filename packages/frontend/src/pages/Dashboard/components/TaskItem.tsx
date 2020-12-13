import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { Modal } from "../../../components/Modal";
import { AddTrackingForm } from "./AddTrackingForm"
import { Link } from "react-router-dom"

export type Task = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
    trackings: Tracking[];
    labels: Label[];
}

export type Tracking = {
    id?: string;
    description: string;
    startTime: Date;
    endTime: Date;
}

export type Label = {
    id: string;
    name: string;
    description: string;
    createdAt: Date;
    updatedAt: Date;
}


export type TaskItemProps = {
    task: Task;
    onClickEditTask: () => void;
    fetchTasks?: () => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    fetchTasks = () => { },
    onClickEditTask = () => { },
}) => {
    const { name, description, labels, trackings } = task;
    const [buttonText, setButtonText] = useState("Start Timer");
    const [timer, setTimer] = useState(0);
    const [stopTimerVisible, setStopTimerVisible] = useState<boolean>(false)
    const countRef = useRef(0);
    const [endTime, setEndTime] = useState<Date>(new Date)
    const [startTime, setStartTime] = useState<Date>(new Date)

    const handleClick = () => {
        if (buttonText === "Stop Timer") {
            // stopping timer
            setEndTime(new Date())
            const sTime = new Date(localStorage.getItem(`time-${task.id}`) || new Date())
            setStartTime(sTime)
            setButtonText("Start Timer")
            task.trackings.push({
                description: "",
                startTime: startTime,
                endTime: endTime,
            })
            setStopTimerVisible(true);
            localStorage.removeItem(`timerBtnState-${task.id}`);
            localStorage.removeItem(`task-${task.id}`);
            localStorage.removeItem(`time-${task.id}`);
            clearInterval(countRef.current)
            setTimer(0)
        } else {
            // starting Timer
            localStorage.setItem(`timerBtnState-${task.id}`, "running")
            localStorage.setItem(`time-${task.id}`, new Date().toString())
            startTimer();
        }
    }
    useEffect(() => {
        if (localStorage.getItem(`timerBtnState-${task.id}`) === "running") {
            startTimer();
        }
    }, [])

    const startTimer = () => {
        setButtonText("Stop Timer")
        countRef.current = setInterval(() => {
            setTimer((timer) => {
                let storageTimer = localStorage.getItem(`task-${task.id}`);
                timer = parseInt(storageTimer || "0");
                timer += 1;
                localStorage.setItem(`task-${task.id}`, timer.toString());
                return timer;
            })
        }, 1000)
    }

    const formatTime = () => {
        const getSeconds = `0${(timer % 60)}`.slice(-2)
        const minutes = `${Math.floor(timer / 60)}`
        const getMinutes = `0${parseInt(minutes) % 60}`.slice(-2)
        const getHours = `0${Math.floor(timer / 3600)}`.slice(-2)

        return `${getHours}:${getMinutes}:${getSeconds}`
    }

    return (
        <>
            <TaskName>{name}</TaskName>
            <TaskDescription>{description}</TaskDescription>
            <LabelCol>
                {labels &&
                    labels.map((label: Label) => {
                        const givenLabel = (label.name === "") ? console.log("no label") :
                            <LabelItem key={label.id} id={label.id}>{label.name}</LabelItem>;
                        return givenLabel;
                    })}
            </LabelCol>
            <TrackedTimeCol>
                <div>
                    <div>{formatTime()}</div>
                    {new Date(trackings.reduce((prev, cur) => prev + (new Date(cur.endTime).getTime() - new Date(cur.startTime).getTime()), -3600000)).toLocaleTimeString()}
                </div>
                <LinkToTrackings to={`../trackings/${task.id}`}>i</LinkToTrackings>
            </TrackedTimeCol>
            <td>
                <CreateButton onClick={() => handleClick()}>{buttonText}</CreateButton>
                <CreateButton onClick={() => { onClickEditTask() }}>Edit Task</CreateButton>
                {stopTimerVisible && (
                    <Modal title="Add Tracking" onCancel={() => { setStopTimerVisible(false) }}>
                        <AddTrackingForm afterSubmit={() => {
                            setStopTimerVisible(false);
                            fetchTasks();
                        }}
                            task={task} startTime={startTime} endTime={endTime} />
                    </Modal>
                )}
            </td>

        </>
    );
};

export const TaskList = styled.table`
list-style: none;
width: 100%;
padding: 0;
border-radius: 0.5em;
background-color: ${props => props.theme.colors.listBackgroundColor};
`;

export const TaskName = styled.td`
    text-align: center;
`;

export const TaskDescription = styled.td`
    text-align: center;
`;

const TrackedTimeCol = styled.td`
    text-align: center;
    display: center;
`;

const LabelCol = styled.td`
display: flex;
flex-wrap: wrap;
`;

export const TableRow = styled.tr`
    box-shadow: 0 0.2em 0 ${props => props.theme.colors.shadowColor};
    &:hover{
        background-color: ${props => props.theme.colors.shadowColor};
    }
`;

export const CreateButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <StyledButton {...props}>

        </StyledButton>
    )
}

const StyledButton = styled.button`
        margin: 5px;
        border: 0px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5%;
        color: white;
        background-color: ${props => props.theme.colors.buttonColor};
        &:hover {
            background-color: ${props => props.theme.colors.hoverButtonColor};
        } 
`;

export const LabelItem = styled.div`
    margin: 5px 5px;
    padding: 5px;
    background-color: ${props => props.theme.colors.shadowColor};
    border-radius: 5%;
`;

export const LinkToTrackings = styled(Link)`
    text-decoration: none;
    font-family: serif;
    padding: 1px 8px;
    border-radius: 50%;
    color: black;
    background-color: grey;
`;