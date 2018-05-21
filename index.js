const axios=require('axios');
const CartService =require('./cart');
const localforage=require('localforage');
const Cart=new CartService.Cart();
getData();
document.onload=load();
function load(){
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products' )
        .then(function(response){
            let data=response.data.data;

                for(let i=0;i<data.length;i++){
                    let product=document.createElement('DIV');
                    product.classList.add('product');
                    product.id='div'+data[i].id;

                    let product_image=document.createElement('DIV');
                    product_image.classList.add('product-image');
                    let image=document.createElement('IMG');
                    image.src=data[i].image;
                    product_image.appendChild(image);
                    product.appendChild(product_image);

                    let product_details=document.createElement('DIV');
                    product_details.classList.add('product-details');
                    let product_title=document.createElement('DIV');
                    product_title.classList.add('product-title');
                    product_title.innerHTML=data[i].title;
                    let product_description=document.createElement('P');
                    product_description.classList.add('product-description)');
                    product_description.innerHTML=data[i].description;
                    product_details.appendChild(product_title);
                    product_details.appendChild(product_description);
                    product.appendChild(product_details);

                    let product_price=document.createElement('DIV');
                    product_price.classList.add('product-price');
                    product_price.innerHTML=data[i].price;
                    product.appendChild(product_price);

                    let product_removal=document.createElement('DIV');
                    product_removal.classList.add('product-removal');
                    let add=document.createElement('BUTTON');
                    add.classList.add('remove-product');
                    add.innerHTML='add to cart';
                    add.style="width:100px;height:30px;";
                    let ToAdd=new CartService.Product(data[i].id,data[i].title,data[i].price);
                    add .id=data[i].id;
                    add.onclick=() => { AddToCart(ToAdd,data[i].image)};
                    product_removal.appendChild(add);
                    product.appendChild(product_removal);

                    document.getElementById("cart").appendChild(product);
            }

            document.getElementById("checkout").onclick=()=>{Checkout()};
            document.getElementById('clear').onclick=()=>{Clear()};
            //console.log('loaded'); // ex.: 200
            let Items=Cart.GetItems();
            if(Items.length!=0){
                for(let i=0;i<Items.length;i++){
                    AddCartItem(Cart.items[i].Product,data[0].image,Cart.items[i].Count);
                }
            }
        });

}
function  AddToCart(ToAdd,ImageToAdd){
    let HasProduct=Cart.HasProduct(ToAdd);
    if(HasProduct===false){
        Cart.AddItem(ToAdd);
        saveData();
        AddCartItem(ToAdd,ImageToAdd,1);
    }

}
function AddCartItem(ToAdd,ImageToAdd,Count) {
    let product=document.createElement('DIV');
    product.classList.add('product');
    product.id='item'+ToAdd.ID;

    let product_image=document.createElement('DIV');
    product_image.classList.add('product-image');
    let image=document.createElement('IMG');
    image.src=ImageToAdd;
    product_image.appendChild(image);
    product.appendChild(product_image);

    let product_details=document.createElement('DIV');
    product_details.classList.add('product-details');
    let product_title=document.createElement('DIV');
    product_title.classList.add('product-title');
    product_title.innerHTML=ToAdd.Name;
    let product_description=document.createElement('P');
    product_description.classList.add('product-description)');
    product_description.style="color:#2f59d6";
    product_description.innerHTML='$'+ToAdd.Price;
    product_details.appendChild(product_title);
    product_details.appendChild(product_description);
    product.appendChild(product_details);

    let CheckoutQuantity=document.createElement('div');
    CheckoutQuantity.classList.add('checkout-quantity');

    let CheckoutQuantityMinus=document.createElement('div');
    CheckoutQuantityMinus.classList.add('checkout-quantity-minus');
    let MinusButton=document.createElement('button');
    MinusButton.classList.add('remove-product');
    MinusButton.innerHTML='-';

    CheckoutQuantityMinus.appendChild(MinusButton);
    CheckoutQuantity.appendChild(CheckoutQuantityMinus);

    let CheckoutQuantityNumber=document.createElement('div');
    CheckoutQuantityNumber.classList.add('checkout-quantity-number');
    CheckoutQuantityNumber.innerHTML=Count;
    CheckoutQuantityNumber.id='Quantity'+ToAdd.ID;
    CheckoutQuantity.appendChild(CheckoutQuantityNumber);

    let CheckoutQuantityPlus=document.createElement('div');
    CheckoutQuantityPlus.classList.add('checkout-quantity-plus');
    let PlusButton=document.createElement('button');
    PlusButton.classList.add('remove-product');
    PlusButton.innerHTML='+';
    PlusButton.onclick=() => { AddItem(ToAdd)};
    MinusButton.onclick=() => { RemoveItem(ToAdd)};
    CheckoutQuantityPlus.appendChild(PlusButton);
    CheckoutQuantity.appendChild(CheckoutQuantityPlus);

    product.appendChild(CheckoutQuantity);
    document.getElementById("items").appendChild(product);
}

function RemoveItem(Product) {

    Cart.RemoveItem(Product);
    saveData();
    let CheckoutQuantityNumber=document.getElementById('Quantity'+Product.ID);
    let Quantity=Number(CheckoutQuantityNumber.innerHTML);
    Quantity--;
    if(Quantity===0){
        document.getElementById('item'+Product.ID).remove();
    }
    else{
        CheckoutQuantityNumber.innerHTML=Quantity ;
    }


}

function AddItem(product) {
    Cart.AddItem(product);
    saveData();
    let CheckoutQuantityNumber=document.getElementById('Quantity'+product.ID);
    let Quantity=Number(CheckoutQuantityNumber.innerHTML);
    CheckoutQuantityNumber.innerHTML=Quantity +1;
}

function Checkout() {
    let total=Cart.GetTotal();
    document.getElementById('cart-total').innerHTML=total;
}

function Clear() {
    let Items=Cart.GetItems();
    for(let i=0;i<Items.length;i++){
        let Product=Items[i].Product;
        document.getElementById('item'+Product.ID).remove();
    }
    Cart.ClearCart();
    saveData();
    document.getElementById('cart-total').innerHTML='0';
}
function saveData() {
    localforage.clear();
    localforage.setItem('items', Cart.GetItems());
}

function getData() {

    localforage.getItem('items').then(function (data) {
        for(let i=0;i<data.length;i++){
            let product=data[i].Product;
            let Count=data[i].Count;
            let item=new CartService.Item(product,Count);
            Cart.items.push(item);
        }
    });

}