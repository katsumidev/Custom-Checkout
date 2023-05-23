import styled from "styled-components";

export const Container = styled.div`
  background-color: var(--secundary-background);
  border: 2px dashed #000;
  padding: 12px;
  height: ${(props) => (props.isMobile ? "fit-content" : "220px")};
  width: ${(props) => (props.isMobile ? "200px" : "150px")};
  border-radius: 0.4rem;
`;

export const MiniProduct = styled.div`
  width: 90%;
  margin: 5px auto;
  background-color: grey;
  padding: 0.6rem;
  border-radius: 0.4rem;
`;

export const MiniRow = styled.div`
  width: 70%;
  height: 5px;
  background-color: grey;
`;

export const MiniCarousel = styled.div`
  width: 100%;
  height: 80px;
  border-radius: 0.4rem;
  background-color: grey;
  padding: 6px;
  display: flex;
  flex-direction: row;
  color: #fff;
  align-items: center;
  justify-content: space-between;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 10px;
  height: 100%;

  .footer {
    width: 100%;
    margin: 0 auto;
  }

  .mini-banner {
    background-color: grey;
    width: 100%;
    padding: 0.3rem;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: 700;
    border-radius: 0.4rem;
  }

  .mini-title {
    background-color: grey;
    width: 40%;
    padding: 2px;
    align-self: flex-start;
    border-radius: 0.4rem;
  }

  .mini-inputs-row {
    display: flex;
    flex-direction: row;
    gap: 5px;
    padding: 5px;
    width: 100%;
    border-radius: 0.4rem;

    .mini-inputs {
      background-color: grey;
      width: 100%;
      padding: 5px;
      border-radius: 0.4rem;
    }
  }

  .mini-buy-btn {
    background-color: grey;
    padding: 3px;
    width: 100%;
    border-radius: 5px;
    color: #fff;
    font-size: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .side-banner {
    height: 100%;
    width: 100%;
    background-color: grey;
    display: flex;
    align-items: center;
    justify-content: center;
    color: #fff;
    font-weight: 700;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  font-weight: 700;

  .dragsInfo {
    font-size: 13px;
  }
`;
