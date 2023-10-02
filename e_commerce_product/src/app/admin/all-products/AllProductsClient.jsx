"use client";
import Heading from "@/components/heading/Heading";
import Loader from "@/components/loader/Loader";
import Pagination from "@/components/pagination/Pagination";
import Search from "@/components/search/Search";
import useFetchCollection from "@/hooks/useFetchCollection";
import {
  FILTER_BY_SEARCH,
  selectFilteredProducts,
} from "@/redux/slice/filterSlice";
import { STORE_PRODUCTS, selectProducts } from "@/redux/slice/productSlice";
import priceFormat from "@/utils/priceFormat";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import styles from "./AllProducts.module.scss";

const AllProductsClient = () => {
  const [search, setSearch] = useState("");
  const { data, isLoading } = useFetchCollection("products");

  const products = useSelector(selectProducts);
  const filteredProducts = useSelector(selectFilteredProducts);

  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(10);

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct + productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(STORE_PRODUCTS({ products: data }));
  }, [dispatch, data]);

  useEffect(() => {
    dispatch(FILTER_BY_SEARCH({ products, search }));
  }, [dispatch, products, search]);

  const confirmDelete = (id, imageURL) => {};

  return (
    <>
      {isLoading && <Loader />}
      <div className={styles.table}>
        <Heading
          title="모든 상품"
          subTitle={`총 ${filteredProducts.length} 개`}
        />
        <div className={styles.search}>
          <Search value={search} onChange={(e) => setSearch(e.target.value)} />
        </div>
        {currentProducts.length === 0 ? (
          <p>상품이 없습니다.</p>
        ) : (
          <>
            <table>
              <thead>
                <tr>
                  <th>순서</th>
                  <th>이미지</th>
                  <th>이름</th>
                  <th>카테고리</th>
                  <th>가격</th>
                  <th>실행</th>
                </tr>
              </thead>
              <tbody>
                {currentProducts.map((product, index) => {
                  const { id, name, category, price, imageURL } = product;

                  return (
                    <tr key={id} onClick={() => handleClick(id)}>
                      <td>{index + 1}</td>
                      <td>
                        <Image
                          src={imageURL}
                          alt={name}
                          width={100}
                          height={100}
                        />
                      </td>
                      <td>{name}</td>
                      <td>{category}</td>
                      <td>{priceFormat(price)}원</td>
                      <td>
                        <Link href={`/admin/edit-product/${id}`}>
                          <FaEdit />
                        </Link>
                        <FaTrashAlt
                          size={18}
                          color="red"
                          onClick={() => confirmDelete()}
                        />
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </>
        )}
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalProducts={filteredProducts.length}
          productsPerPage={productsPerPage}
        />
      </div>
    </>
  );
};

export default AllProductsClient;
