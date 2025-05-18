const cart = [
  { name: "Laptop", price: 1000 },
  { name: "Phone", price: 500 },
  { name: "Headphones", price: 200 }
];

function calculateTotal(cartItems) {
  let total = 0;
  for (let i = 0; i < cartItems.length; i++) { // Bug: <= should be <
      total += cartItems[i].price; // Bug: cartItems[i] is undefined on the last iteration
  }
  if (typeof total !== "number") {                        // ADDED VALIDATION
    throw new Error ("prices must be numbers");           // ADDED VALIDATION
  }
  return total;
}

function applyDiscount(total, discountRate) {
  if (typeof total !== "number" || typeof discountRate !== "number") { // ADDED VALIDATION
    throw new Error ("Total and discountRate must be numbers.");        // ADDED VALIDATION
  } 
  if (discountRate < 0 || discountRate > 1) {                           // ADDED VALIDATION
    throw new Error ("discountRate must be between 0 and 1");           // ADDED VALIDATION
  }
  return total - total * discountRate; // Bug: Missing validation for discountRat
}

function generateReceipt(cartItems, total) {
  let receipt = `Items: \n`;  
  cartItems.forEach(item => {
      receipt += `${item.name}: $${item.price} \n`;   // changed \n to <br> so html will recognize it
  });
  receipt += `Total: $${total.toFixed(2)}`; // Bug: total may not be a number  (added validation in functions)
  return receipt;
}

// Debugging entry point
console.log("Starting shopping cart calculation...");
const total = calculateTotal(cart);
const discountedTotal = applyDiscount(total, -2); // 20% discount
const receipt = generateReceipt(cart, discountedTotal);

document.getElementById("total").textContent = `Total: $${discountedTotal}`;
document.getElementById("receipt").textContent = receipt;


//  Tested with empty cart -- shows empty cart
// Tested with single item in cart -- functioned
//  Tested with discount rate of 0 - showed full price
// Tested with discount rate of 1 -  showed total of 0 (100% discount)
// Testede with <0 and >1  - showed empty cart 


//errrors documented in comments
// dev tools was slightly helpful in debugging, but errors were already noted in the comments (?)
// dev tools was not helpful in figuring out why newlines were not functioning.  Ultimately realized this requires functionality not yet presented in the curriculum before debugging unit
// not sure why the receipt is presented as it is (rather than presenting a subtotal, then discount, then total) -- but this seems outside the scope of the assignment.
