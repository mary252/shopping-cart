const axios=require('axios');
document.body.onload = load();
document.onload=load();
function load(){
    axios.get('https://faker-api-yczfsfkfcd.now.sh/api/products' )
        .then(function(response){
            let data=response.data;
            let ItemList=document.getElementById('ItemList');
            for(let i=0;data.length;i++){
                let product=document.createElement('div');
                product.class='product';
                product.id='div'+data[i].id;

                let product_image=document.createElement('div');
                product_image.class='product-image';
                let image=document.createElement('img');
                image.src=data[i].image;
                product_image.appendChild(image);
                product.appendChild(product_image);

                let product_details=document.createElement('div');
                product.class='product-details';
                product.id='product-details'+data[i].id;
                let product_title=document.createElement('div');
                product.class='product-title';
                product.id='product-title'+data[i].id;
                product_title.innerHTML=data[i].title;
                let product_description=document.createElement('p');
                product_description.class='product-description';
                product_description.innerHTML=data[i].description;
                product_details.appendChild(product_title);
                product_details.appendChild(product_description);
                product.appendChild(product_details);

                let product_price=document.createElement('div');
                product_price.className='product-price';
                product_price.innerHTML=data[i].price;
                product.appendChild(product_price);

                let product_removal=document.createElement('div');
                product_removal.class='product-removal';
                let add=document.createElement('button');
                add.class='remove-product';
                add.onclick=AddToCart(i);
                product_removal.appendChild(add);
                product.appendChild(product_removal);

                ItemList.appendChild(product);

            }
            console.log(response.data); // ex.: { user: 'Your User'}
            console.log(response.status); // ex.: 200
        });
}
function  AddToCart(i){

}
