"use client";

import Chart from "@/components/chart/Chart";
import Heading from "@/components/heading/Heading";
import InfoBox from "@/components/infoBox/InfoBox";
import useFetchCollection from "@/hooks/useFetchCollection";
import {
  CALCULATE_TOTAL_ORDER_AMOUNT,
  STORE_ORDERS,
  selectOrderHistory,
  selectTotalOrderAmount,
} from "@/redux/slice/orderSlice";
import { STORE_PRODUCTS } from "@/redux/slice/productSlice";
import priceFormat from "@/utils/priceFormat";
import { useEffect } from "react";
import { AiFillDollarCircle } from "react-icons/ai";
import { BsCart4 } from "react-icons/bs";
import { FaCartArrowDown } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./Dashboard.module.scss";

const earningIcon = <AiFillDollarCircle size={30} color="#b624ff" />;
const productIcon = <BsCart4 size={30} color="#1f93ff" />;
const ordersIcon = <FaCartArrowDown size={30} color="#4385F4" />;

const DashboardClient = () => {
  const totalOrderAmount = useSelector(selectTotalOrderAmount);
  const ordersData = useSelector(selectOrderHistory);

  const dispatch = useDispatch();
  const { data: products } = useFetchCollection("products");
  const { data: orders } = useFetchCollection("orders");

  useEffect(() => {
    dispatch(STORE_PRODUCTS(products));
    dispatch(STORE_ORDERS(orders));
    dispatch(CALCULATE_TOTAL_ORDER_AMOUNT());
  }, [dispatch, products, orders]);

  return (
    <div className={styles.home}>
      <Heading title="관리자 대시보드" />
      <div className={styles.infoBox}>
        <InfoBox
          cardClass={`${styles.card} ${styles.card1}`}
          title={"수익"}
          count={`${priceFormat(Number(totalOrderAmount))}원`}
          icon={earningIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card2}`}
          title={"총상품"}
          count={`${products.length}개`}
          icon={productIcon}
        />

        <InfoBox
          cardClass={`${styles.card} ${styles.card3}`}
          title={"총 주문건수"}
          count={`${ordersData.length}건`}
          icon={ordersIcon}
        />
      </div>
      <div>
        <Chart />
      </div>
    </div>
  );
};

export default DashboardClient;
