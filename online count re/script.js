$(document).ready(function () {
  initial();
  cardClick();
});
function initial() {
  $(".cart").hide();
  $("#discounttitle").hide();
}
// Global Variable
let price;
let priceArray = [];
let quantity = [];
let codeArray = [];
let count = 0;
let discount = false;
let preQuantity;
let newQuantity;
function cardClick() {
  $(".card").click(function () {
    $(".cart").slideDown(1000);

    let alreadyExist = false;
    let image = $(this).find("img").attr("src");
    let pname = $(this).find(".pname").text();
    let code = $(this).find(".code").text();
    price = Number($(this).find(".price").text().replace("Ks ", ""));
    priceArray.push(price);
    quantity.push("1");

    for (let index = 0; index < codeArray.length; index++) {
      if (codeArray[index] == code) {
        alreadyExist = true;
        alert("This item is already Exist");
      }
    }
    if (!alreadyExist) {
      $(".calculateitem").append(`
        <div class="chooseItem">
            <img src="${image}" class="chooseItem_img" />
            <p class="chooseItem_name">
            ${pname}<br />
                <span  class="item_code">${code}</span>
            </p>
            <span  class="total_amount">[${price}]</span>
            <input type="text" class="chooseItem_count"  value="1"/>
            <img src="./bin.png" alt="" id="${count}" class="bin" />
          </div>
        `);
      codeArray.push(code);
      discountPrice();
      calculatePrice();
      count++;
    }
  });
}

$(document).on("focus", ".chooseItem_count", function () {
  preQuantity = $(this).val();
});
$(document).on("blur", ".chooseItem_count", function () {
  newQuantity = $(this).val();

  if (newQuantity < 1 || newQuantity > 9) {
    alert("Allow 1 to 9 quantity!");
    $(this).val(preQuantity);
  } else {
    let arrayNumber = Number($(this).next().attr("id"));
    console.log(typeof arrayNumber);
    console.log( $(this).next()[0].id)
    quantity[arrayNumber] = newQuantity;
    calculatePrice();
    $(this)
      .prev()
      .text(`[${priceArray[arrayNumber] * quantity[arrayNumber]}]`);
  }
});
// Calculate
function calculatePrice() {
  let totalPrice = 0;
  for (let index = 0; index < priceArray.length; index++) {
    totalPrice += priceArray[index] * quantity[index];
    $("#grand").text(totalPrice);
  }
  if (discount) {
    $("#discounttitle").show();
    var discountPrice = totalPrice * 0.1;
    $("#discountprice").text(discountPrice);
    var discountTotal = totalPrice - discountPrice;
    $("#grand").text(discountTotal);
  }
}
// Delete
$(document).on("click", ".bin", function () {
  $(this).parent().remove();
  codeArray[this.id] = "";
  quantity[this.id] = "";
  calculatePrice();
  if ($(".calculateitem").children().length == 0) {
    $(".cart").slideUp(1000);
  }
});
// Discount
function discountPrice() {
  let today = new Date();
  if (today.getDay() == 1 || today.getDay() == 6) {
    if (today.getHours() > 9 && today.getHours() <= 18) {
      discount = true;
    }
  }
}
