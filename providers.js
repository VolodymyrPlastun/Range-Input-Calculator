const providers = {
  backblazePricePerGB: {
    storage: 0.005,
    transfer: 0.01,
  },
  bunnyPricePerGB: {
    storage: {
      hdd: 0.01,
      ssd: 0.02,
    },
    transfer: 0.01,
  },
  scalewayPricePerGB: {
    storage: {
      multi: 0.06,
      single: 0.03,
    },
    transfer: 0.02,
  },
  vultrPricePerGB: {
    storage: 0.01,
    transfer: 0.01,
  },
};

export default providers;
