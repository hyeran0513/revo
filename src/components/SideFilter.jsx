import React from "react";
import styled from "styled-components";
import Button from "./Button";
import CustomRadio from "./CustomRadio";

const productTypes = [
  { text: "새 상품", value: "new" },
  { text: "중고", value: "used" },
];

const SideFilter = () => {
  return (
    <SideFilterWrapper>
      <FilterHeader>필터</FilterHeader>

      <FormContainer>
        <FormField>
          <FormLabel>상품 유형</FormLabel>
          <CustomRadio productTypes={productTypes} />
        </FormField>

        <FormField>
          <FormLabel>가격</FormLabel>
          <PriceInput>
            <InputField type="number" /> ~
            <InputField type="number" />
          </PriceInput>
        </FormField>

        <FormAction>
          <Button size="large" wfull>
            검색
          </Button>
        </FormAction>
      </FormContainer>
    </SideFilterWrapper>
  );
};

const FilterHeader = styled.div`
  padding: 14px 20px;
  font-weight: bold;
  border-bottom: 1px solid ${(props) => props.theme.colors.border};
`;

const FormContainer = styled.form``;

const FormField = styled.div`
  padding: 14px 20px;
`;

const FormLabel = styled.div`
  margin-bottom: 10px;
  font-size: 14px;
`;

const FormAction = styled.div`
  padding: 14px 20px;
`;

const SideFilterWrapper = styled.div`
  position: sticky;
  top: 150px;
  width: 30%;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.background};
  z-index: 10;
`;

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const InputField = styled.input`
  padding: 0 20px;
  width: 100%;
  height: 100%;
  border: 0;
  background-color: ${(props) => props.theme.inputs.background};
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;
  overflow: hidden;
`;

export default SideFilter;
