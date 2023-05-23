export const purchaseEvent = (purchaseValue, paymentMethod) => {
  window.fbq("track", "Purchase", {
    currency: "BRL",
    value: purchaseValue,
    paymentMethod: paymentMethod,
  });

  window.ttq.track("CompletePayment");
};
