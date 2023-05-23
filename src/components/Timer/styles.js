import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  background-color: ${(props) => props.theme.accentColor};
  padding: 12px;
  color: #000;
  z-index: 999;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 10px;
  width: 100%;
  top: 0;
  color: #fff;
  height: 50px;

  svg {
    font-size: 24px;
  }

  font-size: 17px;

  h2 {
    font-size: 19px;
    margin-bottom: 0px;
  }
`;
