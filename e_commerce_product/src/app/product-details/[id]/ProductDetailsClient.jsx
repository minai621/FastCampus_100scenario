"use client";

import listCashIcon from "@/assets/list-cash-icon.png";
import Button from "@/components/button/Button";
import Divider from "@/components/divider/Divider";
import Loader from "@/components/loader/Loader";
import ProductReviewItem from "@/components/product/productReviewItem/ProductReviewItem";
import useFetchDocument from "@/hooks/useFetchDocument";
import useFetchDocuments from "@/hooks/useFetchDocuments";
import { ADD_TO_CART, CALCULATE_TOTAL_QUANTITY } from "@/redux/slice/cartSlice";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Rating } from "react-simple-star-rating";
import { toast } from "react-toastify";
import styles from "./ProductDetails.module.scss";

const ProductDetailsClient = () => {
  const { id } = useParams();
  const { document: product } = useFetchDocument("products", id);
  const { documents: reviews } = useFetchDocuments("reviews", [
    "productID",
    "==",
    id,
  ]);
  const [count, setCount] = useState(1);

  const today = new Date();
  const tomorrow = new Date(today.setDate(today.getDate() + 1));
  const tomorrowDate = tomorrow.getDate();
  const tomorrowMonth = tomorrow.getMonth();

  const dispatch = useDispatch();

  const addToCart = () => {
    dispatch(ADD_TO_CART({ ...product, quantity: count }));
    toast.success(`${product.name} 상품이 추가되었습니다.`);
    dispatch(CALCULATE_TOTAL_QUANTITY());
  };
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
                    disabled={count === 1}
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
      <div className={styles.card}>
        <h3>상품평 ({reviews.length})</h3>
        <div>
          {reviews.length === 0 ? (
            <p className={styles.noReviewText}>
              해당 상품에 대한 상품평이 아직 없습니다.
            </p>
          ) : (
            <>
              {reviews.map((review) => {
                return <ProductReviewItem key={review.id} {...review} />;
              })}
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductDetailsClient;
