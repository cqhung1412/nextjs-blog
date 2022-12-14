import Head from "next/head";
import Link from "next/link";
import clsx from "classnames";

import { getSortedPostData } from "../lib/posts";
import Layout, { siteTitle } from "../components/layout";
import Date from "../components/date";
import utilStyles from "../styles/utils.module.css";

import { GetStaticProps } from "next";

export default function Home({
  allPosts,
}: {
  allPosts: {
    date: string;
    title: string;
    id: string;
  }[];
}) {
  const intro = (
    <section className={utilStyles.headingMd}>
      <p>
        I'm Quốc Hùng (<b>Bear🧸</b>). I think my blood is <i>bubble tea</i>.
      </p>
    </section>
  );
  const postList = (
    <section className={clsx(utilStyles.headingMd, utilStyles.padding1px)}>
      <h2 className={utilStyles.headingLg}>Blog</h2>
      <ul className={utilStyles.list}>
        {allPosts.map(({ id, date, title }) => (
          <li key={id} className={utilStyles.listItem}>
            <Link href={`/posts/${id}`}>{title}</Link>
            <br />
            <small className={utilStyles.lightText}>
              <Date dateString={date} />
            </small>
          </li>
        ))}
      </ul>
    </section>
  );
  return (
    <Layout home>
      <Head>
        <title>{siteTitle}</title>
      </Head>
      {intro}
      {postList}
    </Layout>
  );
}

export const getStaticProps: GetStaticProps = () => {
  const allPosts = getSortedPostData();
  return {
    props: {
      allPosts,
    },
  };
};
