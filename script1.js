// global variable

let today = new Date();
let discount = false;
let codeArray = [];
let count = 0;
let price = [];
let quantity = [];
let noItem = 0;
$(document).ready(function () {
  initial();
  checkWeekend();

  function initial() {
    $(".cart").hide();
    $("#discounttitle").hide();
    $("#discountprice").hide();
  }

  // when item is choosed
  $(".card").click(function () {
    $(".cart").slideDown(2000);

    let alreadyExist = false;

    let img = $(this).find("img").attr("src");
    let pname = $(this).find(".pname").text();
    let code = $(this).find(".code").text();
    let priceText = $(this).find(".price").text();

    // item is already exit or not
    for (let index = 0; index < codeArray.length; index++) {
      if (codeArray[index] == code) {
        alert("Item was alredy exist!");
        alreadyExist = true;
      }
    }
    if (!alreadyExist) {
      codeArray.push(code);
      quantity.push(1);
      noItem++;

      console.log(codeArray);
      console.log(quantity);
      price.push(Number(priceText.replace("Ks ", "")));

      $(".calculateitem").append(`
      <div class="chooseItem">
          <img src="${img}" class="chooseItem_img" />
         <p class="chooseItem_name">
         ${pname}<br />
         <span  class="item_code">${code}</span>
       </p>
          <input type="text" class="chooseItem_count" id= "$2" value="1"/>
          <img src="./bin.png" alt="" id="${count}" class="chooseItem_bin" />
        </div>
      `);

      count++;
      calculate();
    }
  });

  // delete item
  $(document).on("click", ".chooseItem_bin", function () {
    noItem--;
    codeArray[this.id] = "";
    quantity[this.id] = 0;
    $(this).closest(".chooseItem").remove();

    // if there is no choosen item "cart" slideUp close .
    if (noItem == 0) {
      $(".cart").slideUp(2000);
    }

    calculate();
  });
});

// Calculate Price
function calculate() {
  let itemPrice = 0;
  let discountPrice = 0;
  let grand = 0;

  for (let index = 0; index < price.length; index++) {
    itemPrice += price[index] * quantity[index];

    // Getting Discount
    if (discount) {
      discountPrice = Math.round(itemPrice * 0.15);
      grand = itemPrice - discountPrice;
    } else {
      grand = Math.round(itemPrice);
    }
    $("#discountprice").text("Ks" + discountPrice);
    $("#grand").text("Ks " + grand);
  }
}

// Checking Weekend for discount
function checkWeekend() {
  if (today.getDay() == 0 || today.getDay() == 6) {
    if (today.getHours() >= 9 && today.getHours() <= 17) {
      // Get Discount
      $("#discounttitle").show();
      $("#discountprice").show();
      discount = true;
    }
  }
}
