import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "../../../components/Input"
import { Button, DeleteButton } from "../../../components/Button";
import { InputContainer, Tag } from "../../../components/SelectInput";
import { Task } from "./TaskItem";

interface Label {
    name: string;
}

interface EditTaskFormState {
    name: string;
    description: string;
    labels: Label[];
}

export const EditTaskForm: React.FC<{ afterSubmit: () => void, task: Task }> = ({ afterSubmit, task }) => {
    const [currentTask, setCurrentTask] = useState<Task>(task);
    const [labels, setLabels] = useState<Label[]>(task.labels);

    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCurrentTask({ ...currentTask, [e.target.name]: e.target.value })
    }

    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tempValues = {
            name: currentTask.name,
            description: currentTask.description,
            labels: labels,
        };
        console.log("send data: ", tempValues);
        await fetch(`/api/task/${task.id}`, {
            method: "PATCH",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempValues),
    
        })
        afterSubmit();
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === ",") {
            setLabels([...labels, createLabel(e.currentTarget.value)])
            e.preventDefault();
            e.currentTarget.value = "";
        }
    }

    const createLabel = (labelName: string): Label => {
        return {
            name: labelName
        }
    }

    const removeLabel = (label: Label) => {
        setLabels(labels.filter(newLabel => (label.name !== newLabel.name)))
    }

    const deleteTask = async (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();

        await fetch(`/api/task/${task.id}`, {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
        })
        afterSubmit();
    }

    return (
        <form onSubmit={onSubmitForm}>
            <Input
                type="text"
                name="name"
                label="Name"
                onChange={fieldDidChange}
                value={currentTask.name}
                required
            />
            <Input
                type="text"
                name="description"
                label="Description"
                onChange={fieldDidChange}
                value={currentTask.description}
                required
            />
            <InputContainer>
                {labels.map(label => (
                    <Tag key={label.name}>{label.name}<button type="button" onClick={() => { removeLabel(label) }}>x</button></Tag>
                ))}
            </InputContainer>
            <Input
                type="text"
                name="labels"
                label="Label(s) mit komma bestätigen"
                //onChange={fieldDidChange}
                onKeyDown={onKeyDown}
            />
            <Button type="submit">Edit Task</Button>
            <DeleteButton onClick={deleteTask}>Delete Task</DeleteButton>
        </form>
    )
}