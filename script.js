let today = new Date();
let discount = false;
let item_code_array = [];
let count = 0;
let price = [];
let quantity = [];
let item_count = 0;
let no_item = 0;
let item_count_value = 1;
let old_value = 1;

$(document).ready(function () {
  initial();
  cardClick();
});
function initial() {
  $(".cart").hide();
  $("#discounttitle").hide();
  $("#discountprice").hide();
  checkWeekend();
}
function checkWeekend() {
  if (today.getDay() == 3 || today.getDay() == 6) {
    if (today.getHours() >= 9 && today.getHours() <= 24) {
      $("#discounttitle").show();
      $("#discountprice").show();
      discount = true;
    }
  }
}
// Choose Item
function cardClick() {
  $(".card").click(function () {
    $(".cart").slideDown(1500);
    no_item++;
    let alreadyExist = false;
    let img = $(this).find("img").attr("src");
    let item_name = $(this).find(".pname").text();
    let item_code = $(this).find(".code").text();
    item_price = $(this).find(".price").text();
    price.push(Number(item_price.replace("Ks ", "")));
    quantity.push(1);
    console.log(price);
    console.log(quantity);

    for (let index = 0; index < item_code_array.length; index++) {
      if (item_code_array[index] == item_code) {
        alert("Item has already Exist !");
        alreadyExist = true;
      }
    }
    if (!alreadyExist) {
      item_code_array.push(item_code);
      $(".calculateitem").append(`
      <div class="chooseItem">
          <img src="${img}" class="chooseItem_img" />
         <p class="chooseItem_name">
         ${item_name}<br />
         <span  class="item_code">${item_code}</span>
       </p>
          <input type="text" class="chooseItem_count" id= "${item_count}" value="1"/>
          <img src="./bin.png" alt="" id="${count}" class="chooseItem_bin" />
        </div>
      `);
      console.log($(".chooseItem")[0].childNodes[3].childNodes[3].innerText);
      item_count++;
      count++;
      calculatePrice();
    }
  });
}
function calculatePrice() {
  let itemTotal = 0;
  let discountPrice = 0;
  let totalAmount = 0;
  for (let index = 0; index < price.length; index++) {
    itemTotal += price[index] * quantity[index];
  }
  if (discount) {
    discountPrice = itemTotal * 0.15;
    $("#discountprice").text("Ks " + Math.round(discountPrice));
    $("#grand").text("Ks " + Math.round(totalAmount));
  }
  totalAmount = itemTotal - discountPrice;
  $("#grand").text("Ks " + Math.round(totalAmount));
}
// Delete
$(document).on("click", ".chooseItem_bin", function () {
  no_item--;
  if (no_item == 0) {
    $(".cart").slideUp(2000);
  }
  item_code_array[this.id] = "";
  quantity[this.id] = 0;

  console.log(item_code_array);
  console.log(quantity);
  $(this).closest(".chooseItem").remove();
  console.log(item_code_array);
  calculatePrice();
});
// Change Item Count
$(document).on("focus", ".chooseItem_count", function () {
  $(".chooseItem_count").keyup(function () {
    item_count_value = $(this).val();
    if (item_count_value >= 1 && item_count_value < 10) {
      quantity[this.id] = item_count_value;
      calculatePrice();
    }
  });
  old_value = $(this).val();
});
$(document).on("blur", ".chooseItem_count", function () {
  if (item_count_value < 1 || item_count_value >= 10) {
    alert("please order between 1 to 9 !");
    $(this).val(`${old_value}`);
    quantity[this.id] = old_value;
    calculatePrice();
  }
});
