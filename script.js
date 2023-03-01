import providers from "./providers.js";

const storageValue = document.querySelector(".range-inputs__storage-value");
const transferValue = document.querySelector(".range-inputs__transfer-value");
const storageInput = document.querySelector(".range-inputs__storage");
const transferInput = document.querySelector(".range-inputs__transfer");
const chartBar = document.querySelectorAll(".chart-list__bar");
const chartPrice = document.querySelectorAll(".chart-list__price");

const hdd = document.querySelector(".hdd");
const ssd = document.querySelector(".ssd");
const multi = document.querySelector(".multi");
const single = document.querySelector(".single");

storageValue.textContent = storageInput.value + " GB";
transferValue.textContent = transferInput.value + " GB";
changePrice();
resize();

function resize() {
  chartBar.forEach((item, index) => {
    switch (index) {
      case 0:
        item.style.height = `${(backblazePrice() / 15) * 100}%`;
        item.style.backgroundColor = "red";
        break;
      case 1:
        item.style.height = `${(bunnyPrice() / 10) * 100}%`;
        item.style.backgroundColor = "orange";
        break;
      case 2:
        item.style.height = `${(scalewayPrice() / 74) * 100}%`;
        item.style.backgroundColor = "purple";
        break;
      case 3:
        item.style.height = `${(vultrPrice() / 20) * 100}%`;
        item.style.backgroundColor = "lightblue";
        break;
      default:
        break;
    }
  });
}

function backblazePrice() {
  const { storage, transfer } = providers.backblazePricePerGB;
  const minPrice = 7;
  let finalPrice;
  const price = (
    storageInput.value * storage +
    transferInput.value * transfer
  ).toFixed(2);
  if (price < minPrice) {
    finalPrice = minPrice.toFixed(2);
  } else {
    finalPrice = price;
  }
  return finalPrice;
}

function bunnyPrice() {
  const { storage, transfer } = providers.bunnyPricePerGB;
  const maxPrice = 10;
  let price;
  let finalPrice;
  if (hdd.checked) {
    price = (
      storageInput.value * storage.hdd +
      transferInput.value * transfer
    ).toFixed(2);
  }
  if (ssd.checked) {
    price = (
      storageInput.value * storage.ssd +
      transferInput.value * transfer
    ).toFixed(2);
  }
  if (price < maxPrice) {
    finalPrice = price;
  } else {
    finalPrice = maxPrice.toFixed(2);
  }
  return finalPrice;
}

function scalewayPrice() {
  const { storage, transfer } = providers.scalewayPricePerGB;
  let finalPrice;
  let price;

  if (multi.checked) {
    price = (
      (storageInput.value - 75) * storage.multi +
      (transferInput.value - 75) * transfer
    ).toFixed(2);
  } else if (single.checked) {
    price = (
      (storageInput.value - 75) * storage.single +
      (transferInput.value - 75) * transfer
    ).toFixed(2);
  }

  if (storageInput.value < 75 && transferInput.value < 75) {
    finalPrice = 0;
  } else if (storageInput.value < 75) {
    finalPrice = ((transferInput.value - 75) * transfer).toFixed(2);
  } else if (transferInput.value < 75) {
    finalPrice = (
      (storageInput.value - 75) *
      (multi.checked ? storage.multi : storage.single)
    ).toFixed(2);
  } else {
    finalPrice = price;
  }
  return finalPrice;
}

function vultrPrice() {
  const { storage, transfer } = providers.vultrPricePerGB;
  let finalPrice = 0;
  const minPrice = 5;
  const price = (
    storageInput.value * storage +
    transferInput.value * transfer
  ).toFixed(2);
  if (price < minPrice) {
    finalPrice = minPrice;
  } else {
    finalPrice = price;
  }
  return finalPrice;
}

function changePrice() {
  chartPrice.forEach((item, index) => {
    switch (index) {
      case 0:
        item.textContent = backblazePrice();
        break;
      case 1:
        item.textContent = bunnyPrice();
        break;
      case 2:
        item.textContent = scalewayPrice();
        break;
      case 3:
        item.textContent = vultrPrice();
        break;
      default:
        break;
    }
  });
}

storageInput.addEventListener("input", changeInputValue);
transferInput.addEventListener("input", changeInputValue);
hdd.addEventListener("change", pickOption);
ssd.addEventListener("change", pickOption);
multi.addEventListener("change", pickOption);
single.addEventListener("change", pickOption);

function pickOption() {
  changePrice();
  resize();
}

function changeInputValue() {
  storageValue.textContent = storageInput.value + " GB";
  transferValue.textContent = transferInput.value + " GB";
  changePrice();
  resize();
}
