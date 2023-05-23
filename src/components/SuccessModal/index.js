import React, { useEffect, useState } from "react";
import {
  Background,
  Container,
  ModalBox,
  CloseBtn,
  LoadingBar,
  ProgressBar,
} from "./styles";
import { BsCheckCircleFill } from "react-icons/bs";

function SuccessModal(props) {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
      props.closeModal();
    }, 5000);
  }, []);

  return (
    <Container>
      <ModalBox>
        <BsCheckCircleFill />
        <h5>{props.message}</h5>
        <CloseBtn onClick={() => props.closeModal()}>Ok!</CloseBtn>
        {loading ? (
          <LoadingBar>
            <ProgressBar />
          </LoadingBar>
        ) : null}
      </ModalBox>
      <Background onClick={() => props.closeModal()} />
    </Container>
  );
}

export default SuccessModal;
