import React, { useState, useEffect, useRef, useCallback } from "react";
import {
  Container,
  LeftWrapper,
  RightWrapper,
  WrapperHeader,
  ProductImage,
  ProductDescription,
  ProductDetails,
  DetailCard,
  FirstRow,
  CupomInput,
  DeliveryForm,
  FormInput,
  InputWrapper,
  Input,
  InputsRow,
  Wrapper,
  FinishButton,
  Banner,
  SideBanner,
  RowDelivery,
  PaymentCard,
  PaymentCompanies,
  FinishPaymentFooter,
} from "./styles";
import Notification from "../Notification";
import elo from "../../assets/elo.svg";
import mastercard from "../../assets/mastercard.svg";
import pix from "../../assets/pix.svg";
import hipercard from "../../assets/hipercard-v2.svg";
import diners from "../../assets/diners.svg";
import visa from "../../assets/visa.svg";
import {
  AiOutlineUser,
  AiOutlinePhone,
  AiFillLock,
  AiOutlineHome,
} from "react-icons/ai";
import { MdEmail, MdOutlineMapsHomeWork } from "react-icons/md";
import { FiArrowRight } from "react-icons/fi";
import InputMask from "react-input-mask";
import { Carousel } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "react-datepicker/dist/react-datepicker.css";
import creditCard from "../../assets/creditcard.png";
import barCode from "../../assets/barcode.svg";
import pixPay from "../../assets/pix.png";
import LeftSideBar from "../LeftSideBar";
import Timer from "../Timer";
import { useNavigate, useParams } from "react-router";
import Select from "react-select";
import { BsCheckCircleFill, BsTicketPerforated } from "react-icons/bs";
import { ThemeProvider } from "styled-components";
import SupportNotification from "../SupportNotification";
import axios from "axios";
import {
  createCostumer,
  generateTransaction,
  getBillet,
  getCheckout,
  getInstallments,
  getPixQrCode,
  getProduct,
  captureCardPayment,
  getAllPixels,
} from "../../services/api";
import loading_gif from "../../assets/loading.gif";
import PixModal from "../PixModal";
import { purchaseEvent } from "../../services/fbPixelEvent";
import { GoogleReCaptcha, useGoogleReCaptcha } from "react-google-recaptcha-v3";
import ErrorNotification from "../ErrorNotification";
import ReactLoading from "react-loading";

