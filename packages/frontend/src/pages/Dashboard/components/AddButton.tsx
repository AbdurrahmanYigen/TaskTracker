import React from "react";
import styled from "styled-components";

const StyledButton = styled.button`
        border: 0px;
        height: 30px;
        display: flex;
        justify-content: center;
        align-items: center;
        border-radius: 5%;
        color: white;
        background-color: ${props => props.theme.colors.createButtonColor};
        &:hover {
            background-color: rgb(0, 170, 0);
        } 
    `;


export const AddButton = (props: React.ButtonHTMLAttributes<HTMLButtonElement>) => {
    return (
        <StyledButton {...props}></StyledButton>
    )
}