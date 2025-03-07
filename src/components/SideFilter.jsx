import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Button from "./Button";
import CustomRadio from "./CustomRadio";

const productConditions = [
  { text: "전체", value: "", checked: true },
  { text: "새 상품", value: "new", checked: false },
  { text: "중고", value: "used", checked: false },
];

const productPrice = [
  { text: "전체", value: "", checked: true },
  { text: "만원 이하", value: "10000", checked: false },
  { text: "오만원 이하", value: "50000", checked: false },
  { text: "십만원 이하", value: "100000", checked: false },
  { text: "십만원 이상", value: "other", checked: false },
];

const SideFilter = ({ setFilter, filter }) => {
  const [selectedCondition, setSelectedCondition] = useState(
    productConditions.find((condition) => condition.checked)?.value || ""
  );
  const [selectedPrice, setSelectedPrice] = useState(
    productPrice.find((price) => price.checked)?.value || ""
  );

  const handleSubmit = () => {
    setFilter({
      condition: selectedCondition,
      price: selectedPrice,
    });
  };

  useEffect(() => {
    console.log("Filter updated:", filter);
  }, [filter]);

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
          <PriceInput>
            <CustomRadio
              conditions={productPrice}
              setSelectedValue={setSelectedPrice}
              selectedValue={selectedPrice}
              radioName="price"
            />
          </PriceInput>
        </FormField>

        <FormAction>
          <Button
            type="button"
            onClick={handleSubmit}
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
  background-color: ${(props) => props.theme.colors.background};
  z-index: 10;
`;

const PriceInput = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

export default SideFilter;
