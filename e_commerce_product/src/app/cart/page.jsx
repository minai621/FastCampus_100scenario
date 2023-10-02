import dynamic from "next/dynamic";
const CartClient = dynamic(() => import("./CartClient"), { ssr: false });

const Cart = () => {
  return <CartClient />;
};

export default Cart;
