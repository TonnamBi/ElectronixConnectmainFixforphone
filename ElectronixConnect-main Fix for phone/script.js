function addAppliance(event) {
    event.preventDefault();
  
    var nameInput = document.getElementById("appliance-name");
    var powerInput = document.getElementById("power-consumption");
    var usageLevelSelect = document.getElementById("usage-level");
    var name = nameInput.value;
    var power = parseInt(powerInput.value);
    var usageLevel = parseInt(usageLevelSelect.value);
  
    if (name && power > 0 && usageLevel >= 1 && usageLevel <= 3) {
      var applianceList = document.getElementById("appliance-items");
      var newAppliance = document.createElement("li");
      newAppliance.textContent = name + " (Usage Level: " + usageLevel + ")";
      newAppliance.setAttribute("data-usage-level", usageLevel);
      applianceList.appendChild(newAppliance);
  
      nameInput.value = "";
      powerInput.value = "";
      usageLevelSelect.value = "";
  
      var existingAppliances = JSON.parse(localStorage.getItem("appliances")) || [];
      existingAppliances.push({ name, power, usageLevel });
      localStorage.setItem("appliances", JSON.stringify(existingAppliances));
    } else {
      alert("Please enter valid appliance details.");
    }
  }
  
  function calculateApplianceBudget() {
    var totalBudgetInput = document.getElementById("total-budget");
    var controlPriceInput = document.getElementById("control-price");
    var totalBudget = parseFloat(totalBudgetInput.value);
    var controlPrice = parseFloat(controlPriceInput.value);
  
    if (!isNaN(totalBudget) && totalBudget > 0 && !isNaN(controlPrice) && controlPrice > 0) {
      var applianceBudgets = document.getElementById("appliance-budgets");
      applianceBudgets.innerHTML = "";
  
      var appliances = JSON.parse(localStorage.getItem("appliances")) || [];
      var totalUsageLevels = 0;
      var usageLevelMap = new Map();
  
      // Group appliances based on their usage level and calculate the total usage levels
      appliances.forEach((appliance) => {
        totalUsageLevels += appliance.usageLevel;
        if (!usageLevelMap.has(appliance.usageLevel)) {
          usageLevelMap.set(appliance.usageLevel, {
            totalPower: 0,
            totalUsageHours: 0,
            appliances: [],
            importance: 1 / appliance.usageLevel // Assigning importance based on the usage level
          });
        }
        usageLevelMap.get(appliance.usageLevel).appliances.push(appliance);
      });
  
      var totalDailyElectricityConsumption = 0;
      var totalImportance = 0; // To calculate the total importance across all levels
  
      // Calculate the total importance across all levels
      usageLevelMap.forEach((usageLevelData) => {
        totalImportance += usageLevelData.importance;
      });
  
      // Calculate the budget allocation, daily electricity consumption, and mean usage hours for each appliance
      usageLevelMap.forEach((usageLevelData, level) => {
        var levelBudget = (usageLevelData.importance / totalImportance) * totalBudget;
        var dailyElectricityConsumptionForLevel = (usageLevelData.importance / totalImportance) * controlPrice;
        totalDailyElectricityConsumption += dailyElectricityConsumptionForLevel;
  
        var totalPowerForLevel = 0;
  
        // Calculate the total power consumption for each usage level
        usageLevelData.appliances.forEach((appliance) => {
          totalPowerForLevel += appliance.power;
        });
  
        // Calculate the mean usage hours for each level with the assigned weight
        var meanUsageHoursForLevel = (usageLevelData.importance / totalImportance) * (dailyElectricityConsumptionForLevel / totalPowerForLevel);
  
        var resultElement = document.createElement("p");
        resultElement.textContent =
          "Usage Level " + level + " Budget: $" + levelBudget.toFixed(2) +
          " | Daily Electricity Consumption: " + dailyElectricityConsumptionForLevel.toFixed(2) + " units" +
          " | Mean Usage Hours: " + meanUsageHoursForLevel.toFixed(2) + " hours";
        applianceBudgets.appendChild(resultElement);
      });
  
      var totalElectricityElement = document.createElement("p");
      totalElectricityElement.textContent = "Total Daily Electricity Consumption: " + totalDailyElectricityConsumption.toFixed(2) + " units";
      applianceBudgets.appendChild(totalElectricityElement);
    } else {
      alert("Please enter valid total budget and control price.");
    }
  }
  
  function clearAppliances() {
  // Clear the appliance list in the HTML
  var applianceList = document.getElementById("appliance-items");
  applianceList.innerHTML = "";

  // Clear the appliances stored in localStorage
  localStorage.removeItem("appliances");
}  