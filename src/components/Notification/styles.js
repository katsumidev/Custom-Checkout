import styled from "styled-components";

export const Wrapper = styled.div`
  display: inline-block;
  position: fixed;
  bottom: 40px;
  left: 30px;
  z-index: 1;
  width: auto;
  height: auto;
  border-radius: 0.4rem;
`;

export const Container = styled.div`
  display: flex;
  position: relative;
  flex-direction: row;
  justify-content: center;
  gap: 10px;
  max-width: 300px;
  width: fit-content;
  background-color: var(--main-background);
  color: ${(props) => props.theme.mainText};
  padding: 12px 12px;
  border-radius: 0.4rem;
  font-size: 13px;
  box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;
  border-left: 5px solid ${(props) => props.theme.accentColor};

  svg {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const Title = styled.div`
  font-weight: 700;
  display: flex;
  flex-direction: column;
  gap: 10px;

  p:nth-child(1) {
    font-weight: 800;
    font-size: 14px;
  }

  p:nth-child(2) {
    color: ${(props) => props.theme.secundaryText};
  }

  p {
    margin-bottom: 0px;
    font-weight: 600;
  }
`;
