class Food {
    constructor() {

        this.foodStock = 0;
        this.lastFed;
        this.dogBowl = loadImage("images/dogBowl.png");

    }

    getFoodStock() {
        return this.foodStock;
    }

    updateFoodStock(foodStock) {
        this.foodStock = foodStock;
    }

    deductFood() {
        if(this.foodStock > 0) {
            this.foodStock = this.foodStock - 1;
        }
    }

    bedRoom() {
      background(bedroom, 500, 250);
    }

    garden() {
      background(garden, 500, 250);
    }

    washRoom() {
      background(washRoom, 500, 250);
    }

    display(){
        var x = 100, y = 100;
        
        imageMode(CENTER);
     
        
        if(this.foodStock != 0){
          for(var i = 0; i < this.foodStock; i++){
            if(i % 8 == 0){
              x = 100;
              y = y+50;
            }
            image(this.dogBowl, x, y, 50, 50);
            x = x + 50;
          }
        }
      }
}