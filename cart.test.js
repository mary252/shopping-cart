const shopping=require('./cart');

const cart=new shopping.Cart();
const bread= new shopping.Product(1,'bread',10);
const sugar= new shopping.Product(2,'sugar',20);

test('check Product being created',()=>{
    let bread= new shopping.Product(1,'bread',10)
    expect(bread.ID).toBe(1);
    expect(bread.Price).toBe(10);
})

describe('the cart should',()=>{

    cart.AddItem(sugar);
    let SugarItem=new shopping.Item(sugar,1);
    let BreadItem=new shopping.Item(bread,1);

    test('a product can be added ',()=>{
        
        expect(cart.items).toEqual([SugarItem]);
    })

    test('chech that a product to be there ',()=>{
        
        expect(cart.HasProduct(sugar)).toBeTruthy();
        expect(cart.HasProduct(bread)).toBeFalsy();
    })

    
    
    test('getting an item ',()=>{
        cart.AddItem(sugar);
        let SugarItem_1=new shopping.Item(sugar,2);
        expect(cart.GetItem(sugar)).toEqual(SugarItem_1);
        
    })

    test('removing an item ',()=>{
        cart.RemoveItem(sugar);
        expect(cart.items).toEqual([SugarItem]);
        
    })
    test('removing a product ',()=>{
        cart.RemoveProduct(sugar);
        expect(cart.items).toEqual([]);
        
    })

    test('getting all items ',()=>{
        cart.AddItem(sugar);
        cart.AddItem(bread);
        expect(cart.items.length).toBe(2);
        
    })
    test('getting total price items ',()=>{
        expect(cart.GetTotal()).toBe(30);
        
    })
    test('clearing the cart ',()=>{
        cart.ClearCart();
        expect(cart.items).toEqual([]);
        
    })
})




