import React, { ChangeEvent, useState } from "react";
import { Input } from "../../../components/Input"
import { Button, DeleteButton } from "../../../components/Button";
import { Task, Tracking } from "../../Dashboard/components/TaskItem";

interface Label {
    name: string;
}

export const EditTrackingForm: React.FC<{ afterSubmit: () => void, task: Task, tracking: Tracking }> = ({ afterSubmit, task, tracking }) => {
    const [description, setDescription] = useState(tracking.description);


    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value)
    }

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tempValues = {
            description: description
        };
        console.log("send data: ", tempValues);
        console.log(tracking.id);
        await fetch(`/api/tracking/${tracking.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempValues),
        })
        afterSubmit();
    }

    const deleteTracking = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await fetch(`/api/tracking/${tracking.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        afterSubmit();
    }

    const getFormatedTime = (time: any) => {
        const year = new Date(time).getFullYear();
        const month = new Date(time).getMonth();
        const day = new Date(time).getDate();
        const hours = new Date(time).getHours();
        const minutes = new Date(time).getMinutes();
        const seconds = new Date(time).getSeconds();

        return `${year}-${month}-${day} ${checkTime(hours)}:${checkTime(minutes)}:${checkTime(seconds)}`;
    }

    const checkTime = (time: any) => {
        if (time < 10) {
            time = "0" + time;
        }
        return time;
    }

    return (
        <>
            <form onSubmit={onSubmitForm}>
                <div>Task: {task.name}</div>
                <div>Start Time: {getFormatedTime(tracking.startTime)}</div>
                <div>End Time: {getFormatedTime(tracking.endTime)}</div>
                <Input
                    type="text"
                    name="description"
                    label="Description"
                    value={description}
                    onChange={fieldDidChange}
                    required
                />
                <Button type="submit">Edit Tracking</Button>
                <DeleteButton onClick={deleteTracking}>Delete Tracking</DeleteButton>
            </form>
        </>
    )
}
