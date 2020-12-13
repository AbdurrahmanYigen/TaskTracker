import React from "react";
import styled from "styled-components";
import { Tracking, CreateButton } from "../../Dashboard/components/TaskItem";

export type TrackingItemProps = {
    onClickEditTracking: () => void;
    tracking: Tracking;

}

export const TrackingItem: React.FC<TrackingItemProps> = ({
    tracking,
    onClickEditTracking = () => { },
}) => {
    return (
        <>
            <DescriptionCol>{tracking.description}</DescriptionCol>
            <StartTimeCol>
                <div>{new Date(tracking.startTime).getFullYear()}-{new Date(tracking.startTime).getMonth()}-{new Date(tracking.startTime).getDate()}</div>
                {new Date(tracking.startTime).toLocaleTimeString()}
            </StartTimeCol>
            <EndTimeCol>
                <div>{new Date(tracking.endTime).getFullYear()}-{new Date(tracking.endTime).getMonth()}-{new Date(tracking.endTime).getDate()}</div>
                {new Date(tracking.endTime).toLocaleTimeString()}
            </EndTimeCol>
            <DurationCol>{new Date(new Date(tracking.endTime).getTime() - new Date(tracking.startTime).getTime() - 3600000).toLocaleTimeString()}</DurationCol>
            <td>
                <CreateButton onClick={() => { onClickEditTracking() }}>Edit Tracking</CreateButton>
            </td>
        </>
    )
}

export const DescriptionCol = styled.td`
    text-align: center;
`;

export const StartTimeCol = styled.td`
    text-align:center;
`;

export const EndTimeCol = styled.td`
    text-align:center;
`;

export const DurationCol = styled.td`
    text-align:center;
`;