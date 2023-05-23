import styled, { keyframes } from "styled-components";

const popIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

export const Container = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 9999;

  .description {
    width: 60%;
  }

  .copied {
  }

  .sub-titles {
    font-weight: 700;
    color: var(--secundary-text);
  }
`;

export const Background = styled.div`
  position: fixed;
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  height: 100vh;
  width: 100vw;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: -1;
`;

export const ModalBox = styled.div`
  background-color: var(--main-background);
  padding: 1.5rem 2rem;
  border-radius: 6px;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
  max-width: 550px;
  overflow-y: auto;
  overflow-x: hidden;
  text-align: center;
  animation: ${popIn} 0.3s ease-in-out forwards;

  .footer {
    margin-top: 30px;
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

  ::-webkit-scrollbar {
    width: 5px;
  }

  /* Track */
  ::-webkit-scrollbar-track {
    background: #f1f1f1;
    border-radius: 0.4rem;
  }

  /* Handle */
  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  /* Handle on hover */
  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }

  .warning {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
    font-size: 11px;
    width: 97%;
    color: var(--secundary-text);
    margin-bottom: 10px;
  }

  .colorOptions {
    background-color: var(--secundary-background);
    padding: 0.8rem;
    border-radius: 0.4rem;
    box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  }
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
  margin-top: 60px;
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
