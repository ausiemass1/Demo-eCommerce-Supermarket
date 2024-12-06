$(document).ready(function () {
  $(".modal").modal();
  $(".sidenav").sidenav();
  $(".collapsible").collapsible();
});

function toggleModal() {
  var instance = M.modal.getInstance($("modal1"));
  instance.open();
}

// document.addEventListener('DOMContentLoaded', function() {
//   var elems = document.querySelectorAll('.carousel');
//   var instances = M.Carousel.init(elems, {
//     noWrap: true,
//     indicators: true
//   });
// });

document.addEventListener("DOMContentLoaded", function () {
  const elems = document.querySelectorAll(".carousel");
  const instances = M.Carousel.init(elems, {
    duration: 200, // Animation duration in ms
    dist: -100, // Perspective zoom (negative values pull items closer)
    shift: 0, // Space between items
    padding: 20, // Padding between items
    numVisible: 3, // Number of visible items
    indicators: true, // Show navigation dots
    fullWidth: false, // Enable full-width carousel
  });

  // Optional: Auto-advance slides
  setInterval(() => {
    instances.forEach((instance) => instance.next());
  }, 3000); // Change every 3 seconds
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".dropdown-trigger");
  var instances = M.Dropdown.init(elems, {
    coverTrigger: false,
    hover: true,
  });
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll(".tooltipped");
  var instances = M.Tooltip.init(elems);
});

document.addEventListener("DOMContentLoaded", function () {
  var elems = document.querySelectorAll("select");
  var instances = M.FormSelect.init(elems);
});

const cartToggleBtn = document.getElementById("cart-toggle");
const cartSidebar = document.getElementById("cart-sidebar");
// Toggle Cart Sidebar
cartToggleBtn.addEventListener("click", () => {
  cartSidebar.classList.toggle("hidden");
  cartSidebar.classList.toggle("visible");
});

// search functionality
function searchAllText() {
  // get text from search box
  let searchText = document.getElementById("search").value.toLowerCase();
  //get all elements from the body
  let elements = document.querySelectorAll("body *");
  //get only text elements
  elements.forEach((element) => {
    if (!element.children.length && element.textContent.trim()) {
      let text = element.textContent.toLowerCase();
      if (text.includes(searchText)) {
        element.style.display = "";
      } else {
        element.style.display = none;
      }
    }
  });
}


//============Google pay functionality============//

const paymentsClient = new google.payments.api.PaymentsClient({ environment: 'TEST' });
    
const paymentRequest = {
  apiVersion: 2,
  apiVersionMinor: 0,
  allowedPaymentMethods: [
    {
      type: 'CARD',
      parameters: {
        allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
        allowedCardNetworks: ['VISA', 'MASTERCARD']
      },
      tokenizationSpecification: {
        type: 'PAYMENT_GATEWAY',
        parameters: {
          gateway: 'example', // Use a stripe / paypal for production. take note that paypal is more popular that stripe but stipe is popular in NZ
          gatewayMerchantId: 'your-gateway-merchant-id'
        }
      }
    }
  ],
  merchantInfo: {
    merchantId: 'your-merchant-id',
    merchantName: 'Example Merchant'
  },
  transactionInfo: {
    totalPriceStatus: 'FINAL',
    totalPrice: '100.00',
    currencyCode: 'USD',
    countryCode: 'US'
  }
};

function onGooglePayLoaded() {
  const button = paymentsClient.createButton({
    onClick: onGooglePayButtonClicked
  });
  document.getElementById('container').appendChild(button);
}

function onGooglePayButtonClicked() {
  paymentsClient.loadPaymentData(paymentRequest)
    .then(paymentData => {
      // Send payment data to your server
      fetch('/process-payment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(paymentData)
      });
    })
    .catch(err => console.error('Google Pay error:', err));
}

onGooglePayLoaded();

//===================

