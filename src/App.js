import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Checkout from "./components/Checkout";
import EditCheckout from "./components/EditCheckout";
import GlobalStyles from "./styles/GlobalStyles";
import BilletPurchase from "./components/BilletPurchase";
import PixPurchase from "./components/PixPurchase";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";

function App() {
  return (
    <GoogleReCaptchaProvider
      reCaptchaKey={process.env.REACT_APP_CAPTCHA_KEY}
      language="pt-BR"
    >
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<EditCheckout />} />
          <Route path="/:id" element={<Checkout />} />
          <Route
            path="/:id/billet/:transactionId/:pdfUrl"
            element={<BilletPurchase />}
          />
          <Route path="/:id/pix/" element={<PixPurchase />} />
        </Routes>
        <GlobalStyles />
      </BrowserRouter>
    </GoogleReCaptchaProvider>
  );
}

export default App;
