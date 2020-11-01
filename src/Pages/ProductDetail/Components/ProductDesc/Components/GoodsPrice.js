import React from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";
import mixIn from "../../../../../Styles/Mixin";

const GoodsPrice = () => {
  const { data } = useSelector(({ prodDataReducer: { data } }) => ({ data }));

  return (
    <>
      <Container>
        <DcInfo>회원할인가</DcInfo>
        <PriceBox>
          <Price>
            <Number>{`${
              data.price === data.discount_price
                ? data.price?.toLocaleString() || data.price
                : data.discount_price?.toLocaleString() || data.discount_price
            }`}</Number>
            <Won>원</Won>
          </Price>
          {data.discount__percentage ? (
            <Dc>
              <DcPercent>{data.discount__percentage}</DcPercent>
              <Per>%</Per>
            </Dc>
          ) : null}
        </PriceBox>
        {data.price === data.discount_price ? null : (
          <OriginBox>
            <OriginPrice>{`${
              data.price?.toLocaleString() || data.price
            }`}</OriginPrice>
            <OriginWon>원</OriginWon>
          </OriginBox>
        )}
        <NoLogin>로그인 후, 회원할인가와 적립혜택이 제공됩니다.</NoLogin>
      </Container>
    </>
  );
};

export default GoodsPrice;

const Container = styled.View`
  padding: 0 10px;
`;

const DcInfo = styled.Text`
  padding: 0 10px;
  font-size: 14px;
  line-height: 20px;
`;

const PriceBox = styled.View`
  ${mixIn.flex("row", "flex-start", "baseline")}
`;

const Price = styled.Text`
  padding: 3px 10px 0;
`;

export const Number = styled.Text`
  padding-right: 2px;
  font-weight: 700;
  font-size: 24px;
  line-height: 26px;
  letter-spacing: -0.5px;
`;

export const Won = styled.Text`
  padding: 0 0 0 1px;
  font-weight: 400;
  font-size: 16px;
  line-height: 26px;
`;

const Dc = styled.View`
  ${mixIn.flex("row", "flex-start")}
`;

const DcPercent = styled.Text`
  font-weight: 700;
  font-size: 24px;
  color: #fa622f;
  line-height: 26px;
  letter-spacing: -0.5px;
`;

const Per = styled(DcPercent)`
  font-weight: 400;
`;

const OriginBox = styled(Dc)``;

export const OriginPrice = styled.Text`
  padding: 2px 0 0 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.color.DiscountedCostGrey};
  line-height: 24px;
  text-decoration: line-through;
  text-decoration-color: ${({ theme }) => theme.color.DiscountedCostGrey};
`;

export const OriginWon = styled(OriginPrice)`
  margin: 0;
  padding: 2px 0 0 0;
`;

const NoLogin = styled.Text`
  padding: 9px 10px 0;
  font-size: 14px;
  color: ${({ theme }) => theme.color.MainPurple};
  line-height: 19px;
  letter-spacing: -0.5px;
`;
