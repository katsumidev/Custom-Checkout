import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Container,
  MiniProduct,
  MiniRow,
  MiniCarousel,
  ProductDetails,
  Wrapper,
} from "./styles";
import { IoIosArrowForward, IoIosArrowBack } from "react-icons/io";

function SortableItem(props) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: props.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <Wrapper>
      <Container
        isMobile={props.isMobile}
        ref={setNodeRef}
        style={style}
        {...attributes}
        {...listeners}
      >
        {props.id == "productDetails" && (
          <ProductDetails>
            <MiniRow />
            <MiniCarousel>
              <IoIosArrowBack />
              <IoIosArrowForward />
            </MiniCarousel>
            <div className="footer">
              <MiniProduct />
              <MiniProduct />
              <MiniProduct />
            </div>
          </ProductDetails>
        )}
        {props.id == "deliveryDetails" && (
          <ProductDetails>
            <div className="mini-banner">BANNER</div>
            <div className="mini-title" />
            {[1, 2, 3, 4].map((input) => {
              return (
                <div className="mini-inputs-row" key={input}>
                  <div className="mini-inputs" />
                  <div className="mini-inputs" />
                </div>
              );
            })}
            <div className="mini-buy-btn">
              <small>Comprar</small>
            </div>
          </ProductDetails>
        )}
        {props.id == "sideBanner" && (
          <ProductDetails>
            <div className="side-banner">BANNER</div>
          </ProductDetails>
        )}
        {props.id == "mobileProductDetails" && (
          <ProductDetails>
            <MiniRow />
            <div className="footer">
              <MiniProduct />
              <MiniProduct />
              <MiniProduct />
            </div>
          </ProductDetails>
        )}
        {props.id == "mobileDeliveryDetails" && (
          <ProductDetails>
            <div className="mini-banner">BANNER</div>
            <MiniCarousel style={{ height: "150px !important" }}>
              <IoIosArrowBack />
              <IoIosArrowForward />
            </MiniCarousel>
            <div className="mini-title" />
            {[1, 2, 3, 4].map((input) => {
              return (
                <div className="mini-inputs-row" key={input}>
                  <div className="mini-inputs" />
                  <div className="mini-inputs" />
                </div>
              );
            })}
            <div className="mini-buy-btn">
              <small>Comprar</small>
            </div>
          </ProductDetails>
        )}
        {props.id == "mobileBanner" && (
          <ProductDetails>
            <div className="side-banner">BANNER</div>
          </ProductDetails>
        )}
      </Container>
      <p className="dragsInfo">
        {props.id == "productDetails" && "Menu Lateral"}
        {props.id == "deliveryDetails" && "Dados da Entrega"}
        {props.id == "sideBanner" && "Banner Lateral"}
      </p>
    </Wrapper>
  );
}

export default SortableItem;
