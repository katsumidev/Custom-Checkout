import styled from "styled-components";

export const Container = styled.div``;

export const CheckoutLabel = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 8px;
  margin: 20px;
  background-color: var(--secundary-background);
  box-shadow: rgba(0, 0, 0, 0.02) 0px 1px 3px 0px,
    rgba(27, 31, 35, 0.15) 0px 0px 0px 1px;
  border-radius: 0.4rem;
  font-weight: 700;
`;

export const CreateBtn = styled.div`
  background-color: var(--accent-color);
  padding: 6px;
  width: fit-content;
  color: #fff;
  font-size: 13px;
  border-radius: 0.4rem;
  margin-left: auto;
  margin-right: 0px;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 10px;
  cursor: pointer;

  svg {
    background-color: #fff;
    border-radius: 100%;
    color: var(--accent-color);
    margin: 0 auto;
  }
`;
export const CheckoutList = styled.div`
  width: 95%;
  margin: 0 auto;
`;

export const CheckoutRow = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  width: 100%;
  padding: 1rem;
  font-size: 13px;
  border-radius: 0.4rem;

  &:nth-child(even) {
    background-color: #f2f2f2;
  }
`;

export const Actions = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;

  svg {
    cursor: pointer;

    :hover {
      color: var(--accent-color);
    }
  }
`;

export const RowHeader = styled.div`
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  font-weight: bold;
  width: 100%;
  margin-bottom: 10px;
  font-size: 13px;
`;

export const Type = styled.p`
  grid-column: 1;
`;

export const Name = styled.p`
  grid-column: 2;
  cursor: pointer;
  font-weight: 700;
`;

export const Visits = styled.p`
  grid-column: 3;
  text-align: center;
`;

export const Conclusions = styled.p`
  grid-column: 4;
  text-align: center;
`;

export const Conversion = styled.p`
  grid-column: 5;
  text-align: center;
`;

export const TableActions = styled.p`
  grid-column: 6;
  text-align: center;
`;
