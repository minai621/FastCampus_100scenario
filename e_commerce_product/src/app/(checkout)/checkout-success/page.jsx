import Button from "@/components/button/Button";
import Heading from "@/components/heading/Heading";
import { formatTime } from "@/utils/dayjs";
import priceFormat from "@/utils/priceFormat";
import Link from "next/link";
import styles from "./CheckoutSuccess.module.scss";

const CheckoutSuccess = async ({ searchParams }) => {
  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET;

  const url = `https://api.tosspayments.com/v1/payments/orders/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => {
    return res.json();
  });

  console.log("payment", payment);
  const { card } = payment;

  if (payment.failure) {
    return <div>다시 시도해주세요.</div>;
  }

  return (
    <section className={styles.success}>
      <Heading title="결제 성공" />
      <ul className={styles.list}>
        <li>
          <b>결제 상품:</b>
          {payment.orderName}
        </li>
        <li>
          <b>주문 번호:</b>
          {payment.orderId}
        </li>
        <li>
          <b>카드 번호:</b>
          {card.number}
        </li>
        <li>
          <b>결제 금액:</b>
          {priceFormat(card.amount)}원
        </li>
        <li>
          <b>결제승인날짜:</b>
          {formatTime(payment.approvedAt)}
        </li>
      </ul>
      <Button>
        <Link href="/order-history">주문 상태 보기</Link>
      </Button>
    </section>
  );
};

export default CheckoutSuccess;
