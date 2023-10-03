"use client";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import { db } from "@/firebase/firebase";
import { selectEmail, selectUserId } from "@/redux/slice/authSlice";
import {
  CLEAR_CART,
  selectCartItems,
  selectCartTotalAmount,
} from "@/redux/slice/cartSlice";
import { selectShippingAddress } from "@/redux/slice/checkoutSlice";
import { loadTossPayments } from "@tosspayments/payment-sdk";
import { Timestamp, addDoc, collection } from "firebase/firestore";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import styles from "./Checkout.module.scss";
const CheckoutForm = dynamic(
  () => import("@/components/checkoutForm/CheckoutForm"),
  { ssr: false }
);

const CheckoutClient = () => {
  const cartTotalAmount = useSelector(selectCartTotalAmount);

  const userId = useSelector(selectUserId);
  const cartItems = useSelector(selectCartItems);
  const shippingAddress = useSelector(selectShippingAddress);
  const userEmail = useSelector(selectEmail);

  const dispatch = useDispatch();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const tossPayment = await loadTossPayments(
      process.env.NEXT_PUBLIC_TOSS_CLIENT
    );

    console.log(Math.random().toString(36).slice(2));
    tossPayment
      .requestPayment("카드", {
        amount: cartTotalAmount,
        orderId: Math.random().toString(36).slice(2),
        orderName: "주문",
      })
      .then(async function (data) {
        const { orderId, paymentKey, amount } = data;
        const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET;

        const url = `https://api.tosspayments.com/v1/payments/confirm`;
        const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString(
          "base64"
        );

        const confirmResponse = fetch(url, {
          method: "post",
          body: JSON.stringify({
            amount,
            orderId,
            paymentKey,
          }),
          headers: {
            Authorization: `Basic ${basicToken}`,
            "Content-Type": "application/json",
          },
        }).then((response) => response.json());

        console.log("confirmResponse", confirmResponse);

        const today = new Date();
        const date = today.toDateString();
        const time = today.toLocaleDateString();

        const orderData = {
          userId,
          userEmail,
          orderDate: date,
          orderTime: time,
          orderAmount: amount,
          orderStatus: "주문수락",
          cartItems,
          shippingAddress,
          createdAt: Timestamp.now().toDate(),
        };

        await addDoc(collection(db, "orders"), orderData);
        dispatch(CLEAR_CART());

        router.push(`/checkout-success?orderId=${orderId}`);
      })
      .catch((error) => {
        if (error.code === "USER_CANCEL") {
          toast.error("결제창이 닫아졌습니다.");
        }
      });
  };
  return (
    <section>
      <div className={styles.checkout}>
        <Heading title="주문하기" />
        <form onSubmit={handleSubmit}>
          <div className={styles.card}>
            <CheckoutForm />
          </div>
          <div>
            <Button type="submit">토스를 이용해서 결제하기</Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default CheckoutClient;
