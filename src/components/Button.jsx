import styled from "styled-components";

const Button = styled.button`
  padding: ${({ size }) =>
    size === "small"
      ? "0px 15px"
      : size === "large"
      ? "12px 24px"
      : "0px 15px"};

  height: ${({ size }) =>
    size === "small" ? "28px" : size === "large" ? "40px" : "32px"};

  font-size: ${({ size }) =>
    size === "small" ? "14px" : size === "large" ? "16px" : "16px"};

  transition: background-color 0.3s, border-color 0.3s;

  outline: none;
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  text-align: center;
  background-image: none;
  background: transparent;
  cursor: pointer;
  user-select: none;
  touch-action: manipulation;
  border-radius: 4px;

  ${({ variant, theme }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
          &:hover {
            background-color: #36cfc9;
          }
        `;
      case "secondary":
        return `
          background-color: #6c757d;
          color: white;
          border: none;
          &:hover {
            background-color: #5a6268;
          }
        `;
      case "outline":
        return `
          background-color: transparent;
          color: #007bff;
          border: 2px solid #007bff;
          &:hover {
            background-color: #007bff;
            color: white;
          }
        `;
      default:
        return `
          background-color: ${theme.colors.primary};
          color: white;
          border: none;
          &:hover {
            background-color: ${theme.colors.primary};
          }
        `;
    }
  }}
`;

export default Button;
