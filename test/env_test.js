//const { test, describe, it } = require('node:test');
const assert = require('assert');
const { tiMonth, fuelEnergySelector, fuelConsumption, combustionConsumption, electricalConsumption, fuelEfficiency, fuelCostKm, energyKm, emisionKm, savedEnergy, avoidedEmissions, monthlySavings, annualSavings, youngTree, oldTree, energyH2Cylinders, energyH2LowPresure, energyConsumed, hydrogenMass, litersRequired } = require("../calculators/environment");
const { dummyDataset } = require('../database/dummyDatasets');
const data = dummyDataset();

const electrical_consumption = electricalConsumption(81.14, 200)
const combustion_consumption = combustionConsumption(electrical_consumption)
const fuel_selector = fuelEnergySelector("Diesel")


describe('env_ipc', () => {
  it("Calcular ipc", () => {
    assert.strictEqual(tiMonth(2.8), 0.0023039138595752906)
  })
})

describe("FuelEnergySelector colection", () => {
  it("gasoline case", () => {
    assert.deepStrictEqual(fuelEnergySelector("gasoline"), {
      "fuel_price": 16700,
      "fuel_energy": 35.58,
      "emision_factor": 69.25
    })
  })

  it("diesel case", () => {
    assert.deepStrictEqual(fuelEnergySelector("diesel"), {
      "fuel_price": 11795,
      "fuel_energy": 40.7,
      "emision_factor": 74.01
    })
  })
})


// electricalConsumption
describe("electricalConsumption test", () => {
  it("Debe calcular correctamente el consumo electrico", () => {
    const nominal_energy = 81.14
    const autonomy_nominal = 14.7

    assert.strictEqual(electricalConsumption(nominal_energy, autonomy_nominal), 6.133030990173848)
  })
})


// costElectricalKM
describe("costElectricalKM", () => {
  it('Debe obtener el costElectricalKM', () => {
    assert.strictEqual(tiMonth(2.8), 0.0023039138595752906)
  })
})

describe("combustionConsumption", () => {
  it('PASS: debe de calcular correctamente el consumo de combustion', () => {
    const electrical_consumption = 6.133030990173848
    const valor_esperado = 22.71492959323647
    const fun = combustionConsumption(electrical_consumption)

    assert.strictEqual(fun, valor_esperado)
  })

  it('FAIL: La prueba falla porque los valores no coinciden', () => {
    const electrical_consumption = 0.1330309912356
    const valor_esperado = 22.71492959323647
    const fun = combustionConsumption(electrical_consumption)

    assert.strictEqual(fun, valor_esperado)
  })
})

// fuelConsumption
describe("Test de todos los fuel", () => {
  const arrayfuelEnergySelector = fuelEnergySelector('gasoline')
  const fuel_consumption = 0.6384184821033297

  it('fuelConsumption, debe de calcular correctamente su valor', () => {
    //parametros
    const combustion_consumption = 22.71492959323647
    const fuel_energy = arrayfuelEnergySelector["fuel_energy"]
    const valor_esperado = 0.6384184821033297
    const fun = fuelConsumption(combustion_consumption, fuel_energy)

    //funciton
    assert.strictEqual(fun, valor_esperado)
  })

  it('fuelEfficiency, debe de calcular que su valor sea correcto', () => {
    const fun = fuelEfficiency(fuel_consumption)
    const expected = 1.566370692630022

    assert.strict(fun, expected)
  })

  it('fuelCostKm, debe de calcular que su valor sea correcto', () => {
    const fuel_price = arrayfuelEnergySelector["fuel_price"]
    const f = fuelCostKm(fuel_price, fuel_consumption)
    const expected = 10661.588651125607

    assert.strictEqual(f, expected)
  })
})

describe("energyKm test", () => {
  it("Debe calcular su valor correctamente", () => {
    const combustion_consumption = 22.71492959323647
    const f = energyKm(combustion_consumption)
    const expected = 81773746.5356513

    assert.strictEqual(f, expected)
  })
})

