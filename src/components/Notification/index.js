import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Container, Wrapper, Title } from "./styles";
import { FaShoppingCart } from "react-icons/fa";
import {
  BsFillCheckCircleFill,
  BsFillPeopleFill,
  BsGraphUpArrow,
} from "react-icons/bs";

function Notification(props) {
  const [showNotification, setShowNotification] = useState(
    props.showNotification
  );

  useEffect(() => {
    props.increment(props.icon)
    setShowNotification(props.showNotification);
    if (props.showNotification) {
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [props.showNotification]);

  const notificationAnimation = useSpring({
    transform: showNotification ? "translateX(0)" : "translateX(-100%)",
    opacity: showNotification ? 1 : 0,
    onRest: () => {
      if (!showNotification) {
        setShowNotification(false);
        props.setShowNotification();
      }
    },
  });

  let IconComponent;

  switch (props.icon) {
    case "buy":
      IconComponent = BsFillCheckCircleFill;
      break;
    case "people":
      IconComponent = BsFillPeopleFill;
      break;
    case "grow":
      IconComponent = BsGraphUpArrow;
      break;
    default:
      IconComponent = BsGraphUpArrow;
  }

  return (
    <Wrapper>
      {props.showNotification && (
        <animated.div style={notificationAnimation}>
          <Container>
            <IconComponent size={30} />
            <Title>
              <p>{props.title}</p>
              <p>
                {parseInt(props.count) > parseInt(props.minValue) ? props.count : "1"}{" "}
                {props.message}
              </p>
            </Title>
          </Container>
        </animated.div>
      )}
    </Wrapper>
  );
}

export default Notification;
