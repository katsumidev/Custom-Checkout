import styled from "styled-components";

export const Container = styled.div`
  position: fixed;
  display: flex;
  align-items: center;
  bottom: 20px;
  right: 90px;
  width: fit-content;
  height: fit-content;
  z-index: 9999;
`;

export const Wrapper = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
`;

export const WrapperBody = styled.div`
  border-radius: 0.4rem;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: var(--tertiary-background);
  padding: 0.4rem 0.8rem;
  font-weight: 700;
  font-size: 13px;
  transition: all 0.2s;
  gap: 5px;

  display: flex;
  flex-direction: column;
  justify-content: center;

  p {
    padding-bottom: 30px;
  }
`;

export const WhatsappLogo = styled.div`
  position: absolute;
  bottom: -15px;
  right: 25px;
  max-width: 42px;
  max-height: 42px;
  width: 42px;
  height: 42px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: rgb(27, 215, 65);
  background: radial-gradient(
    circle,
    rgba(27, 215, 65, 1) 0%,
    rgba(31, 190, 63, 1) 51%
  );
  cursor: pointer;

  margin-left: 10px;
  font-weight: 700px;

  svg {
    color: #fff;
  }
`;

export const EmailLogo = styled.div`
  position: absolute;
  bottom: -10px;
  left: 15px;
  max-width: 32px;
  max-height: 32px;
  width: 42px;
  height: 42px;
  border-radius: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 2px 5px -1px,
    rgba(0, 0, 0, 0.3) 0px 1px 3px -1px;
  background: ${(props) => props.theme.accentColor};
  cursor: pointer;

  margin-left: 10px;
  font-weight: 700px;

  svg {
    color: #fff;
  }
`;

export const SupportRow = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.secundaryText} !important;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;

  svg {
    cursor: pointer;
  }
`;