function DeliveryDetails(props) {
  const [cep, setCEP] = useState("");
  const [currentId, setCurrentId] = useState("");
  const [cepData, setCepData] = useState({});
  const [paymentModal, setPaymentModal] = useState({ pix: false });
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [size, setWindowSize] = useState({ width: 0, height: 0 });
  const inputRef = useRef(null);
  const [showNotification, setShowNotification] = useState(false);
  const [costumerData, setCostumerData] = useState({});
  const [parcel, setParcel] = useState();
  const [value, setValue] = useState(200);
  const [loading, setLoading] = useState(false);
  const [parcelOptions, setParcelOptions] = useState([]);
  const [cardData, setCardData] = useState({});
  const [isCardSame, setIsCardSame] = useState(false);
  const [errorMessage, setErrorMessage] = useState({
    isOpen: false,
    message: "",
  });
  const { executeRecaptcha } = useGoogleReCaptcha();

  const handleParcelChange = (selectedOption) => {
    setParcel(selectedOption);
  };

  const navigate = useNavigate();

  useEffect(() => {
    const getInstallmentsOptions = async () => {
      let parcels = [];
      let data = await getInstallments(
        props.checkoutData.product_price,
        props.productData.max_installments
      );

      data.map((parcel, index) => {
        parcels.push({
          value: index,
          label: parcel.text,
        });

        if (index === data.length - 1) {
          setParcel({
            value: index,
            label: parcel.text,
          }); // save the index of the last installment
        }
      });

      setParcelOptions(parcels);
    };

    getInstallmentsOptions();
  }, []);

  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({ width: width, height: height });
  };

  const responsive = {
    isDesktop: size.width > 1080 && size.height > 800,
    isLaptop: size.height < 800,
    isMobile: size.width < 600,
  };

  // informação a partir do cep
  const getCepData = () => {
    const currentCep = cep.replace(/\D/g, "");

    fetch(`https://viacep.com.br/ws/${currentCep}/json/`)
      .then((res) => res.json())
      .then((data) => {
        setCepData(data);
      });
  };

  useEffect(() => {
    if (cep) {
      let formatedCep = cep.replace(/\D/g, "");

      if (formatedCep.length === 8) {
        getCepData();
      }

      if (formatedCep.length !== 8) {
        setCepData({
          localidade: "",
          logradouro: "",
          uf: "",
          bairro: "",
        });
      }
    }
  }, [cep]);

  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true);
    }, 13000);

    return () => clearInterval(interval);
  }, []);

  const handleCaptcha = useCallback(() => {
    if (!executeRecaptcha) {
      console.log("Execute recaptcha not yet available");
      return;
    }
    executeRecaptcha("enquiryFormSubmit")
      .then((gReCaptchaToken) => {
        handleFinishBuy(gReCaptchaToken);
      })
      .catch(() => {
        setErrorMessage({
          isOpen: true,
          message:
            "Ocorreu um erro ao processar sua transação, tente novamente mais tarde.",
        });
      });
  }, [executeRecaptcha]);

  const handleFinishBuy = async () => {
    setLoading(true);

    if (verifyEmpty() && paymentMethod !== "") {
      switch (paymentMethod) {
        case "card":
          navigate(`pix`, {
            state: {
              price: props.checkoutData.product_price,
              cardLastDigits: "4425",
              friendly_id: "COS-484274",
              type: "card",
            },
          });
          break;
        case "billet":
          navigate(`billet/COS-484274/74892677486274`, {
            state: {
              price: props.checkoutData.product_price,
              friendly_id: "COS-484274",
            },
          });
          break;
        case "pix":
          navigate(`pix`, {
            state: {
              price: props.checkoutData.product_price,
              paymentLink:
                "HFH442H42IU4IJBHBJKNJKK5NJN5JK3N5KJ3N5K3JNJK5GYU5G3UY",
              paymentId: "42",
              qrUrl:
                "https://upload.wikimedia.org/wikipedia/commons/thumb/f/fa/Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg/800px-Link_pra_pagina_principal_da_Wikipedia-PT_em_codigo_QR_b.svg.png",
              type: "pix",
            },
          });
          break;
      }

      //   let data = await createCostumer({
      //     name: costumerData.name,
      //     email: costumerData.email,
      //     cpfCnpj: currentId.replace(/\D/g, ""),
      //   });

      //   if (!data) {
      //     setErrorMessage({
      //       isOpen: true,
      //       message: "Erro ao processar dados do comprador",
      //     });
      //     setLoading(false);
      //     return;
      //   }

      //   let requestObject = {
      //     product_id: props.checkoutData.product_id,
      //     account_id: props.checkoutData.account_id,
      //     product_plan_id: 1,
      //     customer: {
      //       name: costumerData.name,
      //       email: costumerData.email,
      //       asaas_customer_id: data?.id,
      //       address: {
      //         city: cepData.localidade,
      //         state: cepData.uf,
      //         number: costumerData.number,
      //         street: cepData.logradouro,
      //         postCode: cep.replace(/\D/g, ""),
      //       },
      //       document: currentId.replace(/\D/g, ""),
      //       cellphone: costumerData.cellphone,
      //     },
      //     card_type: null,
      //     card_last_4_digits: null,
      //     installments: 1,
      //     total_to_pay: parseFloat(props.checkoutData.price),
      //     due_date: "2023-04-30",
      //     payment_id: "",
      //     type:
      //       (paymentMethod === "billet" && "boleto") ||
      //       (paymentMethod === "pix" && "pix") ||
      //       (paymentMethod === "card" && "card"),
      //   };

      //   if (paymentMethod === "billet") {
      //     await generateTransaction(requestObject)
      //       .then(async (response) => {
      //         let transactionData = response[0];

      //         let billetData = await getBillet({
      //           customer_id: data.id,
      //           externalReference: transactionData.id,
      //           description: props.checkoutData.name,
      //           amount: props.checkoutData.price,
      //         });

      //         if (billetData) {
      //           purchaseEvent(
      //             parseFloat(props.checkoutData.price),
      //             "Boleto Bancário"
      //           );

      //           if (props.checkoutData.have_custom_page) {
      //             window.location = props.checkoutData.custom_page_link;
      //           } else {
      //             navigate(
      //               `billet/${billetData.id}/${billetData.bankSlipUrl
      //                 .split("/")
      //                 .pop()}`,
      //               {
      //                 state: {
      //                   price: props.checkoutData.price,
      //                   friendly_id: transactionData.friendly_id,
      //                 },
      //               }
      //             );
      //           }
      //         } else {
      //           setErrorMessage({
      //             isOpen: true,
      //             message:
      //               "Ocorreu um erro ao processar sua transação, tente novamente mais tarde.",
      //           });
      //           setLoading(false);
      //         }
      //       })
      //       .catch((error) => {
      //         return;
      //       });
      //   } else if (paymentMethod === "pix") {
      //     await generateTransaction(requestObject)
      //       .then(async (response) => {
      //         let transactionData = response[0];

      //         let pixData = await getPixQrCode({
      //           customer_id: data.id,
      //           externalReference: transactionData.id,
      //           description: props.checkoutData.name,
      //           amount: props.checkoutData.price,
      //         });

      //         if (pixData) {
      //           purchaseEvent(parseFloat(props.checkoutData.price), "PIX");

      //           if (props.checkoutData.have_custom_page) {
      //             window.location = props.checkoutData.custom_page_link;
      //           } else {
      //             navigate(`pix`, {
      //               state: {
      //                 price: props.checkoutData.price,
      //                 paymentLink: pixData[1].payload,
      //                 paymentId: transactionData.id,
      //                 qrUrl: pixData[1].encodedImage,
      //                 type: "pix",
      //               },
      //             });
      //           }
      //         } else {
      //           setErrorMessage({
      //             isOpen: true,
      //             message:
      //               "Ocorreu um erro ao processar sua transação, tente novamente mais tarde.",
      //           });
      //           setLoading(false);
      //         }
      //       })
      //       .catch((error) => {
      //         return;
      //       });
      //   } else if (paymentMethod === "card") {
      //     await generateTransaction(requestObject).then(async (response) => {
      //       let transactionData = response[0];

      //       let currentCardData = await captureCardPayment({
      //         customer_id: data.id,
      //         description: props.checkoutData.name,
      //         externalReference: transactionData.id,
      //         amount: parseFloat(props.checkoutData.price),
      //         installments: parseInt(parcel.value) + 1,
      //         creditCard: {
      //           holderName: isCardSame ? costumerData.name : cardData.name,
      //           number: cardData.number.split(" ").join(""),
      //           expiryMonth: cardData.month,
      //           expiryYear: cardData.year,
      //           ccv: cardData.cvv,
      //         },
      //         creditCardHolderInfo: {
      //           name: isCardSame ? costumerData.name : cardData.name,
      //           email: costumerData,
      //           cpfCnpj: isCardSame
      //             ? currentId.replace(/\D/g, "")
      //             : cardData.document,
      //           postalCode: isCardSame ? cep.replace(/\D/g, "") : cardData.cep,
      //           addressNumber: isCardSame
      //             ? costumerData.number
      //             : cardData.address_number,
      //           phone: costumerData.cellphone,
      //         },
      //       });

      //       if (currentCardData) {
      //         purchaseEvent(
      //           parseFloat(props.checkoutData.price),
      //           "Cartão de Crédito"
      //         );

      //         if (props.checkoutData.have_custom_page) {
      //           window.location = props.checkoutData.custom_page_link;
      //         } else {
      //           navigate(`pix`, {
      //             state: {
      //               price: props.checkoutData.price,
      //               cardLastDigits: cardData.number.split(" ").join("").slice(-4),
      //               friendly_id: transactionData.friendly_id,
      //               type: "card",
      //             },
      //           });
      //         }
      //       } else {
      //         setErrorMessage({
      //           isOpen: true,
      //           message:
      //             "Ocorreu um erro ao processar sua transação, tente novamente mais tarde.",
      //         });
      //         setLoading(false);
      //       }
      //     });
      //   } else {
      //     setErrorMessage({
      //       isOpen: true,
      //       message: "Forma de pagamento inválida.",
      //     });
      //     setLoading(false);
      //   }
      // } else {
      //   setErrorMessage({
      //     isOpen: true,
      //     message: "Por favor, preencha todos os campos.",
      //   });
      //   setLoading(false);
    } else {
      setErrorMessage({
        isOpen: true,
        message: "Por favor, preencha todos os campos.",
      });
      setLoading(false);
    }
  };

  const handleSaveValidation = (value) => {
    const month = value.slice(0, 2);
    const year = "20" + value.slice(3);
    setCardData((prevState) => ({
      ...prevState,
      month: month,
      year: year,
    }));
  };

  function verifyEmpty() {
    const inputs = document.querySelectorAll(".is_not_empty");
    let fill = true;

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        fill = false;
      }
    });

    if (fill) {
      return true;
    } else {
      return false;
    }
  }

  return (
    <RightWrapper isMobile={props.isMobile} isTimerOn={props.isTimerOn}>
      {paymentModal.pix && (
        <PixModal
          link={paymentModal.paymentLink}
          price={props.checkoutData.product_price}
          qrUrl={paymentModal.qrUrl}
          closeModal={() => setPaymentModal({})}
        />
      )}
      <ErrorNotification
        showNotification={errorMessage.isOpen}
        setShowNotification={() =>
          setErrorMessage({ isOpen: false, message: "" })
        }
        message={errorMessage.message}
      />
      <RowDelivery>
        <DeliveryForm>
          <Banner src={props.banner} />
          {!props.titleOnMenu && <h1>{props.checkoutData.product_name}</h1>}

          {responsive.isMobile && (
            <Carousel
              className="mycarousel"
              style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "10% !important",
                padding: "4px",
              }}
            >
              {props.productData.images.map((img, index) => {
                return (
                  <Carousel.Item key={index}>
                    <ProductImage src={img.original} />
                  </Carousel.Item>
                );
              })}
            </Carousel>
          )}

          <InputsRow>
            <Input>
              <FormInput
                type="text"
                placeholder="Nome"
                className="is_not_empty"
                onChange={(e) =>
                  setCostumerData((prevState) => ({
                    ...prevState,
                    name: e.target.value,
                  }))
                }
              />
              <label className="form-label">Nome</label>
              <AiOutlineUser />
            </Input>

            <Input style={{ width: "60%" }}>
              <InputMask
                className="form-input is_not_empty"
                onChange={(e) => setCurrentId(e.target.value)}
                maskChar=""
                mask={
                  currentId.length < 15
                    ? "999.999.999-999"
                    : "99.999.999/0001-99"
                }
                placeholder="CPF / CNPJ"
              />
              <label className="form-label">CPF/CNPJ</label>
            </Input>
          </InputsRow>

          <InputsRow>
            {props.askForEmail && (
              <Input>
                <FormInput
                  type="text"
                  placeholder="Email"
                  className="is_not_empty"
                  onChange={(e) =>
                    setCostumerData((prevState) => ({
                      ...prevState,
                      email: e.target.value,
                    }))
                  }
                />
                <label className="form-label">Email</label>
                <MdEmail />
              </Input>
            )}

            <Input style={{ width: "60%" }}>
              <InputMask
                className="form-input is_not_empty"
                mask="(99) 9 9999-9999"
                placeholder="(99) 9 9999-9999"
                onChange={(e) =>
                  setCostumerData((prevState) => ({
                    ...prevState,
                    cellphone: e.target.value.replace(/\D/g, ""),
                  }))
                }
              />
              <label className="form-label">Whatsapp</label>
              <AiOutlinePhone />
            </Input>
          </InputsRow>

          {!props.isDigital && (
            <>
              <hr />
              <InputsRow>
                <Input className="merged" style={{ width: "50%" }}>
                  <InputMask
                    className="form-input is_not_empty"
                    onChange={(e) => setCEP(e.target.value)}
                    mask="99999-999"
                    placeholder="CEP.."
                  />
                  <label className="form-label">CEP</label>
                </Input>

                <Input>
                  <FormInput
                    type="text"
                    placeholder="Logradouro.."
                    disabled={cepData ? true : false}
                    value={cepData && cepData.logradouro}
                  />
                  <label className="form-label">Logradouro</label>
                </Input>
                <Input style={{ width: "30%" }}>
                  <FormInput
                    type="text"
                    placeholder="Número"
                    className="is_not_empty"
                    onChange={(e) =>
                      setCostumerData((prevState) => ({
                        ...prevState,
                        number: e.target.value,
                      }))
                    }
                  />
                  <label className="form-label">Número</label>
                </Input>
              </InputsRow>

              <InputsRow>
                <Input style={{ width: "70%" }}>
                  <FormInput
                    type="text"
                    placeholder="Bairro.."
                    disabled={cepData ? true : false}
                    value={cepData && cepData.bairro}
                  />
                  <label className="form-label">Bairro</label>
                  <AiOutlineHome />
                </Input>
                <Input>
                  <FormInput
                    type="text"
                    placeholder="Complemento.."
                    onChange={(e) =>
                      setCostumerData((prevState) => ({
                        ...prevState,
                        complement: e.target.value,
                      }))
                    }
                  />
                  <label className="form-label">Complemento</label>
                </Input>
              </InputsRow>

              <InputsRow>
                <Input>
                  <FormInput
                    type="text"
                    placeholder="Cidade"
                    disabled={cepData ? true : false}
                    value={cepData && cepData.localidade}
                  />
                  <label className="form-label">Cidade</label>
                  <MdOutlineMapsHomeWork />
                </Input>
                <Input style={{ width: "30%" }}>
                  <FormInput
                    type="text"
                    placeholder="Estado"
                    disabled={cepData ? true : false}
                    value={cepData && cepData.uf}
                  />
                  <label className="form-label">Estado</label>
                  <MdOutlineMapsHomeWork />
                </Input>
              </InputsRow>
            </>
          )}

          <hr />

          <InputsRow style={{ justifyContent: "flex-start" }}>
            {props.checkoutData.accept_card && (
              <PaymentCard
                onClick={() => setPaymentMethod("card")}
                isActive={paymentMethod == "card" ? true : false}
              >
                <BsCheckCircleFill size={15} />
                <img src={creditCard} />
                <small>Cartão de crédito</small>
              </PaymentCard>
            )}

            {props.checkoutData.accept_billet && (
              <PaymentCard
                onClick={() => setPaymentMethod("billet")}
                isActive={paymentMethod == "billet" ? true : false}
              >
                <BsCheckCircleFill size={15} />
                <img src={barCode} />
                <small>Boleto</small>
              </PaymentCard>
            )}

            {props.checkoutData.accept_pix && (
              <PaymentCard
                onClick={() => setPaymentMethod("pix")}
                isActive={paymentMethod == "pix" ? true : false}
              >
                <BsCheckCircleFill size={15} />
                <img src={pixPay} />
                <small>Pix</small>
              </PaymentCard>
            )}
          </InputsRow>

          {paymentMethod == "card" && props.checkoutData.accept_card == true && (
            <>
              <InputsRow>
                <input
                  type="checkbox"
                  checked={isCardSame}
                  onChange={(e) => setIsCardSame(e.target.checked)}
                />
                <small>Os dados do cartão são os mesmos do usuário</small>
              </InputsRow>
              {isCardSame && !props.isDigital ? (
                <>
                  <Input>
                    <InputMask
                      className="form-input"
                      type="text"
                      mask="9999 9999 9999 9999"
                      placeholder="Número do cartão"
                      onChange={(e) =>
                        setCardData((prevState) => ({
                          ...prevState,
                          number: e.target.value,
                        }))
                      }
                    />
                    <label className="form-label">Número do cartão</label>
                  </Input>
                  <InputsRow>
                    <Input style={{ width: "30%" }}>
                      <InputMask
                        className="form-input"
                        type="text"
                        mask="99/99"
                        placeholder="Validade"
                        onChange={(e) =>
                          e.target.value.length > 4 &&
                          handleSaveValidation(e.target.value)
                        }
                      />
                      <label className="form-label">Validade</label>
                    </Input>
                    <Input style={{ width: "20%" }}>
                      <InputMask
                        className="form-input is_not_empty"
                        type="text"
                        mask="999"
                        placeholder="Cód. de segurança"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            cvv: e.target.value,
                          }))
                        }
                      />
                      <label className="form-label">CVV</label>
                    </Input>
                    <Select
                      className="form-input"
                      options={parcelOptions}
                      onChange={handleParcelChange}
                      placeholder="Número de parcelas"
                      value={parcel}
                    />
                  </InputsRow>
                </>
              ) : (
                <>
                  <InputsRow>
                    <Input>
                      <FormInput
                        className="form-input"
                        type="text"
                        placeholder="Nome escrito no cartão"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            name: e.target.value,
                          }))
                        }
                      />
                      <label className="form-label">
                        Nome escrito no cartão
                      </label>
                    </Input>
                    <Input>
                      <InputMask
                        className="form-input"
                        type="text"
                        mask="9999 9999 9999 9999"
                        placeholder="Número do cartão"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            number: e.target.value,
                          }))
                        }
                      />
                      <label className="form-label">Número do cartão</label>
                    </Input>
                  </InputsRow>

                  <InputsRow>
                    <Input style={{ width: "30%" }}>
                      <InputMask
                        className="form-input"
                        type="text"
                        mask="99/99"
                        placeholder="Validade"
                        onChange={(e) =>
                          e.target.value.length > 4 &&
                          handleSaveValidation(e.target.value)
                        }
                      />
                      <label className="form-label">Validade</label>
                    </Input>
                    <Input style={{ width: "20%" }}>
                      <InputMask
                        className="form-input is_not_empty"
                        type="text"
                        mask="999"
                        placeholder="Cód. de segurança"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            cvv: e.target.value,
                          }))
                        }
                      />
                      <label className="form-label">CVV</label>
                    </Input>
                    <Select
                      className="form-input"
                      options={parcelOptions}
                      onChange={handleParcelChange}
                      placeholder="Número de parcelas"
                      value={parcel}
                    />
                  </InputsRow>
                  <InputsRow>
                    <Input style={{ width: "60%" }}>
                      <InputMask
                        className="form-input is_not_empty"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            document: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        maskChar=""
                        mask={
                          currentId.length < 15
                            ? "999.999.999-999"
                            : "99.999.999/0001-99"
                        }
                        placeholder="CPF / CNPJ"
                      />
                      <label className="form-label">CPF/CNPJ</label>
                    </Input>
                    <Input style={{ width: "60%" }}>
                      <InputMask
                        className="form-input is_not_empty"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            cep: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        maskChar=""
                        mask={"99999-999"}
                        placeholder="CEP"
                      />
                      <label className="form-label">CEP</label>
                    </Input>
                    <Input style={{ width: "30%" }}>
                      <FormInput
                        className="form-input is_not_empty"
                        onChange={(e) =>
                          setCardData((prevState) => ({
                            ...prevState,
                            address_number: e.target.value.replace(/\D/g, ""),
                          }))
                        }
                        placeholder="Número da casa"
                      />
                      <label className="form-label">Número</label>
                    </Input>
                  </InputsRow>
                </>
              )}
            </>
          )}

          <Wrapper>
            <ProductDetails>
              <Input style={{ padding: "0px 0px 0 0.5rem" }}>
                <FormInput type="text" placeholder="Cupom de desconto" />
                <label className="form-label">
                  <BsTicketPerforated
                    size={15}
                    style={{ marginRight: "10px" }}
                  />
                  Cupom de desconto
                </label>
                <div className="apply">APLICAR</div>
              </Input>

              <DetailCard>
                {props.isDigital ? (
                  <FirstRow>
                    <p>Total</p>
                    <p>R$ {props.checkoutData.product_price}</p>
                  </FirstRow>
                ) : (
                  <FirstRow>
                    <span>
                      <p>Frete</p>
                    </span>

                    <p>{props.checkoutData.product_price ? `-------` : "-------"}</p>
                    <div className="divider" />
                    <p>Total</p>
                    <p>R$ {props.checkoutData.product_price}</p>
                  </FirstRow>
                )}
              </DetailCard>
            </ProductDetails>
          </Wrapper>
          <GoogleReCaptcha />
          <FinishPaymentFooter>
            <FinishButton
              ref={inputRef}
              onClick={() => {
                handleFinishBuy();
              }}
            >
              {!loading ? (
                "Finalizar Compra"
              ) : (
                <ReactLoading
                  type="bubbles"
                  color="#fff"
                  height={30}
                  width={30}
                />
              )}
            </FinishButton>

            <PaymentCompanies>
              <img src={visa} />
              <img src={mastercard} />
              <img src={hipercard} />
              <img src={diners} />
              <img src={elo} />
              <img src={pix} />
            </PaymentCompanies>
            <small className="payment">
              <AiFillLock /> Seu pagamento está seguro
            </small>
          </FinishPaymentFooter>
        </DeliveryForm>
      </RowDelivery>
    </RightWrapper>
  );
}

