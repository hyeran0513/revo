import React, { useState } from "react";
import Button from "../common/Button";
import CustomRadio from "../base/CustomRadio";
import styled from "styled-components";

const productConditions = [
  { text: "전체", value: "" },
  { text: "새 상품", value: "new" },
  { text: "중고", value: "used" },
];

const SideFilter = ({ setFilter }) => {
  const [selectedCondition, setSelectedCondition] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setFilter({
      condition: selectedCondition,
      minPrice,
      maxPrice,
    });
  };

  return (
    <SideFilterWrapper>
      <FilterHeader>필터</FilterHeader>

      <FormContainer>
        <FormField>
          <FormLabel>상품 유형</FormLabel>
          <CustomRadio
            conditions={productConditions}
            setSelectedValue={setSelectedCondition}
            selectedValue={selectedCondition}
            radioName="condition"
          />
        </FormField>

        <FormField>
          <FormLabel>가격</FormLabel>
          <InputFieldWrapper>
            <InputField
              type="number"
              value={minPrice}
              placeholder="최소 가격"
              onChange={(e) => setMinPrice(e.target.value)}
            />
            -
            <InputField
              type="number"
              value={maxPrice}
              placeholder="최대 가격"
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </InputFieldWrapper>
        </FormField>

        <FormAction>
          <Button
            onClick={handleSubmit}
            type="button"
            size="large"
            wfull="true"
          >
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
  background-color: ${(props) => props.theme.colors.bgopacity};
  z-index: 10;
`;

const InputFieldWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  width: 100%;
`;

const InputField = styled.input`
  padding: 0 20px;
  height: 40px;
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;
  background-color: ${(props) => props.theme.colors.bgopacity};
  flex: 1;
  max-width: 100%;
  width: calc(50% - 0.25rem);
`;

export default SideFilter;
