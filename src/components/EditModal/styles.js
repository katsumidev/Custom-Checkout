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
  gap: 15px;
  max-height: 90%;
  overflow-y: auto;
  overflow-x: hidden;
  animation: ${popIn} 0.3s ease-in-out forwards;

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

export const Row = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  font-size: 14px;
  font-weight: 600;
`;

export const FormInput = styled.input`
  border: none;
  width: 100%;
  outline: none;
  border-radius: var(--border-radius);
  transition: all 0.2s;
  font-size: 13.5px;
  font-weight: 600;
  position: relative;
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0rem 0.5rem;
  transition: all 0.2s;
  border-radius: 0.4rem;
  position: relative;

  :hover {
    border-color: rgba(0, 0, 0, 0.3);
  }

  input {
    font-size: 13.5px;
    height: 100%;
    background-color: transparent;
    color: #000;
    transition: 0.15s all ease;
    padding: 0.7rem 0;
  }

  :focus-within {
    border-color: var(--accent-color);
  }

  input::placeholder {
    color: transparent;
  }

  .form-label {
    position: absolute;
    font-size: 13px;
    padding: 0 10px;
    color: var(--secundary-text);
    pointer-events: none;
    transition: 0.15s all ease;
    margin-bottom: 0px;
  }

  input:focus + .form-label,
  input:not(:placeholder-shown) + .form-label {
    transform: translate(5px, -22px);
    background-color: #fff;
    font-size: 13px;
    font-weight: 600;
  }

  input:focus + .form-label {
    color: var(--accent-color);
  }

  svg {
    color: var(--secundary-text);
  }

  .form-input {
    border: none;
    width: 100%;
    outline: none;
    transition: all 0.2s;
    font-size: 13.5px;
    height: 100%;
    font-weight: 600;
    color: #000;
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 30px;
  margin: 10px 0;
  flex-wrap: wrap;
  max-width: 500px;
`;

export const OptionColumn = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  gap: 5px;

  .left {
    right: 15px;
  }

  small {
    font-size: 12.5px;
    color: var(--secundary-text);
    font-weight: 600;
  }
`;

export const ColorPickerBtn = styled.div`
  width: 50px;
  padding: 6px;
  height: 20px;
  border-radius: 0.4rem;
  background-color: ${(props) => props.backgroundColorValue};
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const Popover = styled.div`
  position: absolute;
  top: 50px;
  z-index: 999;
`;

export const Cover = styled.div`
  position: fixed;
  top: 0px;
  right: 0px;
  bottom: 0px;
  left: 0px;
`;

export const EditLayoutBtn = styled.div`
  font-weight: 700;
  padding: 0.7rem 0.3rem;
  width: fit-content;
  margin-left: 0px;
  margin-right: auto;
  cursor: pointer;
  position: relative;

  display: flex;
  flex-direction: row;
  gap: 10px;

  :after {
    content: "";
    position: absolute;
    bottom: 0;
    left: 0;
    height: 3px;
    width: 0%;
    border-radius: 20px;
    background-color: var(--main-text);
    transition: all 0.4s;
  }

  :hover:after {
    width: 100%;
  }

  svg {
    font-size: 20px;
    animation-name: arrow;
    animation-duration: 0.8s;
    animation-iteration-count: infinite;
    animation-play-state: paused;
  }

  @keyframes arrow {
    0% {
      transform: translateX(0px);
    }
    50% {
      transform: translateX(1.5px);
    }
    100% {
      transform: translateX(0px);
    }
  }

  :hover svg {
    animation-play-state: running;
  }

  div {
    position: relative;
  }

  div::before,
  div::after {
    box-sizing: inherit;
    content: "";
    position: absolute;
    width: 25px;
    height: 25px;
  }

  .spin {
    height: 20px;
    width: 20px;
  }

  .spin::before,
  .spin::after {
    top: 0px;
    left: -2px;
  }

  .spin::before {
    border: 2px solid transparent;
  }

  :hover .spin::before {
    border-top-color: var(--main-text);
    border-right-color: var(--main-text);
    border-bottom-color: var(--main-text);
    transition: border-top-color 0.15s linear,
      border-right-color 0.15s linear 0.1s,
      border-bottom-color 0.15s linear 0.2s;
  }

  .spin::after {
    border: 0 solid transparent;
  }

  :hover .spin::after {
    border-top: 2px solid var(--main-text);
    border-left-width: 2px;
    border-right-width: 2px;
    transform: rotate(270deg);
    transition: transform 0.4s linear 0s, border-left-width 0s linear 0.35s,
      -webkit-transform 0.4s linear 0s;
  }

  .circle {
    border-radius: 100%;
    box-shadow: none;
  }

  .circle::before,
  .circle::after {
    border-radius: 100%;
  }
`;

export const TopBarDroppable = styled.div`
  width: 400px;
  background-color: var(--secundary-background);
  border: 1px dashed #000;
  padding: 16px;
  height: 80px;
  border-radius: 0.4rem;
`;

export const DraggableBanner = styled.img`
  width: 350px;
  height: 60px;
  border-radius: 0.4rem;
`;

export const LayoutDrag = styled.div`
  display: flex;
  flex-direction: row;
  gap: 15px;
`;

export const DragFiles = styled.div`
  background-color: var(--tertiary-background);
  padding: 1rem;
  border-radius: 0.4rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border: 2px dashed var(--secundary-text);
  color: var(--secundary-text);
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  width: 100%;
  transition: 0.2s;

  :hover {
    border-color: var(--accent-color);
    color: var(--accent-color);
  }

  p {
    font-weight: 700;
    text-align: center;
  }
`;

export const ModalHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

export const SaveBtn = styled.div`
  background-color: var(--accent-color);
  padding: 0.7rem 1rem;
  color: #fff;
  border-radius: 0.4rem;
  font-size: 14px;
  cursor: pointer;
  font-weight: 700;
  width: fit-content;
  margin-left: auto;
  margin-right: 0px;
`;

export const Banner = styled.img`
  width: 100px;
  height: auto;
`;

export const NotificationContainer = styled.div`
  padding: 12px;
  width: 60%;
  background-color: var(--main-background);
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  border-radius: 0.4rem;
  border-left: 5px solid ${(props) => props.accentColor};
  display: flex;
  flex-direction: column;
  gap: 10px;

  h6 {
    font-size: 14px;
    font-weight: 700;
    margin-bottom: 0px;
  }

  svg {
    color: ${(props) => props.accentColor};
  }

  span {
    display: flex;
    flex-direction: row;
    gap: 10px;
    align-items: center;
    transition: all 0.2s;
    width: fit-content;

    svg {
      opacity: 0;
      cursor: pointer;
    }

    p {
      font-size: 13px;
    }

    :hover {
      background-color: var(--tertiary-background);
      padding: 4px;
      border-radius: 0.4rem;

      svg {
        opacity: 1;
      }
    }
  }
`;

export const CustomHiddenInput = styled.div`
  display: flex;
  flex-direction: row;
  gap: 7px;
  border-bottom: 1px solid #000;
  width: fit-content;

  svg {
    cursor: pointer;
  }

  input {
    border: none;
    outline: none;
  }
`;

export const Dropdown = styled.div`
  width: 100%;
  padding: 8px;
  border-radius: 0.4rem;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-weight: 600;
  cursor: pointer;

  svg {
    font-size: 12px;
    margin-bottom: 10px;
    margin-left: 5px;
  }
`;

export const LayoutDragMobile = styled.div`
  width: fit-content;
`;

export const MobileEdit = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  gap: 20px;
`;

export const DropzonesWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: 20px;
`;
