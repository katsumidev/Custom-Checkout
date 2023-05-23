import React, { useState, useEffect } from "react";
import { useSpring, animated } from "react-spring";
import { Container, Wrapper } from "./styles";
import { RiErrorWarningLine } from "react-icons/ri";

function ErrorNotification(props) {
  const [showNotification, setShowNotification] = useState(
    props.showNotification
  );

  useEffect(() => {
    setShowNotification(props.showNotification);
    if (props.showNotification) {
      setTimeout(() => {
        setShowNotification(false);
      }, 5000);
    }
  }, [props.showNotification]);

  const notificationAnimation = useSpring({
    transform: showNotification ? "translateX(0)" : "translateX(100%)",
    opacity: showNotification ? 1 : 0,
    onRest: () => {
      if (!showNotification) {
        setShowNotification(false);
        props.setShowNotification();
      }
    },
  });

  return (
    <Wrapper>
      <animated.div style={notificationAnimation}>
        {props.showNotification && (
          <Container>
            <RiErrorWarningLine size={25} />
            {props.message}
          </Container>
        )}
      </animated.div>
    </Wrapper>
  );
}

export default ErrorNotification;
