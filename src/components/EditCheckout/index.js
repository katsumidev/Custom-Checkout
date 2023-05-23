import React, { useState, useEffect } from "react";
import {
  Container,
  CheckoutLabel,
  CreateBtn,
  CheckoutList,
  CheckoutRow,
  Actions,
  RowHeader,
  Type,
  Name,
  Visits,
  Conclusions,
  Conversion,
  TableActions,
} from "./styles";
import { RiArrowDropDownLine } from "react-icons/ri";
import { BsPlus } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import { FaTrash } from "react-icons/fa";
import EditModal from "../EditModal";
import { useNavigate } from "react-router";
import DeleteModal from "../DeleteModal";
import SuccessModal from "../SuccessModal";

function EditCheckout() {
  const [modalStatus, setModalStatus] = useState({
    editing: false,
    creating: false,
    deleting: false,
    success: false,
  });
  const [currentId, setCurrentId] = useState("");
  const [deleteModal, setDeleteModal] = useState("");
  const [checkoutArray, setCheckoutArray] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const currentCheckoutArray = JSON.parse(
      localStorage.getItem("checkoutArray") || "[]"
    );

    setCheckoutArray(currentCheckoutArray);
  }, []);

  const handleOpenCheckoutEdit = (id) => {
    setCurrentId(id);
    setModalStatus({ editing: !modalStatus.editing });
  };

  const handleDeleteCheckout = (id) => {
    const currentCheckoutArray = JSON.parse(
      localStorage.getItem("checkoutArray") || "[]"
    );

    const newArray = currentCheckoutArray.filter(
      (checkout) => checkout.id !== id
    );

    localStorage.setItem("checkoutArray", JSON.stringify(newArray));
    setCheckoutArray(newArray);
    setDeleteModal(0);
  };

  const handleToState = (checkout) => {
    setCheckoutArray(checkout);
    setModalStatus({ creating: false, success: true });
  };

  return (
    <Container>
      {modalStatus.editing && (
        <EditModal
          id={currentId}
          closeModal={() => setModalStatus({ editing: !modalStatus.editing })}
        />
      )}
      {modalStatus.creating && (
        <EditModal
          create={handleToState}
          id="new"
          closeModal={() => setModalStatus({ creating: !modalStatus.creating })}
        />
      )}
      {modalStatus.success && (
        <SuccessModal
          message="Checkout criado com sucesso!"
          closeModal={() => setModalStatus({ success: !modalStatus.success })}
        />
      )}
      {deleteModal > 0 && (
        <DeleteModal
          closeModal={() => setDeleteModal(0)}
          id={deleteModal}
          deleteCheckout={handleDeleteCheckout}
        />
      )}
      <CheckoutLabel>
        <RiArrowDropDownLine size={30} />
        Checkout
        <CreateBtn
          onClick={() => setModalStatus({ creating: !modalStatus.creating })}
        >
          <BsPlus size={20} />
          Criar Checkout
        </CreateBtn>
      </CheckoutLabel>
      <CheckoutList>
        <RowHeader>
          <Type>Tipo de checkout</Type>
          <Name>Nome</Name>
          <Visits>Visitas</Visits>
          <Conclusions>Conclusões</Conclusions>
          <Conversion>Taxa de conversão</Conversion>
          <TableActions>Ações</TableActions>
        </RowHeader>
        {checkoutArray.map((checkout, index) => {
          return (
            <CheckoutRow key={index}>
              <Type>
                {checkout.type == "default" ? "Padrão" : "Personalizado"}
              </Type>
              <Name onClick={() => navigate(`/${checkout.id}`)}>
                {checkout.name}
              </Name>
              <Visits>{checkout.visits}</Visits>
              <Conclusions>{checkout.conclusions}</Conclusions>
              <Conversion>{checkout.conversionTax}%</Conversion>
              <Actions>
                <AiFillEdit
                  onClick={() => handleOpenCheckoutEdit(checkout.id)}
                  size={20}
                />
                <FaTrash onClick={() => setDeleteModal(checkout.id)} />
              </Actions>
            </CheckoutRow>
          );
        })}
      </CheckoutList>
    </Container>
  );
}

export default EditCheckout;
