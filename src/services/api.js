import axios from "axios";
export const BASE_URL = `https://sandbox.server.coinzz.app`;

export const getCheckout = async (checkoutId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/checkout/selectOne/${checkoutId}`
    );

    return data;
  } catch (error) {
    console.log("Error while getting checkout data ", error);
  }
};

export const getProduct = async (productId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/checkout/getProductData/${productId}`
    );

    return data;
  } catch (error) {
    console.log("Error while getting products");
  }
};

export const getInstallments = async (productValue, maxInstallments) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/asaas/installments/price/${productValue}/1/${maxInstallments}`
    );
    return data;
  } catch (error) {
    console.log("Error while getting installments", error);
  }
};

export const createCostumer = async (costumerData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/asaas/customers`,
      costumerData
    );

    return data;
  } catch (error) {
    console.log("Error while creating costumer");
  }
};

export const getBillet = async (billetData) => {
  try {
    console.log(billetData);

    const { data } = await axios.post(
      `${BASE_URL}/asaas/capture-payment/boleto`,
      billetData
    );

    return data;
  } catch (error) {
    console.log("Error while generating billet");
  }
};

export const getPixQrCode = async (billetData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/asaas/capture-payment/pix`,
      billetData
    );

    const pixId = data.id;

    const pixData = await axios.get(
      `${BASE_URL}/asaas/retrieve-pix-qr-code/${pixId}`
    );

    return [data, pixData.data];
  } catch (error) {
    console.log("Error while generating pix qrcode");
  }
};

export const getBilletCode = async (billetId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/asaas/retrieve-bankslip-barcode/${billetId}`
    );

    return data;
  } catch (error) {
    console.log("Error while generating barcode");
  }
};

export const generateTransaction = async (transactionData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/transactions`,
      transactionData
    );

    return data;
  } catch (error) {
    console.log("Erorr while generating transaction");
  }
};

export const captureCardPayment = async (cardData) => {
  try {
    const { data } = await axios.post(
      `${BASE_URL}/asaas/capture-payment/card`,
      cardData
    );

    return data;
  } catch (error) {
    console.log(error);
  }
};

export const getAllPixels = async (accountId, productId) => {
  try {
    const { data } = await axios.get(
      `${BASE_URL}/checkout/getFacebookPixel/${accountId}/${productId}`
    );

    return data.pixels;
  } catch (error) {
    console.log(error);
  }
};
