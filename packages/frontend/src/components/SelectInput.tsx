import React, { useRef, useState } from "react";
import styled from "styled-components";

const DropdownHolder = styled.div`

`;

export const InputContainer = styled.div`
  transition-duration: 0.4s;
  transition-property: box-shadow, border-color;
  border: 1px solid rgb(230, 230, 230);

  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  position: relative;
  min-height: 40px;
  border-radius: 5px;
  background-color: #ffffff;
  color: #000;

`;

const InputField = styled.input`

`;

const InputLabel = styled.label`

`;

export const Tag = styled.div`
  border-radius: 5px;
  background-color: ${(props) => props.theme.colors.buttonColor};
  position: relative;

  color: white;
  text-align: center;
  padding: 3px 6px;
  padding-right: 25px;
  margin: 25px 0px 3px 8px;
  overflow: visible;
  outline-width: 0px;
  border-image: initial;
  border-width: 0;
  outline-style: none;

  &:not(:empty) ~ ${InputLabel} {
    transform: matrix(0.8, 0, 0, 0.8, 0, -24.75);
  }
  &:not(:empty) ~ ${InputField} {
    padding-left: 8px;
  }

  &:first-child {
    margin-left: 20px;
  }
  & > button {
    all: unset;
    transition-duration: 0.25s;
    transition-property: background-color;
    position: absolute;
    right: 0px;
    top: 0px;
    height: 100%;
    width: 20px;
    border-top-right-radius: 5px;
    border-bottom-right-radius: 5px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: teal;
    cursor: pointer;
    &:focus,
    &:hover {
      background-color: #d01c1f;
    }
  }
`;

export const SelectInput: React.FC<{ label: string }> = ({ label }) => {
    const [inputValue, setInputValue] = useState("");
    const id = useRef(
        `${label.replace(" ", "-")}-${Math.floor(Math.random() * 10000)}`
    );

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.currentTarget.value);
    }
    return (
        <DropdownHolder>
            <InputContainer>
                <InputField id={id.current} value={inputValue} onChange={onChangeInput} />
                <InputLabel htmlFor={id.current}>{label}</InputLabel>
            </InputContainer>
        </DropdownHolder>
    );
}