import React, { useState } from "react";
import {
  Container,
  Background,
  ModalBox,
  PaymentLink,
  PaymentWrapper,
  CopyLinkBtn,
  ScanCodeWrapper,
  ScanColumn,
  QrCode,
  Value,
} from "./styles";
import logo from "../../assets/logo.png";
import { IoCopyOutline } from "react-icons/io5";
import qrhand from "../../assets/qrhand.png";
import { AiOutlineCheckCircle } from "react-icons/ai";

function PixModal(props) {
  const [isCopied, setIsCopied] = useState(false);

  const handleButtonClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(props.link);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  return (
    <Container>
      <Background onClick={() => props.closeModal()} />
      <ModalBox>
        <img className="logo" src={logo} />
        <h5>Pague rapidamente utilizando PIX</h5>
        {/* <small className="description">
          Para continuar com sua compra acesse o aplicativo do seu banco e
          escaneie o qrcode ou pague com o link abaixo!
        </small> */}

        <Value>
          <p>Valor a pagar:</p>
          <h5>R$ {props.price}</h5>
        </Value>

        <br />

        <PaymentWrapper>
          <PaymentLink value={props.link} readOnly={true} />
          <small>Copie o código para pagamento usando pix Copia e Cola.</small>
          <CopyLinkBtn
            className={isCopied ? "copied" : ""}
            onClick={handleButtonClick}
          >
            {isCopied ? <AiOutlineCheckCircle /> : <IoCopyOutline />}

            <strong>
              {!isCopied ? "Copiar Link" : "Copiado com sucesso!"}
            </strong>
          </CopyLinkBtn>
        </PaymentWrapper>

        <ScanCodeWrapper>
          <ScanColumn>
            <img src={qrhand} />
            <span>
              Escaneie o <strong>código QR com a camera do seu celular</strong>
            </span>
          </ScanColumn>
          <QrCode>
            <img src={`data:image/png;base64,${props.qrUrl}`} />
          </QrCode>
        </ScanCodeWrapper>

        <small className="footer">A sua segurança está 100% garantida!</small>
      </ModalBox>
    </Container>
  );
}

export default PixModal;
