// global variable

let today = new Date();
let discount = false;
let codeArray = [];
let count = 0;
$(document).ready(function () {
  initial();

  $(".card").click(function () {
    $(".cart").slideDown(2000);

    let alreadyExist = false;

    let img = $(this).find("img").attr("src");
    let pname = $(this).find(".pname").text();
    let code = $(this).find(".code").text();
    let price = $(this).find(".price").text();

    for (let index = 0; index < codeArray.length; index++) {
      if (codeArray[index] == code) {
        alert("Item was alredy exist!");
        alreadyExist = true;
      }
    }

    if (!alreadyExist) {
      codeArray.push(code);

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

  $(document).on("click", ".chooseItem_bin", function () {
    codeArray[this.id] = "";
    $(this).closest(".chooseItem").remove();
    calculate();
  });
});

function calculate() {}

function initial() {
  $(".cart").hide();
  $("#discounttitle").hide();
  $("#discountprice").hide();
}

// Checking Weekend for discount
function checkWeekend() {
  if (today.getDay() == 0 || today.getDay() == 6) {
    if (today.getHours() >= 9 && today.getHours <= 17) {
      // Get Discount
      $("#discounttitle").show();
      $("#discountprice").show();
      discount = true;
    }
  }
}
