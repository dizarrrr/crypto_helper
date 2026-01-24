const car = {
    brand: 'BMW',
}

function showBrand() {
    console.log(this.brand)
}

showBrand.call(car)