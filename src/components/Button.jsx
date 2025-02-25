import styled from "styled-components";

const Button = styled.button`
  padding: ${({ size }) =>
    size === "small"
      ? "4px 8px"
      : size === "large"
      ? "12px 24px"
      : "10px 20px"};
  font-size: ${({ size }) =>
    size === "small" ? "12px" : size === "large" ? "18px" : "16px"};
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, border-color 0.3s;

  ${({ variant }) => {
    switch (variant) {
      case "primary":
        return `
          background-color: #007bff;
          color: white;
          border: none;
          &:hover {
            background-color: #0056b3;
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
          background-color: #007bff;
          color: white;
          border: none;
        `;
    }
  }}
`;

export default Button;
