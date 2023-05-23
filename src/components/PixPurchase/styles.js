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

export const PurchaseCard = styled.div`
  background-color: #fff;
  padding: 20px 2rem;
  border-radius: 0.9rem;
  width: fit-content;
  max-width: 500px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  flex-direction: column;
  align-items: center;

  .footer {
    font-size: 12px;
    color: var(--accent-color);
    font-weight: 700;
  }

  hr {
    margin: 0px;
  }

  img {
    width: 120px;
    margin-bottom: 30px;
  }

  h5 {
    color: #252525;
    font-weight: 900;
  }
`;

export const Success = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  svg {
    color: var(--accent-color);
    margin-bottom: 15px;
  }

  h5 {
    color: var(--accent-color);
    margin-bottom: 10px;
  }

  small {
    width: 80%;
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

export const Status = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 8px 20px;
  margin: 15px 0;
  background-color: #3f3d56;
  border-radius: 0.4rem;
  color: #fff;
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

export const PaymentWrapper = styled.div`
  display: flex;
  flex-direction: column;

  gap: 10px;
  align-items: center;
  width: 100%;

  strong {
    font-size: 15px;
  }

  small {
    font-size: 11px;
    font-weight: 700;
    color: #252525;
  }
`;

export const CopyLinkBtn = styled.div`
  padding: 10px 26px;
  border-radius: 0.9rem;
  font-size: 22px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 70%;
  cursor: pointer;
  transition: all 0.2s;
  gap: 10px;
  background-color: var(--accent-color);
  color: #fff;
  transition: all 0.2s;
  :hover {
    background-color: #b31d5e;
  }
`;

export const PaymentLink = styled.input`
  border: none;
  background-color: transparent;
  width: 70%;
  outline: none;
  padding: 6px;
  background-color: #f5f6f6;
  border-radius: 0.5rem;
  margin-bottom: 15px;
`;

export const ScanCodeWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 12px;
  background-color: #f5f6f6;
  border-radius: 0.9rem;
  margin-top: 30px;
  justify-content: center;
  gap: 20px;
`;

export const ScanColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  img {
    width: 110px;
    margin-bottom: 10px !important;
  }

  span {
    font-size: 13px;
    width: 80%;
    font-weight: 500;
    color: #706967;

    strong {
      color: #252525;
    }
  }
`;

export const QrCode = styled.div`
  display: flex;
  background-color: #fff;
  width: 200px;
  height: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 4px;
  border-radius: 0.9rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  img {
    margin-bottom: 0px !important;
    width: 200px;
    height: 200px;
  }
`;

export const Value = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 auto;
  margin-top: 20px;

  p {
    margin-bottom: 8px !important;
  }

  h5 {
    color: var(--accent-color);
    font-weight: 700;
    font-size: 40px;
  }
`;
