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
  z-index: 2;
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
  gap: 15px;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${popIn} 0.2s ease-in-out forwards;

  hr {
    margin: 0px;
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

export const DeleteBtn = styled.div`
  padding: 12px;
  font-size: 13px;
  border-radius: 0.4rem;
  color: #fff;
  font-weight: 700;
  cursor: pointer;
  width: 80px;
  text-align: center;
  background-color: var(--accent-color);
`;

export const Buttons = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin-top: 20px;
  margin-right: 0px;
  margin-left: auto;
`;

export const CancelBtn = styled.div`
  padding: 12px;
  font-size: 13px;
  border-radius: 0.4rem;
  background-color: #c0c0c0;
  color: #000;
  font-weight: 700;
  cursor: pointer;
  width: 80px;
  text-align: center;
`;
