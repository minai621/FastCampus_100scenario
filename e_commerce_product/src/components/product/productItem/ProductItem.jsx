import rocketBadgeIcon from "@/assets/badge-rocket.svg";
import useFetchDocuments from "@/hooks/useFetchDocuments";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { Rating } from "react-simple-star-rating";
import styles from "./ProductItem.module.scss";

const ProductItem = ({ id, name, price, imageURL }) => {
  const { documents } = useFetchDocuments("reviews", ["productID", "==", id]);

  let productRating = 0;
  documents.forEach((doc) => {
    productRating = productRating + doc.rate;
  });
  const rating = productRating / documents.length;

  const shortenText = (text, n) => {
    if (text.length > n) {
      const shortenedText = text.substring(0, n).concat("...");
      return shortenedText;
    }
    return text;
  };
  return (
    <div className={styles.grid}>
      <Link href={`/product-details/${id}`}>
        <div className={styles.img}>
          <Image src={imageURL} alt={name} width={265} height={265} />
        </div>
      </Link>
      <div className={styles.content}>
        <div className={styles.details}>
          <p>{shortenText(name, 10)}</p>
          <em>
            <strong styles={{ color: "#cb1400" }}>{priceFormat(price)}</strong>
            원
            <Image src={rocketBadgeIcon} alt="로켓배송" />
          </em>
          <div>
            <Rating
              readonly
              size={17}
              initialValue={Number.isNaN(rating) ? 0 : rating}
            />
            <span className={styles.ratingCount}>({documents.length})</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductItem;
