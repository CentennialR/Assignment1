export class Order {
  constructor(sFrom) {
      this.menu = {
          pizza: { sizes: ["small", "medium", "large"],
                 toppings: ["pepperoni", "mushrooms"]
                },
          burger: { sizes: ["single", "double"], 
                extras: ["bacon", "lettuce"] 
            }
      };
      this.upSell = ["soda", "fries"];
      this.order = { item: null, size: null, extra: null, drink: null };

      this.OrderState = {
          WELCOMING: () => {
              this.stateCur = this.OrderState.CHOOSE_ITEM;
              return ["Welcome to Zim's Ideal Takeout!", "What would you like to order?", "Options: Pizza (small, medium, large) or Burger (single, double)", "Toppings: Pizza(pepperoni,mushrooms)","Extras: Burger(bacon, lettuce)"];
          },
          CHOOSE_ITEM: (sInput) => {
              let aReturn = [];
              if (this.menu[sInput.toLowerCase()]) {
                  this.order.item = sInput.toLowerCase();
                  this.stateCur = this.OrderState.CHOOSE_SIZE;
                  aReturn.push(`What size would you like for your ${sInput.toLowerCase()}?`);
              } else {
                  aReturn.push("Please choose Pizza or Burger.");
              }
              return aReturn;
          },
          CHOOSE_SIZE: (sInput) => {
              let aReturn = [];
              if (this.menu[this.order.item].sizes.includes(sInput.toLowerCase())) {
                  this.order.size = sInput.toLowerCase();
                  this.stateCur = this.OrderState.CHOOSE_EXTRA;
                  aReturn.push(`What extra would you like for your ${this.order.item}?`);
              } else {
                  aReturn.push("Please choose a valid size.");
              }
              return aReturn;
          },
          CHOOSE_EXTRA: (sInput) => {
            let aReturn = [];
            if (this.menu[this.order.item].extras?.includes(sInput.toLowerCase()) ||
                this.menu[this.order.item].toppings?.includes(sInput.toLowerCase())) {
              this.order.extra = sInput.toLowerCase();
            }
            this.stateCur = this.OrderState.UPSELL;
            aReturn.push("Would you like to add a drink or fries?");
            return aReturn;
          },
          UPSELL: (sInput) => {
            let aReturn = [];
            if (this.upSell.includes(sInput.toLowerCase())) {
              this.order.drink = sInput.toLowerCase();
            }
            this.stateCur = this.OrderState.CONFIRM;
            aReturn.push(`Your order: ${this.order.size} ${this.order.item} with ${this.order.extra}${this.order.drink ? ' and ' + this.order.drink : ''}.`);
            aReturn.push("Thank you for ordering!");
            this.isDone = true;
            return aReturn;
          }
      };

      this.stateCur = this.OrderState.WELCOMING;
      this.isDone = false;
      this.sFrom = sFrom;
  }

  handleInput(sInput) {
      return this.stateCur(sInput);
  }

  get isOrderDone() {
      return this.isDone;
  }
}