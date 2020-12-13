import React, { ChangeEvent, useRef, useState } from "react";
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button";
import { InputContainer, Tag } from "../../../components/SelectInput";


interface Label {
    name: string;
    id: string;
}

export const AddTaskForm: React.FC<{ afterSubmit: () => void }> = ({ afterSubmit }) => {
    const [selectedLabels, setSelectedLabels] = useState<Label[]>([]);
    const [values, setValues] = useState({
        name: "",
        description: "",
        labels: "",

    })
    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        setValues({ ...values, [e.target.name]: e.target.value })
    }
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tempValues = {
            name: values.name,
            description: values.description,
            labels: selectedLabels.map(label => {
                return { name: label.name }
            })
        };
        console.log(tempValues);
        await fetch("/api/task", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempValues),
        })
        afterSubmit();
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "," && !selectedLabels.some(label => label.name === values.labels)) {
            setSelectedLabels([
                ...selectedLabels,
                createLabel(values.labels)
            ])
            e.preventDefault();
            e.currentTarget.value = "";
        }

    }

    const createLabel = (labelName: string): Label => {
        return {
            name: labelName,
            id: `${labelName.replace(" ", "-")}-${Math.floor(Math.random() * 10000)}`
        }
    }

    const removeLabel = (label: Label) => {
        setSelectedLabels(selectedLabels.filter(selectedLabel => ( label.id !== selectedLabel.id)))
    }

    return (
        <form onSubmit={onSubmitForm}>
            <Input
                type="text"
                name="name"
                label="Name"
                onChange={fieldDidChange}
                required
            />
            <Input
                type="text"
                name="description"
                label="Description"
                onChange={fieldDidChange}
                required
            />
            <InputContainer>
                {selectedLabels.map(label => (
                    <Tag key={label.id}>{label.name}<button onClick={() => {removeLabel(label)}}>x</button></Tag>
                ))}
            </InputContainer>
            <Input
                type="text"
                name="labels"
                label="Label(s) mit komma bestätigen"
                onChange={fieldDidChange}
                onKeyDown={onKeyDown}
            />
            <Button type="submit">Add Task</Button>
        </form>
    )
}