function Checkout() {
  const [size, setWindowSize] = useState({ width: 0, height: 0 });
  const [currentNotification, setCurrentNotification] = useState(0);
  const [showNotification, setShowNotification] = useState(true);
  const [currentCheckout, setCurrentCheckout] = useState({});
  const [productData, setProductData] = useState({});
  const { id } = useParams();

  // useEffect(() => {
  //   const getCurrentCheckout = async () => {

  //     let data = await getCheckout(id);

  //     const updatedData = {
  //       ...data,
  //       layout: JSON.parse(data.layout),
  //       mobile_layout: JSON.parse(data.mobile_layout),
  //       notifications: JSON.parse(data.notifications),
  //     };

  //     let currentProductData = await getProduct(data.product_id);
  //     let pixels = await getAllPixels(data.account_id, data.product_id);
  //     let facebookPixels = pixels.filter(
  //       (pixel) => pixel.pixel_platform === "facebook"
  //     );

  //     let tiktokPixels = pixels.filter(
  //       (pixel) => pixel.pixel_platform === "tiktok"
  //     );

  //     // adiciona os event handlers do meta pixels
  //     window.fbq("init", facebookPixels[0].pixel_id);
  //     window.fbq("track", "PageView");

  //     window.ttq.load(tiktokPixels[0].pixel_id);

  //     (facebookPixels || []).slice(1).map((pixel) => {
  //       window.fbq("addPixelId", pixel.pixel_id);
  //     });

  //     const updatedProductData = {
  //       ...currentProductData,
  //       images: JSON.parse(currentProductData.images),
  //     };

  //     setProductData(updatedProductData);
  //     setCurrentCheckout(updatedData);
  //   };

  //   getCurrentCheckout();
  // }, []);

  const initialProductData = {
    name: "Escova Alisadora",
    price: 199.99,
    max_installments: 12,
    description: "Esse produto é muito legal",
    accept_billet: true,
    accept_pix: true,
    accept_card: true,
    images: [
      {
        original:
          "https://cdn.shopify.com/s/files/1/0554/5669/4324/products/Preto_1024x1024_7f53d107-5762-4f86-9155-0e2fdee48196.webp?v=1655314983",
        thumbnail:
          "https://cdn.shopify.com/s/files/1/0554/5669/4324/products/Preto_1024x1024_7f53d107-5762-4f86-9155-0e2fdee48196.webp?v=1655314983",
      },
      {
        original:
          "https://photos.enjoei.com.br/escova-alisadora-philco-78794783/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNDk3OTU0Ny9kNzY1ZWQ2YWNmM2VjOGIxZmJiYWJkMGU3Yzc4NDIyYS5qcGc",
        thumbnail:
          "https://photos.enjoei.com.br/escova-alisadora-philco-78794783/828xN/czM6Ly9waG90b3MuZW5qb2VpLmNvbS5ici9wcm9kdWN0cy8xNDk3OTU0Ny9kNzY1ZWQ2YWNmM2VjOGIxZmJiYWJkMGU3Yzc4NDIyYS5qcGc",
      },
      {
        original: "https://imgs.casasbahia.com.br/1530123742/1xg.jpg",
        thumbnail: "https://imgs.casasbahia.com.br/1530123742/1xg.jpg",
      },
    ],
  };

  useEffect(() => {
    const checkoutArray = JSON.parse(localStorage.getItem("checkoutArray"));
    const findCurrentCheckout = checkoutArray.find(
      (checkout) => checkout.id === id
    );

    // const updatedData = {
    //   ...findCurrentCheckout,
    //   layout: JSON.parse(findCurrentCheckout.layout),
    //   mobile_layout: JSON.parse(findCurrentCheckout.mobile_layout),
    //   notifications: JSON.parse(findCurrentCheckout.notifications),
    // };

    setCurrentCheckout(findCurrentCheckout);
    setProductData(initialProductData);
  }, []);

  // responsividade de componentes
  useEffect(() => {
    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const updateDimensions = () => {
    const width = window.innerWidth;
    const height = window.innerHeight;
    setWindowSize({ width: width, height: height });
  };

  const responsive = {
    isDesktop: size.width > 1080 && size.height > 800,
    isLaptop: size.height < 800,
    isMobile: size.width < 600,
  };

  // se eu não deixar esse hook, a notificação não aparece de forma animada
  useEffect(() => {
    const interval = setInterval(() => {
      setShowNotification(true);
    }, 11000);

    return () => clearInterval(interval);
  }, []);

  // renderiza as diferentes notificações a cada 10 segundos
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentNotification((prevNotification) => {
        const nextNotification = prevNotification + 1;
        return nextNotification >= (currentCheckout.notifications?.length ?? 0)
          ? 0
          : nextNotification;
      });
    }, 10000);
    return () => clearInterval(interval);
  }, [currentCheckout.notifications]);

  const notificationCounts = useRef({});

  const incrementNotificationCount = (type) => {
    notificationCounts.current[type] =
      (notificationCounts.current[type] ?? 0) + 1;
  };

  const theme = {
    accentColor: currentCheckout.accent_color,
    mainSubColor: currentCheckout.main_sub_color,
    mainText: currentCheckout.page_text,
    productBackground: currentCheckout.product_background,
    productText: currentCheckout.product_text,
    secundaryText: currentCheckout.secundary_text,
    tertiaryText: currentCheckout.tertiary_text,
  };

  return (
    <ThemeProvider theme={theme}>
      {currentCheckout.is_timer_on && (
        <Timer
          time={currentCheckout.timer_time}
          text={currentCheckout.timer_text}
        />
      )}
      {currentCheckout.is_notification_open && (
        <>
          {currentCheckout.notifications.map((notification, index) => {
            if (index === currentNotification && notification.active === true) {
              return (
                <Notification
                  key={index}
                  showNotification={showNotification}
                  setShowNotification={() => setShowNotification(false)}
                  title={notification.title}
                  message={notification.text}
                  currentValue={notification.minValue}
                  icon={notification.type}
                  count={notificationCounts.current[notification.type] ?? 0}
                  minValue={notification.minValue}
                  increment={incrementNotificationCount}
                />
              );
            }
          })}
        </>
      )}

      {currentCheckout.is_support_open && (
        <SupportNotification
          supportData={{
            email: currentCheckout.support_email,
            number: currentCheckout.support_whatsapp,
          }}
        />
      )}

      <Container>
        {responsive.isMobile &&
          currentCheckout.mobile_layout?.map((item, index) => {
            switch (item) {
              case "mobileProductDetails":
                return (
                  <LeftSideBar
                    key={index}
                    isMobile={responsive.isMobile ? true : false}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    titleOnMenu={currentCheckout.title_on_menu ? true : false}
                    productData={currentCheckout}
                    imageData={productData}
                  />
                );
              case "mobileDeliveryDetails":
                return (
                  <DeliveryDetails
                    key={index}
                    checkoutData={currentCheckout}
                    isDigital={currentCheckout.is_digital}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    askForEmail={currentCheckout.ask_for_email ? true : false}
                    isMobile={responsive.isMobile}
                    titleOnMenu={currentCheckout.title_on_menu ? true : false}
                    banner={currentCheckout.banner_background_mobile}
                    productData={productData}
                    theme={theme}
                  />
                );
              case "mobileBanner":
                return (
                  <SideBanner
                    key={index}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    background={currentCheckout.banner_bottom_background_mobile}
                  />
                );
              default:
                return null;
            }
          })}
        {!responsive.isMobile &&
          currentCheckout.layout?.map((item, index) => {
            // renderiza os componentes na ordem que estão salvos no "banco".
            switch (item) {
              case "productDetails":
                return (
                  <LeftSideBar
                    key={index}
                    isDigital={currentCheckout.is_digital}
                    isMobile={responsive.isMobile ? true : false}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    titleOnMenu={currentCheckout.title_on_menu ? true : false}
                    hasSupport={currentCheckout.is_support_open ? true : false}
                    imageData={productData}
                    supportData={{
                      email: currentCheckout.support_email,
                      number: currentCheckout.support_whatsapp,
                    }}
                    productData={currentCheckout}
                  />
                );
              case "deliveryDetails":
                return (
                  <DeliveryDetails
                    key={index}
                    checkoutData={currentCheckout}
                    isDigital={currentCheckout.is_digital}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    titleOnMenu={currentCheckout.title_on_menu ? true : false}
                    askForEmail={currentCheckout.ask_for_email ? true : false}
                    banner={currentCheckout.banner_background}
                    theme={theme}
                    productData={productData}
                  />
                );
              case "sideBanner":
                return (
                  <SideBanner
                    key={index}
                    isTimerOn={currentCheckout.is_timer_on ? true : false}
                    background={currentCheckout.banner_side_background}
                  />
                );
              default:
                return null;
            }
          })}
      </Container>
    </ThemeProvider>
  );
}

export default Checkout;
