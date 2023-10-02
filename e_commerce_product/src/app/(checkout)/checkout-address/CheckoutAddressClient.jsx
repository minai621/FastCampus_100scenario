"use client";
import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import {
  SAVE_BILLING_ADDRESS,
  SAVE_SHIPPING_ADDRESS,
} from "@/redux/slice/checkoutSlice";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import styles from "./CheckoutAddress.module.scss";

const initialAddressState = {
  name: "",
  line: "",
  city: "",
  postalCode: "",
};

const CheckoutAddressClient = () => {
  const [shippingAddress, setShippingAddress] = useState({
    ...initialAddressState,
  });

  const [billingAddress, setbillingAddress] = useState({
    ...initialAddressState,
  });

  const dispatch = useDispatch();
  const router = useRouter();

  const handleShipping = (e) => {
    const { name, value } = e.target;
    setShippingAddress({ ...shippingAddress, [name]: value });
  };

  const handleBilling = (e) => {
    const { name, value } = e.target;
    setbillingAddress({ ...billingAddress, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(SAVE_SHIPPING_ADDRESS(shippingAddress));
    dispatch(SAVE_BILLING_ADDRESS(billingAddress));
    router.push("/checkout");
  };

  return (
    <section className={styles.checkout}>
      <Heading title="상세주문" />
      <form onSubmit={handleSubmit}>
        <div className={styles.card}>
          <h3>배송 주소</h3>
          <label>받는 사람 이름</label>
          <input
            type="text"
            placeholder="받는 사람 이름"
            required
            name="name"
            value={shippingAddress.name}
            onChange={(e) => handleShipping(e)}
          />
          <label>상세 주소</label>
          <input
            type="text"
            placeholder="상세 주소"
            required
            name="line"
            value={shippingAddress.line}
            onChange={(e) => handleShipping(e)}
          />

          <label>도시</label>
          <input
            type="text"
            placeholder="city"
            required
            name="city"
            value={shippingAddress.city}
            onChange={(e) => handleShipping(e)}
          />

          <label>우편 번호</label>
          <input
            type="text"
            placeholder="우편 번호"
            required
            name="postalCode"
            value={shippingAddress.postalCode}
            onChange={(e) => handleShipping(e)}
          />
        </div>
        <div className={styles.card}>
          <h3>청구지 주소</h3>
          <label>보내는 사람 이름</label>
          <input
            type="text"
            placeholder="보내는 사람 이름"
            required
            name="name"
            value={billingAddress.name}
            onChange={(e) => handleBilling(e)}
          />
          <label>상세 주소</label>
          <input
            type="text"
            placeholder="상세 주소"
            required
            name="line"
            value={billingAddress.line}
            onChange={(e) => handleBilling(e)}
          />

          <label>도시</label>
          <input
            type="text"
            placeholder="city"
            required
            name="city"
            value={billingAddress.city}
            onChange={(e) => handleBilling(e)}
          />

          <label>우편 번호</label>
          <input
            type="text"
            placeholder="우편 번호"
            required
            name="postalCode"
            value={billingAddress.postalCode}
            onChange={(e) => handleBilling(e)}
          />
          <Button type="submit">주문하기</Button>
        </div>
      </form>
    </section>
  );
};

export default CheckoutAddressClient;
