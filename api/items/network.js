const { Router } = require("express");
const response = require("../../network/response");
const router = Router();
const ctrl = require("./index");
const { areaCirculo, operacion } = require("../../calculators/calculo1");
const dummyDataset = require("../../database/dummyDatasets");
const data = dummyDataset.dummyDataset();

const {
    tiMonth,
    fuelEnergySelector,
    electricalConsumption,
    costElectricalKM,
    combustionConsumption,
    fuelConsumption,
    fuelEfficiency,
    fuelCostKm,
    energyKm,
    emisionKm,
    savedEnergy,
    avoidedEmissions,
    monthlySavings,
    annualSavings,
    youngTree,
    oldTree,
    energyH2Cylinders,
    energyH2LowPresure,
    energyConsumed,
    hydrogenMass,
    litersRequired,
} = require("../../calculators/environment");

const tableInjected = "my_table";

router.get("/enviroment/:ipc/:fuel/", async (req, res) => {
    try {
        let list = {};
        const annual_use = 100;
        const ipc = tiMonth(parseFloat(req.params.ipc));
        const fes = fuelEnergySelector(req.params.fuel);
        const electrical_consumption = electricalConsumption(81.14, 14.7);
        const cost_electrical_km = costElectricalKM(electrical_consumption, 100);
        const combustion_consumption = combustionConsumption(
            electrical_consumption
        );
        const fuel_consumption = fuelConsumption(
            combustion_consumption,
            fes["fuel_energy"]
        );
        const fuel_efficiency = fuelEfficiency(fuel_consumption);
        const fuel_cost_km = fuelCostKm(fes["fuel_price"], fuel_consumption);
        const energy_km = energyKm(combustion_consumption);
        const emision_km = emisionKm(data["emision_factor_gasoline"], energy_km);
        const saved_energy = savedEnergy(
            combustion_consumption,
            electrical_consumption,
            annual_use
        );
        const avoided_emissions = avoidedEmissions(emision_km, annual_use);
        const monthly_savings = monthlySavings(
            fuel_cost_km,
            cost_electrical_km,
            annual_use
        );
        const annual_savings = annualSavings(monthly_savings, ipc);
        const young_tree = youngTree(avoided_emissions);
        const old_tree = oldTree(avoided_emissions);
        const energy_H2_cylinders = energyH2Cylinders(1);
        const energy_H2_low_presure = energyH2LowPresure(energy_H2_cylinders);
        const energy_consumed = energyConsumed(energy_H2_low_presure);
        const hydrogen_mass = hydrogenMass(energy_H2_low_presure);
        const liters_required = litersRequired(hydrogen_mass);

        list["it_month"] = ipc;
        list["fuel_energy_selector"] = fes;
        list["electrical_consumption"] = electrical_consumption;
        list["cost_electrical_km"] = cost_electrical_km;
        list["combustion_consumption"] = combustion_consumption;
        list["fuel_consumption"] = fuel_consumption;
        list["fuel_efficiency"] = fuel_efficiency;
        list["fuel_cost_km"] = fuel_cost_km;
        list["energy_km"] = energy_km;
        list["emision_km"] = emision_km;
        list["save_energy"] = saved_energy;
        list["avoided_emissions"] = avoided_emissions;
        list["monthly_savings"] = monthly_savings;
        list["annual_savings"] = annual_savings;
        list["young_tree"] = young_tree;
        list["old_tree"] = old_tree;
        list["energy_H2_cylinders"] = energy_H2_cylinders;
        list["energy_H2_low_presure"] = energy_H2_low_presure;
        list["energy_consumed"] = energy_consumed;
        list["hydrogen_mass"] = hydrogen_mass;
        list["liters_required"] = liters_required;

        response.success(req, res, list, 200);
    } catch (error) {
        response.error(req, res, error.message, 500);
    }
});

module.exports = router;
