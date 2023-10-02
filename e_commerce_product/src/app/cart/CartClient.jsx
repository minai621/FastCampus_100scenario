"use client";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import { selectIsLoggedIn } from "@/redux/slice/authSlice";
import {
  ADD_TO_CART,
  CALCULATE_SUBTOTAL,
  CALCULATE_TOTAL_QUANTITY,
  CLEAR_CART,
  DECREASE_CART,
  REMOVE_FROM_CART,
  SAVE_URL,
  selectCartItems,
  selectCartTotalAmount,
  selectCartTotalQuantity,
} from "@/redux/slice/cartSlice";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Cart.module.scss";

const CartClient = () => {
  const cartItems = useSelector(selectCartItems);
  const cartTotalAmount = useSelector(selectCartTotalAmount);
  const cartTotalQuantity = useSelector(selectCartTotalQuantity);

  const dispatch = useDispatch();
  const router = useRouter();

  const isLoggedIn = useSelector(selectIsLoggedIn);

  const increaseCart = (cart) => {
    dispatch(ADD_TO_CART({ cart }));
  };

  const decreaseCart = (cart) => {
    dispatch(DECREASE_CART({ cart }));
  };

  const removeFromCart = (cart) => {
    dispatch(REMOVE_FROM_CART({ cart }));
  };

  const clearCart = () => {
    dispatch(CLEAR_CART());
  };

  const url = typeof window !== "undefined" ? window.location.href : "";
  const checkout = () => {
    if (isLoggedIn) {
      router.push("/checkout-address");
    } else {
      dispatch(SAVE_URL(url));
      router.push("/login");
    }
  };

  useEffect(() => {
    dispatch(CALCULATE_SUBTOTAL());
    dispatch(CALCULATE_TOTAL_QUANTITY());
    dispatch(SAVE_URL(""));
  }, [dispatch, cartItems]);

  return (
    <section className={styles.table}>
      <Heading title="장바구니" />
      {cartItems.length === 0 ? (
        <>
          <p className={styles.emptyText}>장바구니가 비어있습니다.</p>
          <div className={styles.emptyText}>
            <Link href="/">계속 쇼핑하기</Link>
          </div>
        </>
      ) : (
        <>
          <table>
            <thead>
              <tr>
                <td>순서</td>
                <td>상품</td>
                <td>가격</td>
                <td>개수</td>
                <td>합계</td>
                <td>삭제</td>
              </tr>
            </thead>
            <tbody>
              {cartItems.map((item, index) => {
                const { id, name, price, imageURL, cartQuantity } = item;
                return (
                  <tr key={id}>
                    <td>{index + 1}</td>
                    <td>
                      <p>
                        <b>{name}</b>
                      </p>
                      <Image
                        src={imageURL}
                        alt={name}
                        width={100}
                        height={100}
                      />
                    </td>
                    <td>{priceFormat(price)}원</td>
                    <td>
                      <div className={styles.count}>
                        <button onClick={() => decreaseCart(item)}>-</button>
                        <p>
                          <b>{cartQuantity}</b>
                        </p>
                        <button onClick={() => increaseCart(item)}>+</button>
                      </div>
                    </td>
                    <td>{priceFormat(price * cartQuantity)}원</td>
                    <td className={styles.icons}>
                      <FaTrashAlt
                        size={19}
                        color="red"
                        onClick={() => removeFromCart(item)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div className={styles.summary}>
            <Button onClick={clearCart}>카트 비우기</Button>
            <div className={styles.checkout}>
              <div className={styles.text}>
                <h4>총 상품 개수</h4>
                <p>{cartTotalQuantity}개</p>
              </div>
              <div className={styles.text}>
                <h4>합계</h4>
                <p>{priceFormat(cartTotalAmount)}원</p>
              </div>
              <Button onClick={checkout}>계산하기</Button>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default CartClient;
