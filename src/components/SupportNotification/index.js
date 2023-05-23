import React from "react";
import {
  Container,
  WhatsappLogo,
  Wrapper,
  WrapperBody,
  SupportRow,
  EmailLogo,
} from "./styles";
import { BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import { IoLogoWhatsapp } from "react-icons/io";

function SupportNotification(props) {
  return (
    <Container>
      <Wrapper>
        <WrapperBody className="support">
          <p>Fale com o suporte:</p>
        </WrapperBody>
        <EmailLogo>
          <MdEmail
            onClick={() =>
              (window.location = `mailto:${props.supportData.email}`)
            }
            size={15}
          />
        </EmailLogo>
        <WhatsappLogo
          onClick={() =>
            window.open(
              `https://api.whatsapp.com/send?phone=${props.supportData.number}&text=Olá,%20preciso%20de%20ajuda`,
              "_blank"
            )
          }
          className="logo"
        >
          <BsWhatsapp size={20} />
        </WhatsappLogo>
      </Wrapper>
    </Container>
  );
}

export default SupportNotification;
