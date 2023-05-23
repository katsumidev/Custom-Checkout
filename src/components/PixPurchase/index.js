import React, { useState, useEffect } from "react";
import {
  Container,
  Header,
  LeftSide,
  RightSide,
  Wrapper,
  PurchaseCard,
  PaymentLink,
  PaymentWrapper,
  CopyLinkBtn,
  ScanCodeWrapper,
  ScanColumn,
  Value,
  Status,
  QrCode,
  Success,
} from "./styles";
import logo from "../../assets/logo.png";
import { IoCopyOutline } from "react-icons/io5";
import qrhand from "../../assets/qrhand.png";
import { AiFillCheckCircle, AiOutlineCheckCircle } from "react-icons/ai";
import billet_svg from "../../assets/billet_svg.svg";
import { useLocation, useParams } from "react-router";
import { BASE_URL } from "../../services/api";
import { getFriendlyStatus } from "../../utils/status";

function PixPurchase() {
  const params = useParams();
  const location = useLocation();
  const [currentStatus, setCurrentStatus] = useState("");

  const [isCopied, setIsCopied] = useState(false);

  const handleButtonClick = () => {
    setIsCopied(true);
    navigator.clipboard.writeText(location.state?.paymentLink);

    setTimeout(() => {
      setIsCopied(false);
    }, 3000);
  };

  useEffect(() => {
    const sse = new EventSource(`${BASE_URL}/sse/status/${location.state?.paymentId}`);
    sse.onmessage = (e) => checkWhetherStatusHasChanged(e.data);
    return () => {
      sse.close();
    };
  }, []);

  const checkWhetherStatusHasChanged = (data) => {
    let transaction = JSON.parse(data);
    console.log("dentro do onmessage");
    console.log(transaction.data);
    if (transaction.data.status !== currentStatus) {
      setCurrentStatus(transaction.data.status);
    }
  }

  return (
    <Container>
      <Wrapper>
        <LeftSide>
          <PurchaseCard>
            <img className="logo" src={logo} />
            {/* <small className="description">
          Para continuar com sua compra acesse o aplicativo do seu banco e
          escaneie o qrcode ou pague com o link abaixo!
  </small> */}
            <br />

            {currentStatus == "RECEIVED" ? (
              <Success>
                <AiFillCheckCircle size={80} />
                <h5>Pagamento bem sucedido</h5>
                <small>
                  O seu pagamento de R$ {location.state?.price} foi processado
                  com sucesso pela Moon Coded.
                </small>
              </Success>
            ) : (
              <>
                {location.state?.type == "card" ? (
                  <Success>
                    <AiFillCheckCircle size={80} />
                    <h5>Pagamento bem sucedido</h5>
                    <small>
                      O seu pagamento de R$ {location.state?.price} foi
                      processado com sucesso pela Moon Coded.
                      <div className="divider" />
                      <ul>
                        <li>
                          <strong>Total a pagar: </strong>
                          <span>
                            R$ {parseFloat(location.state?.price).toFixed(2)}
                          </span>
                        </li>
                        <li>
                          <strong>Final do cartão: </strong>
                          <span>{location.state?.cardLastDigits}</span>
                        </li>
                      </ul>
                    </small>
                  </Success>
                ) : (
                  <>
                    <h5>Pague rapidamente utilizando PIX</h5>
                    <Value>
                      <p>
                        {currentStatus == "RECEIVED"
                          ? "Valor pago:"
                          : "Valor a pagar:"}
                      </p>
                      <h5>R$ {location.state?.price}</h5>
                    </Value>
                    <PaymentWrapper>
                      <PaymentLink
                        value={location.state?.paymentLink}
                        readOnly={true}
                      />
                      <small>
                        Copie o código para pagamento usando pix Copia e Cola.
                      </small>
                      <CopyLinkBtn
                        className={isCopied ? "copied" : ""}
                        onClick={handleButtonClick}
                      >
                        {isCopied ? (
                          <AiOutlineCheckCircle />
                        ) : (
                          <IoCopyOutline />
                        )}

                        <strong>
                          {!isCopied ? "Copiar Link" : "Copiado com sucesso!"}
                        </strong>
                      </CopyLinkBtn>
                    </PaymentWrapper>

                    <ScanCodeWrapper>
                      <ScanColumn>
                        <img src={qrhand} />
                        <span>
                          Escaneie o{" "}
                          <strong>código QR com a camera do seu celular</strong>
                        </span>
                      </ScanColumn>
                      <QrCode>
                        <img
                          src={`data:image/png;base64,${location.state?.qrUrl}`}
                        />
                      </QrCode>
                    </ScanCodeWrapper>

                    <small className="footer">
                      A sua segurança está 100% garantida!
                    </small>
                  </>
                )}
              </>
            )}
          </PurchaseCard>
        </LeftSide>
        <RightSide>
          <img src={billet_svg} />
        </RightSide>
      </Wrapper>
    </Container>
  );
}

export default PixPurchase;
