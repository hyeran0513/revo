import React from "react";
import { BiHide, BiShow } from "react-icons/bi";
import styled from "styled-components";

const InputField = ({
  type,
  value,
  placeholder,
  onChange,
  error,
  showPassword,
  onTogglePassword,
}) => {
  return (
    <FormBox>
      <FormField>
        <InputBox
          type={type === "password" && showPassword ? "text" : type}
          value={value}
          placeholder={placeholder}
          onChange={onChange}
        />

        {(type === "password" || type === "passwordConfirm") && (
          <PasswordButton type="button" onClick={onTogglePassword}>
            {showPassword ? <BiHide /> : <BiShow />}
          </PasswordButton>
        )}
      </FormField>

      {error && <ErrorMessage>{error}</ErrorMessage>}
    </FormBox>
  );
};

const FormBox = styled.div``;

const FormField = styled.div`
  display: flex;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

const InputBox = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
  color: ${(props) => props.theme.colors.text};
`;

const PasswordButton = styled.button`
  padding: 0 20px;
  background-color: inherit;

  svg {
    font-size: 18px;
  }
`;

const ErrorMessage = styled.p`
  margin-top: 4px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.accent};
`;

export default InputField;
