
const areaCirculo = (radio) => {
    const area = 3.14 * (radio ** 2)
    return area
}


const operacion = (Num1,Num2) => {
    return (parseInt(Num1) + parseInt(Num2));
}

module.exports = {
    areaCirculo,
    operacion
}