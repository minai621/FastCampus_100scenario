"use client";

import useFetchCollection from "@/hooks/useFetchCollection";
import { GET_PRICE_RANGE, STORE_PRODUCTS } from "@/redux/slice/productSlice";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Loader from "../loader/Loader";
import styles from "./Product.module.scss";
import ProductFilter from "./productFilter/ProductFilter";
import ProductList from "./productList/ProductList";

const Product = () => {
  const { data, isLoading } = useFetchCollection("products");

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
    dispatch(GET_PRICE_RANGE({ products: data }));
  }, [data, dispatch]);

  return (
    <section className={styles.product}>
      <aside className={styles.filter}>
        {isLoading ? null : <ProductFilter />}
      </aside>
      <div className={styles.content}>
        {isLoading ? <Loader basic /> : <ProductList />}
      </div>
    </section>
  );
};

export default Product;
