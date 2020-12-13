import React, { useState } from "react";
import styled from "styled-components";

const StartTimerButton = styled.button`

`;

const StopTimerButton = styled.button`
    
`;

export const HandleTimerButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    if (props) {
        return (
            <StopTimerButton{...props}>Stop Timer</StopTimerButton>
        )
    } else {
        return (
            <StartTimerButton{...props}>Start Timer</StartTimerButton>
        )
    }
}