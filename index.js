const axios=require('axios');
const cart =require('cart');
const data=null;

document.body.onload = load();
document.onload=load();
function load(){
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products' )
        .then(function(response){
            this.data=response.data.data;
            for(let i=0;data.length;i++){
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
                add.onclick=AddToCart(i);
                product_removal.appendChild(add);
                product.appendChild(product_removal);

                document.getElementById("cart").appendChild(product);

            }
            console.log(response.data.length); // ex.: { user: 'Your User'}

            //console.log('loaded'); // ex.: 200
        });
    this.cart=new cart();
}
function  AddToCart(i){
    
}
