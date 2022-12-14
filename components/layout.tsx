import Head from "next/head";
import Image from "next/image";
import styles from "./layout.module.css";
import utilStyles from "../styles/utils.module.css";
import Link from "next/link";
import AppHead from "./app-head";
import React from "react";

const name = "Big City Bear";
export const siteTitle = "CQHung";

const ProfileImage = ({ height, width }: { height: number; width: number }) => {
  return (
    <Image
      priority
      src="/images/profile.jpg"
      className={utilStyles.borderCircle}
      height={height}
      width={width}
      alt="profile image"
    />
  );
};

const Layout = ({
  children,
  home,
}: {
  children: React.ReactNode;
  home?: boolean;
}) => {
  let header = (
    <>
      <ProfileImage height={144} width={144} />
      <h1 className={utilStyles.heading2Xl}>{name}</h1>
    </>
  );
  if (!home)
    header = (
      <>
        <Link href="/">
          <ProfileImage height={108} width={108} />
        </Link>
        <h2 className={utilStyles.headingLg}>
          <Link href="/" className={utilStyles.colorInherit}>
            {name}
          </Link>
        </h2>
      </>
    );
  return (
    <div className={styles.container}>
      <AppHead siteTitle={siteTitle} />
      <header className={styles.header}>{header}</header>
      <main>{children}</main>
      {!home && (
        <div className={styles.backToHome}>
          <Link href="/">← Back to home</Link>
        </div>
      )}
    </div>
  );
};

export default Layout;
