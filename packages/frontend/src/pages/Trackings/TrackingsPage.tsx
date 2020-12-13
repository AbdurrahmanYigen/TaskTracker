import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { Task, Tracking, TaskList as TrackingList, TableRow } from "../Dashboard/components/TaskItem"
import { TrackingItem } from "./components/TrackingItem"
import { Modal } from "../../components/Modal"
import styled from "styled-components"
import { EditTrackingForm } from "./components/EditTrackingForm"

interface Taskid {
    taskid: string
}

const tempTask: Task = {
    id: "0",
    name: "tempTask",
    description: "this is my temp task",
    createdAt: new Date(),
    updatedAt: new Date(),
    labels: [],
    trackings: []
}

export const TrackingPage = () => {
    const taskIdFromParam: Taskid = useParams();
    const [task, setTask] = useState<Task>(tempTask);
    const [editTracking, setEditTracking] = useState<Tracking | null>(null)

    const fetchTaskWithId = async function () {
        const taskRequest = await fetch(`/api/task/${taskIdFromParam.taskid}`, {
            headers: { 'content-type': "application/json" },
        });
        if (taskRequest.status === 200) {
            const taskJSON = await taskRequest.json();
            setTask(taskJSON.data)
        }
    }

    useEffect(() => {
        fetchTaskWithId();
    }, [])
    return (
        <div>
            <div css={`
                display: flex;
                flex-direction: row;
                width: 100%;
                `}>
                <div><h1>{task?.name}</h1></div>
                <div css={`
                    flex: 1;
                    justify-content: flex-end;
                    display: flex;
                    align-items: center;
                    `}>
                </div>
            </div>
            {editTracking && (
                <Modal title="Edit Tracking" onCancel={() => { setEditTracking(null) }}>
                    <EditTrackingForm afterSubmit={() => {
                        setEditTracking(null);
                        fetchTaskWithId();
                    }}
                        task={task}
                        tracking={editTracking} />
                </Modal>
            )}
            <TrackingList>
                <thead>
                    <TableHead>
                        <th>Description</th>
                        <th>Start</th>
                        <th>End</th>
                        <th>Duration</th>
                        <th> </th>
                    </TableHead>
                </thead>
                <tbody>
                    {task?.trackings.map(tracking => (
                        <TableRow key={tracking.id}>
                            <TrackingItem
                                onClickEditTracking={() => { setEditTracking(tracking) }}
                                key={task.id}
                                tracking={tracking}>
                            </TrackingItem>
                        </TableRow>
                    ))}
                </tbody>
            </TrackingList>
        </div>
    )
}

export const TableHead = styled.tr`
    background-color: rgb(40, 40, 40);
`;