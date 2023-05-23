import React, { useRef } from "react";
import { SwitchContainer } from "./styles";

function Switch(props) {
  const switchRef = useRef(null);

  return (
    <SwitchContainer class="switch" onClick={() => switchRef.current.click()}>
      <input
        type="checkbox"
        checked={props.default}
        onChange={(e) => props.changeValue(e.target.checked)}
        ref={switchRef}
      />
      <span class="slider round"></span>
    </SwitchContainer>
  );
}

export default Switch;
