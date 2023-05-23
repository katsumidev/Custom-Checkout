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
  padding: 2rem 2rem;
  border-radius: 6px;
  animation: ${popIn} 0.3s ease-in-out forwards;

  display: flex;
  flex-direction: column;
  align-items: center;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  min-width: 400px;
  height: auto;
  text-align: center;
  gap: 30px;
  justify-content: space-between;

  div {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }

  h5 {
    font-weight: 700;
  }

  svg {
    font-size: 5rem;
    color: #4ccb7e;
    box-shadow: rgba(0, 0, 0, 0.15) 0px 5px 15px 0px;
    border-radius: 100%;
    transition: all 0.2s;
    animation: ${popIn} 0.3s ease-in-out forwards;
  }

  hr {
    margin: 0px;
  }
`;

export const CloseBtn = styled.div`
  display: flex;
  width: 70%;
  padding: 0.8rem;
  border-radius: 0.4rem;
  align-items: center;
  justify-content: center;
  background-color: var(--accent-color);
  color: #fff;
  font-weight: 700;
  cursor: pointer;
`;

export const LoadingBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #ccc;
  border-radius: 0.4rem;
`;

export const ProgressBar = styled.div`
  height: 100%;
  background-color: var(--accent-color);
  animation: progress 5s linear;
  animation-fill-mode: forwards;
  transform-origin: left;
  transform: scaleX(0);
  width: 100%;
  border-radius: 0.4rem;

  @keyframes progress {
    0% {
      transform: scaleX(1);
    }
    100% {
      transform: scaleX(0);
    }
  }
`;
