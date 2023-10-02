"use client";
import { selectUserName } from "@/redux/slice/authSlice";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";
import styles from "./Navbar.module.scss";

const Navbar = () => {
  const pathname = usePathname();
  const username = useSelector(selectUserName);
  return (
    <div className={styles.navbar}>
      <div className={styles.user}>
        <FaUserCircle size={40} color="#fff" />
        <h4>{username}</h4>
      </div>
      <nav>
        <ul>
          <li>
            <Link
              href="/admin/dashboard"
              className={
                pathname === "/admin/dashboard" ? `${styles.active}` : ""
              }
            >
              대시보드
            </Link>
          </li>
          <li>
            <Link
              href="/admin/all-products"
              className={
                pathname === "/admin/all-products" ? `${styles.active}` : ""
              }
            >
              총 상품
            </Link>
          </li>
          <li>
            <Link
              href="/admin/add-product"
              className={
                pathname === "/admin/add-product" ? `${styles.active}` : ""
              }
            >
              상품 추가
            </Link>
          </li>
          <li>
            <Link
              href="/admin/orders"
              className={pathname === "/admin/orders" ? `${styles.active}` : ""}
            >
              주문
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
