
function Product(ID,Name,Price){

    this.ID=ID;
    this.Name=Name;
    this.Price=Price;
}

class Item{
    constructor (product,count){

        this.Product=product,
        this.Count=count;
        this.TotalPrice=product.Price * count;
    }
   UpdatePrice () {
        this.TotalPrice=this.Product.Price*this.Count;
    }
}

class Cart {

    constructor(){
        this.items=[];
    }


     // returns all items in the cart
    GetItems(){
        return this.items;
    }

    // checks if cart contains an item with this product by id return Boolean
    HasProduct(Product){
        for(let i=0;i<this.items.length;i++){
            if(Product.ID==this.items[i].Product.ID){
                return true;
            }
        }
        return false;
    }

    // adds a product or increment the item count
    AddItem(product){
        
        for(let i=0;i<this.items.length;i++){
            if(product.ID==this.items[i].Product.ID){
                this.items[i].Count++;
                this.items[i].UpdatePrice();
                return;
            }
        }
        var ItemToAdd=new Item(product,1);
        this.items.push(ItemToAdd);
    }

    // decrement the count of the item containing the product or removes it.
    RemoveItem(product){
        for(let i=0;i<this.items.length;i++){
            if(product.ID==this.items[i].Product.ID){
                this.items[i].Count--;
                this.items[i].UpdatePrice();
                if(this.items[i].Count==0){
                    this.items.splice(i,1);
                }
            }
        }
    }

     // removes the item that contains the product 
    RemoveProduct(product){
        for(let i=0;i<this.items.length;i++){
            if(product.ID==this.items[i].Product.ID){
                this.items.splice(i,1);
                
            }
        }
    } 

    // get an item containing the product or null otherwise
    GetItem(product){
        for(let i=0;i<this.items.length;i++){
            if(product.ID==this.items[i].Product.ID){
                return this.items[i];
            }
        }
        return null;
    } 

    // returns the total of all items in the cart.
    GetTotal(){
        var TotalPrice=0;
        for(let i=0;i<this.items.length;i++){
           TotalPrice+=this.items[i].TotalPrice;
        }
        return TotalPrice;
    }

    // removes all items
    ClearCart(){
        this.items=[];
    }


}
module.exports = {
    Product : Product,
    Item:Item,
    Cart : Cart
  }
