import styled from "styled-components";

export const Container = styled.div`
  height: 100vh;
  min-height: 100vh;
  width: 100vw;
  background-color: #eee;
  display: flex;
  flex-direction: column;

  @media (max-width: 600px) {
    align-items: center !important;
  }

  .divider {
    width: 100%;
    height: 2px;
    background-color: rgba(0, 0, 0, 0.1);
    margin: 20px 0;
  }
`;

export const LeftSide = styled.div`
  width: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    width: 100%;
    margin: 40px 0;
  }
`;

export const PurchaseCard = styled.div`
  background-color: #fff;
  padding: 20px 2rem;
  border-radius: 0.9rem;
  width: fit-content;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  svg {
    font-size: 4rem;
    color: var(--accent-color);
  }

  h4 {
    font-weight: 900;
    margin-top: 10px;
    text-transform: capitalize;
    color: var(--accent-color);
  }

  small {
    font-weight: 700;
    color: #808080;
  }

  ul {
    list-style: none;
    width: 100%;
    padding-left: 0px !important;

    li {
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      margin: 12px 0;
      color: #b3b3b3;
      font-size: 15px;

      span {
        color: #808080;
        font-weight: 700;
      }
    }
  }
`;

export const RightSide = styled.div`
  width: 50%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media (max-width: 600px) {
    display: none;
  }

  img {
    width: 80%;
  }
`;

export const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  align-items: center;
  width: 100%;

  strong {
    font-size: 12px;
  }
`;

export const CopyLinkBtn = styled.div`
  padding: 10px 20px;
  border-radius: 0.9rem;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  cursor: pointer;
  transition: all 0.2s;
  gap: 10px;
  background-color: var(--accent-color);
  color: #fff;
  transition: all 0.2s;

  svg {
    color: #fff;
    font-size: 20px;
  }

  :hover {
    background-color: #b31d5e;
  }
`;

export const PaymentLink = styled.input`
  border: none;
  background-color: transparent;
  width: 100%;
  outline: none;
  padding: 12px 12px;
  background-color: #f5f6f6;
  border-radius: 0.9rem;
`;

export const Header = styled.div`
  height: auto;
  width: 100vw;
  display: flex;
  flex-direction: row;
  padding: 20px 40px;
  justify-content: flex-start;

  img {
    height: 30px;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  height: 100%;
  align-items: center;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  width: 100%;
`;

export const Footer = styled.div``;