describe("emisionKm test", () => {
  it('Debe de calcular correctamente el valor', () => {

    const emision_factor = data["emision_factor_gasoline"]
    const energy_Km = 81773746.5356513
    const expected = 5662.831947593852
    const f = emisionKm(emision_factor, energy_Km)


    assert.strictEqual(f, expected)
  })
})

describe("savedEnergy test", () => {
  it('Debe de calcular correctamente el valor', () => {
    const combustion_consumption = 22.71492959323647
    const electrical_consumption = 6.133030990173848
    const annual_use = 100
    const expected = 1658.1898603062623
    const f = savedEnergy(combustion_consumption, electrical_consumption, annual_use)

    assert.strictEqual(f, expected)
  })
})

describe("avoidedEmissions test", () => {
  const emisiones_km = 5662.831947593852
  const expected = 0.5662831947593852

  it('PASS: Debe de calcular el valor correctamente', () => {
    const annual_use = 100
    const f = avoidedEmissions(emisiones_km, annual_use)

    assert.strictEqual(f, expected)
  })

  it('FAIL: Arroja error por no coincider los valores', () => {
    const annual_use = 101
    const f = avoidedEmissions(emisiones_km, annual_use)

    assert.strictEqual(f, expected)
  })

  it.skip('SKIPPED: Se omite temporalmente', () => {
    const annual_use = 100
    const f = avoidedEmissions(emisiones_km, annual_use)

    assert.strictEqual(f, expected)
  })
})

describe("monthlySavings test", () => {
  it('Debe de calcular el valor correctamente', function () {
    const fuel_cost_km = 10661.588651125607
    const cost_electrical_km = 613.3030990173847
    const annual_use = 100
    const expected = 83735.71293423518

    const f = monthlySavings(fuel_cost_km, cost_electrical_km, annual_use)

    assert.strictEqual(f, expected)
  })
})

describe("annualSavings test", () => {
  it("Debe de calcular el valor correctamente", function () {
    const monthly_savings = 83735.71293423518
    const ipc = tiMonth(parseFloat(5.18))
    const expected = 1028467.333180506

    const f = annualSavings(monthly_savings, ipc)

    assert.strictEqual(f, expected)
  })
})

describe("youngTree test", () => {
  it('Debe de calcular el valor correctamente', function () {
    const avoided_emissions = 0.5662831947593852
    const expected = 56

    const f = youngTree(avoided_emissions)

    assert.strictEqual(f, expected)
  })
})

describe("oldTree test", () => {
  it('Debe calcular el valor correctamente', () => {
    const avoided_emissions = 0.5662831947593852
    const expected = 18

    const f = oldTree(avoided_emissions)

    assert.strictEqual(f, expected)
  })
})

describe("Test de todos los energy", () => {
  it('energyH2Cylinders, Debe de calcular correctamente el valor', () => {
    const nominal_energy = 1
    const expected = 1.8518518518518516


    const f = energyH2Cylinders(nominal_energy)

    assert.strictEqual(f, expected)
  })

  it('energyH2LowPresurem, debe calcular correctamente el valor', () => {
    const energy_H2_Cylinders = 1.8518518518518516
    const expected = 1.949317738791423

    const f = energyH2LowPresure(energy_H2_Cylinders)

    assert.strictEqual(f, expected)
  })

  it('energyConsumed, debe calcular correctamente el valor', () => {
    const energy_H2_low_presure = 1.949317738791423
    const expected = 2.5648917615676616

    const f = energyConsumed(energy_H2_low_presure)

    assert.strictEqual(f, expected)
  })
})

describe("hydrogenMass", () => {
  it('Debe calcular el valor correctamente', () => {
    const energy_H2_Low_Presure = 1.949317738791423
    const expected = 0.05848538070181287

    const f = hydrogenMass(energy_H2_Low_Presure)

    assert.strictEqual(f, expected)
  })
})

describe("litersRequired test", () => {
  it('Debe calcular el valor correctamente', () => {
    const hydrogen_mass = 0.05848538070181287
    const expected = 0.5263684263163159

    const f = litersRequired(hydrogen_mass)

    assert.strictEqual(f, expected)
  })
})