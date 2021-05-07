class food{
    constructor(){
    this.image = loadImage("images/Milk.png")

    }

    getFoodStock(){
        var foodRef = dB.ref('Food')
        foodRef.on('value', (data)=>{
            foodStock = data.val();
        })
    }
    
    updateFoodStock(x){
        if(x<=0){
         x=0;
         }else {
            x=x-1
            }
            dB.ref('/').update({
                'Food': x,
                "FeedTime": hour()
              })
    }
    deductFood(){
        foodStock = foodStock - 1
    }

    display(){
       var x=80,y=100;

       imageMode(CENTER);
       if(this.foodStock!=0){
           for(var i=0;i<foodStock;i++){
                if(i%1==0){
                    x=80
                    y=y+50;
                }
                image(this.image,x,y,50,50)
           }
       }

    }
        getLastFed(){
            var lastFedRef = dB.ref('FeedTime');
            lastFedRef.on('value',(data)=>{
                lastFed = data.val()
            })
        }
        
        bedroom(){
            background(bed)
        }
        garden(){
            background(park)
        }
        washroom(){
            background(wash);
        }

}