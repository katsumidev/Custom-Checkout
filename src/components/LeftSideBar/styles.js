import styled from "styled-components";

export const LeftWrapper = styled.div`
  width: 25%;
  overflow: hidden;
  border-radius: 0.4rem;
  margin: ${(props) => (props.isTimerOn ? "70px 0 0 0" : "20px 0 0 0")};
  background-color: ${(props) =>
    props.theme.productBackground
      ? props.theme.productBackground
      : "transparent"};

  @media (max-height: 600px), (max-width: 800px) {
    position: relative;
    height: auto;
    margin-top: 0px;
    margin-bottom: auto;

    box-shadow: none;
  }

  @media (max-width: 800px) {
    width: 90%;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  width: 100%;
  margin: 0 auto;
  overflow: auto;
  min-height: 100%;
  color: ${(props) => props.theme.productText};
  margin-bottom: 25px;

  h2 {
    font-size: 17px;
    font-weight: 700;

    @media (max-width: 600px) {
      font-size: 1.5rem;
    }
  }

  @media (max-width: 600px) {
    padding: 2rem 0px;
    width: 100%;
  }
`;

export const WrapperHeader = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  width: 100%;

  h1 {
    font-size: 1.2rem;
    font-weight: 700;
  }

  h2 {
    font-size: 1rem;
    font-weight: 500;
  }
`;

export const ProductDescription = styled.p`
  font-size: 0.9rem;
  font-weight: 300;
  color: ${(props) => props.theme.secundaryText};
  width: 100%;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 0 12px;
  width: 100%;
  align-items: center;
`;

export const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.tertiaryText};
  padding: 16px 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 700;
  gap: 15px;
  width: 100%;
  box-shadow: rgba(0, 0, 0, 0.1) 1px 1px 2.6px;
  align-items: center;

  .pfp {
    width: 62px;
    height: 62px;
    background-image: url("https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8cmFuZG9tJTIwcGVvcGxlfGVufDB8fDB8fA%3D%3D&w=1000&q=80");
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
    border-radius: 100%;
  }

  img {
    width: 50%;
  }

  @media (max-height: 750px) {
    gap: 8px;
    padding: 8px 0.8rem;
  }

  @media (max-width: 750px) {
    width: 90%;
  }

  .price {
    font-size: 0.8rem;
  }

  small {
    font-size: 0.7rem;
    color: ${(props) => props.theme.secundaryText};
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;

  span {
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

export const CupomInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  font-size: 13.5px;
  padding: 7px 0px 8px 0px;
  color: ${(props) => props.theme.productText};
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.productText};
  transition: all 0.2s;
  color: ${(props) => props.theme.productText};

  :focus-within {
    border-color: ${(props) => props.theme.accentColor};
  }

  :focus-within svg {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const FinishButton = styled.div`
  padding: 12px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: ${(props) => props.theme.accentColor};
  color: #fff;
  border-radius: 0.4rem;
  cursor: pointer;
  font-weight: 600;
  transition: all 0.2s;
  margin-top: 10px;
  width: 90%;
`;

export const ProductImage = styled.img`
  border-radius: var(--border-radius);
  height: 17em;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: transparent;
  border-radius: 0.4rem;
`;

export const SupportRow = styled.div`
  font-weight: 700;
  color: ${(props) => props.theme.secundaryText} !important;
  display: flex;
  flex-direction: column;
  align-self: flex-start;
  gap: 10px;

  div {
    color: ${(props) => props.theme.secundaryText};
    cursor: pointer;
    display: flex;
    flex-direction: row;
    align-self: flex-start;
    align-items: center;
    gap: 10px;
    margin-left: 2px;
  }
`;
