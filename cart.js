
function Product(ID,Name,Price){

    this.ID=ID;
    this.Name=Name;
    this.Price=Price;
}

Product.prototype.toString = function() {

    return `${this.ID}, ${this.Name}, ${this.Price}`;
};

function Item (product,count){

    this.Product=product,
    this.Count=count;
    this.TotalPrice=product.Price * count;
}

Item.prototype.toString = function() {

    var string=this.Product.toString();
    return string +`, ${this.Count}, ${this.TotalPrice}`;
};

class Cart{

    constructor(){
        var items=[];
    }
    GetItems(){
        return this.items;
    }

}
export class {Cart} ;

const bread=new Product(1,'bread',12);
bread.toString();
console.log(bread.toString());
const breaditem = new Item(bread,13);
console.log(breaditem.toString());