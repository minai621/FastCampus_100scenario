import Heading from "@/components/heading/Heading";
import { formatTime } from "@/utils/dayjs";
import priceFormat from "@/utils/priceFormat";
import styles from "./CheckoutSuccess.module.scss";
("");

const CheckoutSuccess = async ({ searchParams }) => {
  const secretKey = process.env.NEXT_PUBLIC_TOSS_SECRET;
  const url = `https://api.tosspayments.com/v1/payments/order/${searchParams.orderId}`;
  const basicToken = Buffer.from(`${secretKey}:`, "utf-8").toString("base64");

  const payment = await fetch(url, {
    headers: {
      Authorization: `Basic ${basicToken}`,
      "Content-Type": "application/json",
    },
  }).then((res) => res.json());

  const { card } = payment;

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
          {priceFormat(card.amount)}
        </li>
        <li>
          <b>결제 승인 날짜: </b>
          {formatTime(payment.approveAt)}
        </li>
      </ul>
      <Button>
        <Link href="/order-history">주문 정보 보기</Link>
      </Button>
    </section>
  );
};

export default CheckoutSuccess;
