"use client";
import { db } from "@/firebase/firebase";
import { Timestamp, doc, setDoc } from "firebase/firestore";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "react-toastify";
import Button from "../button/Button";
import Loader from "../loader/Loader";
import styles from "./ChangeOrderStatus.module.scss";

const ChangeOrderStatus = ({ order, id }) => {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const editOrder = (e, id) => {
    e.preventDafault();
    setIsLoading(true);
    const orderData = {
      userId: order.userId,
      userEmail: order.userEmail,
      orderDate: order.orderDate,
      orderTime: order.orderTime,
      orderAmount: order.orderAmount,
      orderStatus: status,
      cartItems: orderItems,
      shippingAddress: order.shippingAddress,
      createdAt: order.createdAt,
      editedAt: Timestamp.now().toDate(),
    };

    try {
      setDoc(doc(db, "orders", id), orderData);
      setIsLoading(false);
      toast.success("주문 상태가 변경되었습니다.");
      router.push("/admin/orders");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.status}>
        <div className={styles.card}>
          <h4>주문 상태 업데이트</h4>
          <form onSubmit={(e) => editOrder(e, id)}>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option>-- 선택 --</option>
              <option value="주문수락">주문 수락</option>
              <option value="주문처리중">주문처리중</option>
              <option value="배송중">배송중</option>
              <option value="배송완료">배송완료</option>
            </select>
            <div>
              <Button type="submit">업데이트</Button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default ChangeOrderStatus;
