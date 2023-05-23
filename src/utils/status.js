function getAllStatuses() {
  const statuses = [
    {
      status: "PENDING",
      alias: "Aguardando pagamento",
      html_badge: "Aguardando pagamento",
    },
    {
      status: "RECEIVED",
      alias: "Recebido",
      html_badge: "Recebido",
    },
    {
      status: "CONFIRMED",
      alias: "Confirmado",
      html_badge: "Confirmado",
    },
    {
      status: "OVERDUE",
      alias: "Vencido",
      html_badge: "Vencido",
    },

    {
      status: "REFUNDED",
      alias: "Estornado",
      html_badge: "Estornado",
    },

    {
      status: "RECEIVED_IN_CASH",
      alias: "Recebido em dinheiro",
      html_badge: "Recebido em dinheiro",
    },
    {
      status: "REFUND_REQUESTED",
      alias: "Estorno solicitado",
      html_badge: "Estorno solicitado",
    },

    {
      status: "REFUND_IN_PROGRESS",
      alias: "Estorno em processamento",
      html_badge: "Estorno em processamento",
    },

    {
      status: "CHARGEBACK_REQUESTED",
      alias: "Recebido chargeback",
      html_badge: "Recebido chargeback",
    },

    {
      status: "CHARGEBACK_DISPUTE",
      alias: "Em disputa de chargeback",
      html_badge: "Em disputa de chargeback",
    },

    {
      status: "AWAITING_CHARGEBACK_REVERSAL",
      alias: "Aguardando estorno do chargeback",
      html_badge: "Aguardando estorno do chargeback",
    },

    {
      status: "DUNNING_RECEIVED",
      alias: "Recuperada",
      html_badge: "Recuperada",
    },
    {
      status: "DUNNING_REQUESTED",
      alias: "Em processo de negativação",
      html_badge: "Em processo de negativação",
    },

    {
      status: "AWAITING_RISK_ANALYSIS",
      alias: "Pagamento em análise",
      html_badge: "Pagamento em análise",
    },
  ];

  return statuses;
}

export function getFriendlyStatus(status) {
  const statuses = getAllStatuses();
  const filtered = statuses.filter((val) => val.status == status);
  return filtered.length > 0 ? filtered[0] : null;
}
