import React, { useState } from "react";
import styled from "styled-components";

const CustomRadio = ({
  conditions,
  selectedValue,
  setSelectedValue,
  radioName,
  checked,
}) => {
  const onChangeRadio = (e) => {
    setSelectedValue(e.target.value);
  };

  return (
    <RadioWrapper>
      {conditions.map((condition) => (
        <Label key={condition.value}>
          <RadioInput
            type="radio"
            name={radioName}
            value={condition.value}
            onChange={onChangeRadio}
            checked={
              selectedValue
                ? selectedValue === condition.value
                : condition.checked === "true"
            }
            id={condition.value}
          />
          <RadioText
            $isSelected={
              selectedValue === condition.value ||
              (checked && condition.checked === "true")
            }
          >
            {condition.text}
          </RadioText>
        </Label>
      ))}
    </RadioWrapper>
  );
};

export default CustomRadio;

const RadioWrapper = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.5rem;
`;

const Label = styled.label``;

const RadioInput = styled.input`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
  width: 0;
`;

const RadioText = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid
    ${({ $isSelected }) =>
      $isSelected ? "#9D7DC9" : "hsla(220, 20%, 80%, 0.4)"};
  height: 40px;
  border-radius: 5px;
  text-align: center;
  padding: 4px 16px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  &::before {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    display: inline-block;
    opacity: 0.2;

    background-color: ${({ $isSelected, theme }) =>
      $isSelected ? "#9D7DC9" : "#fafafa"};
    z-index: -1;
  }
`;
