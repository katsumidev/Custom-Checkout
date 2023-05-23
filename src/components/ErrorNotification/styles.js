import styled from "styled-components";

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  z-index: 9999;
  max-width: 500px;
  min-width: 300px;
`;

export const Container = styled.div`
  position: absolute;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  width: fit-content;
  background-color: #ee4266;
  top: 35px;
  right: 20px;
  color: #fff;
  padding: 16px 22px;
  border-radius: 12px;
  box-shadow: rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
`;
