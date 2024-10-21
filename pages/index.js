import Link from "next/link";
import { client } from "../libs/client";
// import styles from "../styles/Home.module.css";


//SSG
export const getStaticProps = async() => {
    const data=await client.get({endpoint : "blog"});
    console.log(data);
    return {
      props: {
        blog: data.contents,
      },
    };
};

//    <div className={styles.container}>
{/* <a href="">{blog.title}</a> */}

export default function Home({blog}) {
    return (
      <div>
        {blog.map((blog) => (
          <li key={blog.id}>
            <Link href={`blog/${blog.id}`}>
               {blog.title}
            </Link>
          </li>
        ))}
      </div>
    );
}

