"use client";
import { auth } from "@/firebase/firebase";
import { REMOVE_ACTIVE_USER, SET_ACTIVE_USER } from "@/redux/slice/authSlice";
import { onAuthStateChanged, signOut } from "firebase/auth";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import InnerHeader from "../innerHeader/InnerHeader";
import styles from "./Header.module.scss";

const Header = () => {
  const dispatch = useDispatch();
  const pathname = usePathname();
  const [displayName, setDisplayName] = useState("");
  const router = useRouter();

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        if (user.displayName === null) {
          const u1 = user.email.substring(0, user.email.indexOf("@"));
          const uName = u1.charAt(0).toUpperCase() + u1.slice(1);
          setDisplayName(uName);
        } else {
          setDisplayName(user.displayName);
        }

        //  유저 정보를 리덕스 스토어에 저장하기
        dispatch(
          SET_ACTIVE_USER({
            email: user.email,
            userName: user.displayName ? user.displayName : displayName,
            userId: user.uid,
          })
        );
        dispatch;
      } else {
        setDisplayName("");
        // 유저 정보를 리덕스 스토어에서 지우기
        dispatch(REMOVE_ACTIVE_USER());
      }
    });
  }, [dispatch, displayName]);

  const logoutUser = () => {
    signOut(auth)
      .then(() => {
        toast.success("로그아웃 되었습니다.");
        router.push("/");
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };

  if (
    pathname === "/login" ||
    pathname === "/register" ||
    pathname === "/reset"
  ) {
    return null;
  }

  return (
    <header>
      <div className={styles.loginBar}>
        <ul className={styles.list}>
          <li className={styles.item}>
            <Link href={"/login"}>로그인</Link>
          </li>

          <>
            <li className={styles.item}>
              <Link href={"/admin/dashboard"}>관리자</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/order-history"}>주문 목록</Link>
            </li>
            <li className={styles.item}>
              <Link href={"/"} onClick={logoutUser}>
                로그아웃
              </Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>제휴 마케팅</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>쿠팡 플레이</Link>
            </li>

            <li className={styles.item}>
              <Link href={"/"}>고객센터</Link>
            </li>
          </>
        </ul>
      </div>
      {pathname.startsWith("/admin") ? null : <InnerHeader />}
    </header>
  );
};

export default Header;
