import React, { useEffect, useState } from "react";
import {
  Container,
  Header,
  LeftSide,
  PurchaseCard,
  RightSide,
  PaymentLink,
  PaymentWrapper,
  CopyLinkBtn,
  Wrapper,
  Row,
  Footer,
} from "./styles";
import billet_svg from "../../assets/billet_svg.svg";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import { IoCopyOutline } from "react-icons/io5";
import { useLocation, useNavigate, useParams } from "react-router";
import { BASE_URL, getBilletCode } from "../../services/api";
import logo from "../../assets/logo.png";
import { BsFillPrinterFill } from "react-icons/bs";

function BilletPurchase() {
  const params = useParams();
  const navigate = useNavigate();
  const [barCode, setBarCode] = useState("");
  const [isCopied, setIsCopied] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const getBillet = async () => {
      let data = await getBilletCode(params.transactionId);
      setBarCode(data.identificationField);
    };

    getBillet();
  }, []);

  const handleButtonClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(barCode);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Container>
      <Header>
        <img src={logo} />
      </Header>
      <Wrapper>
        <LeftSide>
          <PurchaseCard>
            <AiFillCheckCircle />
            <h4>Pedido realizado com sucesso!</h4>
            <small>Código do pedido: {location.state?.friendly_id}</small>
            <div className="divider" />
            <ul>
              <li>
                <strong>Valor inicial:</strong>
                <span>R$ {parseFloat(location.state?.price).toFixed(2)}</span>
              </li>
              <li>
                <strong>Frete:</strong>
                <span>R$ 00,00</span>
              </li>
              <li>
                <strong>Taxa de parcelamento:</strong>
                <span>R$ 00.00</span>{" "}
              </li>
              <li>
                <strong>Desconto:</strong>
                <span>R$ 0.00</span>{" "}
              </li>
              <li>
                <strong>Total a pagar: </strong>{" "}
                <span>R$ {parseFloat(location.state?.price).toFixed(2)}</span>
              </li>
            </ul>
            <div className="divider" />
            <small style={{ marginBottom: "20px" }}>Código do boleto:</small>
            <PaymentWrapper>
              <PaymentLink value={barCode || ""} readOnly={true} />
              <Row>
                <CopyLinkBtn
                  className={isCopied ? "copied" : ""}
                  onClick={handleButtonClick}
                >
                  {isCopied ? <AiOutlineCheckCircle /> : <IoCopyOutline />}

                  <strong>{!isCopied ? "Copiar" : "Copiado!"}</strong>
                </CopyLinkBtn>
                <CopyLinkBtn
                  className={isCopied ? "copied" : ""}
                  onClick={() =>
                    window.open(
                      `https://www.asaas.com/b/pdf/${params.pdfUrl}`,
                      "_blank"
                    )
                  }
                >
                  <BsFillPrinterFill />

                  <strong>Imprimir boleto</strong>
                </CopyLinkBtn>
              </Row>
            </PaymentWrapper>
          </PurchaseCard>
        </LeftSide>
        <RightSide>
          <img src={billet_svg} />
        </RightSide>
      </Wrapper>
      <Footer></Footer>
    </Container>
  );
}

export default BilletPurchase;
