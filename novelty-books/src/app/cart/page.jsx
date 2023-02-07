import dynamic from "next/dynamic";

const Cart = dynamic(()=>import('../../components/Cart'),{ssr:false});

function CartMain() {
  
  return (
    <Cart/>
  );
}

export default Cart;
