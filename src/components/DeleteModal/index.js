import React from "react";
import {
  Container,
  ModalBox,
  Background,
  DeleteBtn,
  Buttons,
  CancelBtn,
} from "./styles";

function DeleteModal(props) {
  return (
    <Container>
      <ModalBox>
        <h4>Deletar Checkout</h4>
        <p>Tem certeza que deseja deletar esse checkout?</p>
        <Buttons>
          <CancelBtn onClick={props.closeModal}>Não</CancelBtn>
          <DeleteBtn onClick={() => props.deleteCheckout(props.id)}>
            Sim
          </DeleteBtn>
        </Buttons>
      </ModalBox>
      <Background onClick={props.closeModal} />
    </Container>
  );
}

export default DeleteModal;
