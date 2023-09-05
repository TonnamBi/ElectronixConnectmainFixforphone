document.addEventListener("DOMContentLoaded", function() {
    var units = parseFloat(localStorage.getItem("totalUnits"));
    var pricePerUnit = calculatePricePerUnit(units);
    var dailyPrice = units * pricePerUnit;
    var monthlyPrice = dailyPrice * 30; // Assuming 30 days in a month
  
    var dailyPriceContainer = document.getElementById("daily-price");
    dailyPriceContainer.textContent = "Daily Price: ฿" + dailyPrice.toFixed(2);
  
    var monthlyPriceContainer = document.getElementById("monthly-price");
    monthlyPriceContainer.textContent = "Monthly Price: ฿" + monthlyPrice.toFixed(2);
  });
  
  function calculatePricePerUnit(units) {
    if (units >= 15 && units <= 20) {
      return 2.3488;
  } else if (units > 20 && units <= 25) {
      return 2.9882;
  } else if (units > 26 && units <= 35) {
      return 3.2405;
  } else if (units > 36 && units <= 100) {
      return 3.6237;
  } else if (units > 101 && units <= 150) {
      return 3.7171;
  } else if (units > 151 && units <= 400) {
      return 4.2218;
  } else if (units > 401) {
      return 4.4217;
  } else {
      // Add conditions for other unit ranges and prices if needed
      return 2.50; // Default price per unit
  }
  }