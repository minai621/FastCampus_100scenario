"use client";

import listCashIcon from "@/assets/list-cash-icon.png";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import Loader from "@/components/loader/Loader";
import useFetchDocument from "@/hooks/useFetchDocument";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductDetails.module.scss";

const ProductDetailsClient = () => {
  const { id } = useParams();
  const { document: product } = useFetchDocument("products", id);
  const [count, setCount] = useState(1);

  const addToCart = () => {};

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  return (
    <section className={styles.product}>
      {product === null ? (
        <Loader />
      ) : (
        <>
          <div className={styles.details}>
            <div className={styles.img}>
              <Image
                width={477}
                height={410}
                src={product.imageURL}
                alt={product.name}
              />
            </div>
            <div className={styles.content}>
              <div className={styles.header}>
                <p className={styles.brandName}>{product.brand}</p>
                <p className={styles.productName}>{product.name}</p>
                <div className={styles.rating}>
                  <Rating initialValue={3} size={17} />
                  <span className={styles.count}>(0)</span>
                </div>
              </div>
              <Divider space={0} />
              <div className={styles.container}>
                <p className={styles.price}>{priceFormat(product.price)}원</p>
                <div className={styles.rewardCashBadge}>
                  <Image src={listCashIcon} alt="cash-icon" width={12} />
                  <span>최대 {product.price / 10}원 적립</span>
                </div>
              </div>
              <Divider space={0} />
              <div className={styles.rewardCashWrapper}>
                <div className={styles.rewardSummary}>
                  <Image src={listCashIcon} alt="cash-icon" width={12} />
                  <p>
                    캐시적립 혜택<span>|</span>최대
                    <strong>{product.price / 10}</strong>원 적립
                  </p>
                </div>
                <div className={styles.rewardCashPromotion}>
                  <p>쿠페이 머니 결제 시 1% 적립</p>
                  <p>[로켓와우 + 쿠페이 계좌이체] 결제 시 2% 적립</p>
                  <p>[로켓와우 + 쿠페이 머니] 결제 시 4% 추가적립</p>
                  <button>로켓와우 무료체험 신청하기</button>
                </div>
              </div>
              <Divider space={0} />
              <div className={styles.bottom}>
                <p className={styles.price}>{product.price * count}원</p>
                <div className={styles.count}>
                  <Button
                    onClick={() => setCount((prev) => prev - 1)}
                    disabled
                    secondary
                  >
                    -
                  </Button>
                  <p>
                    <b>{count}</b>
                  </p>
                  <Button
                    onClick={() => setCount((prev) => prev + 1)}
                    secondary
                  >
                    +
                  </Button>
                  <Button onClick={() => addToCart()}>장바구니 담기</Button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};

export default ProductDetailsClient;
