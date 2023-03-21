/**
 * @file index.js
 */

/**
 * @class CoffeeMachine
 * @description A coffee machine that can make coffee and cappuccino
 */
class CoffeeMachine {
    /**
     * @constructor
     * @description Initialize the coffee machine
     * @param {number} waterLevel - The water level in the machine, default to 0
     * @param {number} coffeeLevel - The coffee level in the machine, default to 0
     * @param {number} milkLevel - The milk level in the machine, default to 0
     * @param {boolean} isHeating - The heating state of the machine, default to false
     */
    constructor() {
        this.waterLevel = 0;
        this.coffeeLevel = 0;
        this.milkLevel = 0;
        this.isHeating = false;
    }

    /**
     * @description Check if the machine has enough ingredients to make a drink
     * @param {string} drinkType 
     * @returns Promise
     */
    checkIngredients(drinkType) {
        return new Promise((resolve, reject) => {
            if (drinkType === 'café') {
                if (this.waterLevel < 50 || this.coffeeLevel < 10) {
                    reject('Impossible de préparer un café. 🛑');
                } else {
                    resolve();
                }
            } else if (drinkType === 'cappuccino') {
                if (this.waterLevel < 50 || this.coffeeLevel < 10 || this.milkLevel < 20) {
                    reject('Impossible de préparer un cappuccino. 🛑');
                } else {
                    resolve();
                }
            } else {
                reject(`La boisson "${drinkType}" n'est pas prise en charge. 🛑`);
            }
        });
    }

    /**
     * @description Refill the water tank
     * @param {number} amount 
     */
    refillWater(amount) {
        this.waterLevel += amount;
    }

    /**
     * @description Refill the coffee tank
     * @param {number} amount 
     */
    refillCoffee(amount) {
        this.coffeeLevel += amount;
    }

    /**
     * @description Refill the milk tank
     * @param {number} amount 
     */
    refillMilk(amount) {
        this.milkLevel += amount;
    }

    /**
     * @description Heat the water
     * @returns Promise
     */
    heatWater() {
        return new Promise((resolve, reject) => {
            if (this.waterLevel === 0) {
                reject('Veuillez remplir le réservoir d\'eau 💦');
            } else {
                if (!this.isHeating) {
                    setTimeout(() => {
                        this.isHeating = true;
                        console.log('L\'eau est chaude 💧');
                        resolve();
                    }, 3000);
                } else {
                    resolve();
                }
            }
        });
    }

    /**
     * @description Grind the coffee
     * @returns Promise
     */
    grindCoffee() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.coffeeLevel -= 10;
                console.log('Le café est moulu 🍵');
                resolve();
            }, 2000);
        });
    }

    /**
     * @description Extract the espresso
     * @returns Promise
     */
    extractEspresso() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.waterLevel -= 50;
                console.log('L\'espresso est extrait 🔥');
                resolve();
            }, 3000);
        });
    }

    /**
     * @description Steam the milk
     * @returns Promise
     */
    steamMilk() {
        return new Promise((resolve) => {
            setTimeout(() => {
                this.milkLevel -= 20;
                console.log('Le lait est chauffé et moussé 🥛');
                resolve();
            }, 3000);
        });
    }

    /**
     * @description Prepare a drink (coffee or cappuccino) and display a message when it's ready
     * @param {string} drinkType 
     */
    prepareDrink(drinkType) {
        return this.checkIngredients(drinkType)
            .then(() => {
                console.log(`Préparation du ${drinkType} en cours...`);
            })
            .then(() => {
                return this.heatWater();
            })
            .then(() => {
                return this.grindCoffee();
            })
            .then(() => {
                return this.extractEspresso();
            })
            .then(() => {
                if (drinkType === 'cappuccino') {
                    return this.steamMilk();
                }
            })
            .then(() => {
                console.log(`Votre ${drinkType} est prêt ! ☕`);
            });
    }

    /**
     * @description Order a drink calling prepareDrink() and display an error message if something went wrong
     * @param {string} drinkType 
     */
    orderDrink(drinkType) {
        return this.prepareDrink(drinkType).catch((error) => {
            console.error(error);
        });
    }
}


// Init the coffee machine
const coffeeMachine = new CoffeeMachine();

// Refill the machine
coffeeMachine.refillWater(100);
coffeeMachine.refillCoffee(100);
coffeeMachine.refillMilk(100);

// Check the machine
console.log(coffeeMachine);

// Order a coffee then a cappuccino then a drink that is not supported
coffeeMachine.orderDrink('café').then(() => {
    // Order a cappuccino
    coffeeMachine.orderDrink('cappuccino')
    .then(() => {
        // Order a drink that is not supported
        coffeeMachine.orderDrink('thé');
    }).then(() => {
        // Check the machine
        console.log(coffeeMachine);
    }).catch((error) => {
        console.error(error);
    });
});


