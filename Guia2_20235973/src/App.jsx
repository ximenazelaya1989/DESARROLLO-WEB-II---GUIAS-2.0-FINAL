import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import {Header} from './components/Header'
import {Footer} from './components/Footer'
import {db} from './data/db'
import {Guitar} from './components/Guitar'


function App() {

  function initialCart(){
    const localStorageCart=localStorage.getItem('cart')
    return localStorageCart? JSON.parse(localStorageCart):[] //si hay una variable en el local storage la recuperamos y la pasamos por un JSON. parse apra que devuelva el objeto
  }

  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  useEffect(()=>{
    localStorage.setItem('cart', JSON.stringify(cart))

  },[cart])

  function addToCart(guitar){

    const itemIndex=cart.findIndex((item)=>guitar.id===item.id)
    console.log(itemIndex);
    if(itemIndex===-1){ //Ese articulo aun no existe en el carrito
      guitar.quantity=1;
      setCart([...cart, guitar])
    }
    else{ //si la guitarra ya se habia anadido al carrito
      const updatedCart=[...cart] //Creando una copia de la variable de estado
      updatedCart[itemIndex].quantity++;
      setCart(updatedCart);
    }
    
}

function increaseQuantity(id) {
  const updatedCart = cart.map((item)=>
  item.id===id ? {...item, quantity: item.quantity + 1} : item
);
setCart(updatedCart);
}

function decreaseQuantity(id) {
  const updatedCart = cart.map((item) =>
  item.id === id ? {...item, quantity: item.quantity - 1} : item).filter((item)=>item.quantity > 0);
  setCart(updatedCart)
}

function clearCart() {
  setCart([]);
}

function removeFromCart(id) {
  const updatedCart = cart.filter(item => item.id !==id);
  setCart(updatedCart)
}


function calculateTotal(){
  /*let total = 0;
  for (const guitar of cart) {
    total+=guitar.price * guitar.quantity;
    
  }*/
 let total=cart.reduce((total,item)=>total+=item.price * item.quantity,0)
  return total;
}



  return (
    <>

    <Header cart={cart} total={calculateTotal()} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} clearCart={clearCart} removeFromCart={removeFromCart}/>
    
    <main className="container-xl mt-5">
        <h2 className="text-center">Nuestra Colección</h2>
        
        <div className="row mt-5">
          
          {data.map((guitar)=>(
            
            <Guitar guitar={guitar} key={guitar.id} addToCart={addToCart}/>
            
          ))}

            
            
        </div>
    </main>

    <Footer/>

    </>
  )
  
}

export default App
