import React from "react";
import {
  LeftWrapper,
  Wrapper,
  WrapperHeader,
  ProductDescription,
  ProductDetails,
  DetailCard,
  FirstRow,
  InputWrapper,
  ProductImage,
  CupomInput,
  SupportRow,
  FinishButton,
} from "./styles";
import { Carousel } from "react-bootstrap";
import { FiArrowRight } from "react-icons/fi";
import { BsWhatsapp } from "react-icons/bs";
import { MdEmail } from "react-icons/md";
import stars from "../../assets/stars.png";
import { AiFillLock } from "react-icons/ai";
import parse from "html-react-parser";

function LeftSideBar(props) {
  console.log(props.productData);

  return (
    <LeftWrapper isTimerOn={props.isTimerOn}>
      <Wrapper>
        {!props.isMobile && (
          <>
            <Carousel
              className="mycarousel"
              style={{
                width: "100%",
                maxWidth: "500px",
                maxHeight: "10% !important",
                padding: "0px",
              }}
            >
              {props.imageData.images.map((img, index) => {
                return (
                  <Carousel.Item key={index}>
                    <ProductImage src={img.original} />
                  </Carousel.Item>
                );
              })}
            </Carousel>

            <ProductDetails>
              <WrapperHeader>
                <h1>{props.productData.product_name}</h1>
                <h2>R$ {props.productData.product_price} A vista</h2>
              </WrapperHeader>
              <ProductDescription>
                <strong>{parse(props.productData.product_description)}</strong>
              </ProductDescription>
            </ProductDetails>
          </>
        )}
      </Wrapper>
      {/* <DetailCard>
        <div className="pfp" />
        <p>Franchisca Virgolline</p>
        <small>
          A escova elétrica que comprei é perfeita para meu cabelo, deixou ele
          macio e sedoso em minutos!
        </small>
        <img src={stars} />
      </DetailCard> */}
    </LeftWrapper>
  );
}

export default LeftSideBar;
