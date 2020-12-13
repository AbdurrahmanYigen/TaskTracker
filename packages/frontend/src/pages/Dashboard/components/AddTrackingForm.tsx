import React, { ChangeEvent, useState } from "react";
import styled from "styled-components";
import { Input } from "../../../components/Input"
import { Button } from "../../../components/Button";
import { Task } from "./TaskItem";

export const AddTrackingForm: React.FC<{ afterSubmit: () => void, task: Task, startTime: Date, endTime: Date }> = ({ afterSubmit, task, startTime, endTime }) => {
    const [description, setDescription] = useState("");
    
    const fieldDidChange = (e: ChangeEvent<HTMLInputElement>) => {
        setDescription(e.target.value);
        console.log(description);
    }
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const tempTracking = {
            description: description,
            startTime: startTime,
            endTime: endTime,
            task: task.name,
        };
        console.log(tempTracking);
        await fetch("/api/tracking", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(tempTracking),
        })
        afterSubmit();
    }

    return (
        <form onSubmit={onSubmitForm}>
            <StyledText>Titel:{task.name}</StyledText>
            <StyledText>Start Time: {startTime.toLocaleTimeString()} </StyledText>
            <StyledText>End Time: {endTime.toLocaleTimeString()}</StyledText>
            <Input
                type="text"
                name="description"
                label="Description"
                onChange={fieldDidChange}
                required
            />
            <Button type="submit">Save Tracking</Button>
        </form>
    )
}

export const StyledText = styled.div`
list-style: none;
width: 100%;
padding: 5px;
border-radius: 0.5em;
background-color: ${props => props.theme.colors.listBackgroundColor};
color: white;
`;