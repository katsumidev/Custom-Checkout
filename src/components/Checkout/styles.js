import styled from "styled-components";
import arrowright from "../../assets/arrowright.png";
import arrowleft from "../../assets/arrowleft.png";

export const Container = styled.div`
  width: 100vw;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;
  background-color: var(--main-background);
  max-width: 1525px;
  margin: 0 auto;

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: center;
  }
`;
export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 30px;
  margin: 0 auto;
  width: 100%;
  overflow: auto;

  h2 {
    font-size: 1.3rem;
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

export const RightWrapper = styled.div`
  width: 45%;
  padding: ${(props) => (props.isTimerOn ? "0px 1.5rem" : "0px 1.5rem")};
  display: flex;
  flex-direction: column;
  margin-top: ${(props) => (props.isTimerOn ? "70px" : "20px")};

  @media (max-width: 600px) {
    width: 100%;
    padding: 0px;
  }

  @media (max-height: 600px), (max-width: 800px) {
    margin-left: 0px;
    width: 100%;
  }

  h2 {
    font-size: 1.2rem;
    margin-bottom: 5px;
    font-weight: 700;
    color: ${(props) => props.theme.accentColor};
  }

  h1 {
    font-size: 1.3rem;
    font-weight: 700;
    margin: 10px auto;
  }

  h3 {
    font-size: 0.8rem;
    color: ${(props) => props.theme.mainSubColor};
    font-weight: 600;
  }
`;

export const WrapperHeader = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  margin: 0 auto;

  h2 {
    font-size: 1.2rem;
  }
`;

export const ProductImage = styled.img`
  border-radius: var(--border-radius);
  height: 17em;
  width: 100%;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
  background-color: transparent;
  border-radius: 0.4rem;
`;

export const ProductDescription = styled.p`
  font-size: 0.8rem;
  font-weight: 300;
  color: var(--secundary-text);
  width: 95%;
`;

export const ProductDetails = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  padding: 2px;
  width: 100%;
`;

export const DetailCard = styled.div`
  display: flex;
  flex-direction: column;
  background-color: var(--tertiary-background);
  padding: 10px 1.5rem;
  border-radius: var(--border-radius);
  font-weight: 700;
  width: 100%;
  gap: 15px;

  @media (max-height: 750px) {
    gap: 8px;
    padding: 8px 0.8rem;
  }

  .divider {
    width: 2px;
    height: 100%;
    background: #000;
  }

  .price {
    font-size: 0.8rem;
  }

  small {
    font-size: 0.7rem;
    color: var(--secundary-text);
  }
`;

export const FirstRow = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
`;

export const CupomInput = styled.input`
  border: none;
  background-color: transparent;
  outline: none;
  width: 100%;
  font-size: 13.5px;
  padding: 7px 0px 8px 0px;
`;

export const DeliveryForm = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 30px;
  width: 100%;

  @media (max-width: 800px) {
    width: 90%;
  }

  hr {
    color: rgba(0, 0, 0, 0.1) !important;
    background-color: rgba(0, 0, 0, 0.1);
    border-color: rgba(0, 0, 0, 0.1);
    margin: 0px;
  }

  small {
    color: var(--secundary-text);
    margin: 0 auto;
    font-weight: 600;
  }

  .css-b62m3t-container {
    width: 50%;
  }

  .css-13cymwt-control {
    border-color: rgba(0, 0, 0, 0.1);
    font-size: 14px;
    padding: 0rem 0.5rem;
    border-radius: 0.4rem;
  }

  .css-t3ipsp-control {
    border: 1px solid ${(props) => props.theme.accentColor} !important;
    box-shadow: none !important;
    border-color: ${(props) => props.theme.accentColor};
    font-size: 14px;
    padding: 0rem 0.5rem;
    border-radius: 0.4rem;

    :hover {
      border: 1px solid ${(props) => props.theme.accentColor};
    }
  }

  .react-datepicker__day--keyboard-selected,
  .react-datepicker__month-text--keyboard-selected:hover,
  .react-datepicker__quarter-text--keyboard-selected,
  .react-datepicker__year-text--keyboard-selected {
    background: ${(props) => props.theme.accentColor};
    color: #fff;
    border-radius: 100%;
  }

  .react-datepicker__day {
    font-weight: 600;
  }

  .react-datepicker__day:hover {
    border-radius: 100%;
  }

  .react-datepicker__day--outside-month {
    color: rgba(0, 0, 0, 0.4) !important;
  }

  .react-datepicker__navigation,
  .react-datepicker__navigation--next {
    background-color: var(--secundary-background);
    border-radius: 100%;
    margin: 27px 20px;
    height: 15px;
    width: 15px;
  }

  .react-datepicker__navigation--next {
    background-image: url(${arrowright});
    background-position: center;
    background-size: contain;
  }

  .react-datepicker__navigation--previous {
    background-image: url(${arrowleft});
    background-position: center;
    background-size: contain;
  }

  .datepicker-calendar {
    padding: 20px;
    border: 1px solid rgba(0, 0, 0, 0.2);
    border-radius: 0.4rem;

    .react-datepicker__header {
      background-color: transparent;
      border-bottom: none;

      .react-datepicker__current-month {
        word-spacing: 40px;
        margin-bottom: 20px;
      }

      .react-datepicker__day-names {
        .react-datepicker__day-name {
          color: rgba(0, 0, 0, 0.4) !important;
        }
      }
    }
  }
`;

export const FormInput = styled.input`
  border: none;
  width: 100%;
  outline: none;
  border-radius: var(--border-radius);
  transition: all 0.2s;
  font-size: 13.5px;
  font-weight: 600;
  color: ${(props) => props.theme.mainText} !important;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  border-bottom: 2px solid ${(props) => props.theme.mainText};
  transition: all 0.2s;

  :focus-within {
    border-color: ${(props) => props.theme.accentColor};
  }

  :focus-within svg {
    color: ${(props) => props.theme.accentColor};
  }
`;

export const Input = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  width: 100%;
  border: 1px solid rgba(0, 0, 0, 0.1);
  padding: 0rem 0.5rem;
  transition: all 0.2s;
  border-radius: 0.4rem;

  :hover {
    border-color: rgba(0, 0, 0, 0.3);
  }

  .apply {
    background-color: var(--tertiary-background);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 16px;
    height: 100%;
    cursor: pointer;
    font-weight: 700;
    font-size: 13px;
    border-top-right-radius: 0.4rem;
    border-bottom-right-radius: 0.4rem;
  }

  input {
    font-size: 13.5px;
    height: 100%;
    background-color: transparent;
    color: #000;
    transition: 0.15s all ease;
    padding: 0.7rem 0;
  }

  :focus-within {
    border-color: ${(props) => props.theme.accentColor};
  }

  input::placeholder {
    color: transparent;
  }

  .form-label {
    position: absolute;
    font-size: 13px;
    padding: 0 10px;
    color: var(--secundary-text);
    pointer-events: none;
    transition: 0.15s all ease;
    margin-bottom: 0px;
  }

  input:focus + .form-label,
  input:not(:placeholder-shown) + .form-label {
    transform: translate(5px, -22px);
    background-color: #fff;
    font-size: 13px;
    font-weight: 600;
  }

  input:focus + .form-label {
    color: ${(props) => props.theme.accentColor};
  }

  svg {
    color: var(--secundary-text);
  }

  .form-input {
    border: none;
    width: 100%;
    outline: none;
    transition: all 0.2s;
    font-size: 13.5px;
    height: 100%;
    font-weight: 600;
    color: ${(props) => props.theme.mainText} !important;
  }
`;

export const InputsRow = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 5px;

  small {
    margin: 0px 5px !important;
  }

  input[type="checkbox"] {
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: transparent;
    /* Not removed via appearance */
    margin: 0;
    font: inherit;
    color: currentColor;
    width: 1.15em;
    height: 1.15em;
    border: 1px solid currentColor;
    border-radius: 0.4rem;
    transform: translateY(-0.075em);
    display: grid;
    place-content: center;
  }
  input[type="checkbox"]::before {
    content: "";
    width: 0.65em;
    height: 0.65em;
    clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
    transform: scale(0);
    transform-origin: bottom left;
    transition: 120ms transform ease-in-out;
    box-shadow: inset 1em 1em #fff;
    /* Windows High Contrast Mode */
    background-color: #fff;
  }
  input[type="checkbox"]:checked {
    background-color: ${(props) => props.theme.accentColor};
    border: none;
  }
  input[type="checkbox"]:checked::before {
    transform: scale(1);
  }
  input[type="checkbox"]:focus {
    outline: max(2px, 0.15em) solid currentColor;
    outline-offset: max(2px, 0.15em);
  }
  input[type="checkbox"]:disabled {
    color: var(--accent-color);
    cursor: not-allowed;
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
  width: 100%;

  :hover {
    filter: brightness(75%);
  }
`;

export const TopBanner = styled.div`
  width: 90%;
  height: 200px !important;
`;

export const Banner = styled.img`
  width: 100%;
  height: 180px;
  border-radius: 0.2rem;
  margin-bottom: 20px;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;
`;

export const SideBanner = styled.div`
  width: 25%;
  margin: ${(props) => (props.isTimerOn ? "70px 0 0 0" : "20px 0")};
  min-height: 80vh;
  border-radius: 0.4rem;
  background-image: url(${(props) => props.background});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;

  @media (max-width: 800px) {
    width: 90%;
  }
`;

export const RowDelivery = styled.div`
  display: flex;
  flex-direction: row;
  gap: 25px;
  height: 100%;

  @media (max-width: 800px) {
    flex-direction: column;
  }

  @media (max-width: 600px) {
    align-items: center;
  }
`;

export const PaymentCard = styled.div`
  position: relative;
  padding: 0.3rem;
  border-radius: 0.4rem;
  background-color: transparent;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;
  font-size: 12px;
  text-align: center;
  width: 33.33%;
  border: ${(props) =>
    props.isActive
      ? `1px solid ${props.theme.accentColor}`
      : " 1px solid rgba(0, 0, 0, 0.1)"};
  cursor: pointer;
  box-shadow: rgba(99, 99, 99, 0.2) 0px 2px 4px 0px;

  img {
    width: 32px;
    height: 32px;
  }

  svg {
    position: absolute;
    top: -5px;
    right: -5px;
    color: ${(props) => props.theme.accentColor};
    opacity: ${(props) => (props.isActive ? "1" : "0")};
  }

  :hover {
    border: 1px solid ${(props) => props.theme.accentColor};
  }
`;

export const PaymentCompanies = styled.div`
  display: flex;
  flex-direction: row;
  gap: 10px;
  align-items: center;
  margin: 0 auto;

  img {
    width: 52px !important;
    height: 52px !important;
  }
`;

export const FinishPaymentFooter = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`;
