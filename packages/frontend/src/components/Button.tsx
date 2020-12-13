import styled from "styled-components";

export const Button = styled.button`
  background-color: ${(props) => props.theme.colors.createButtonColor};
  border: 0px;
  border-radius: 5px;
  color: #ffffff;
  line-height: 22.4px;
  padding: 13.2px 26.4px;
  text-align: center;
  width: 100%;
  font-weight: 500;
  transition-duration: 250ms;
  margin-bottom: 16px;
  outline: 0;
  &:hover,
  &:focus {
    transform: translateY(-2px);
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.2);
    background-color: rgb(0, 170, 0);
  }
`;

export const DeleteButton = styled.button`
  background-color: rgb(180, 20, 20);
  color: white;
`;