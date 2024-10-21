// import { getStaticPaths } from "next/dist/build/templates/pages";
import { client } from "../../libs/client";
import styles from "../../styles/Home.module.scss";

//SSG
export const getStaticProps = async (context)=>{
    const id = context.params.id; // URLに記述されたIｄを取得する。
    // microCMSで定義の構文
    const data = await client.get({endpoint : "blog", contentId: id});
    return {
        props:{
            blog:data,
        },
    };
};

// 動的ページ作成に必要な関数
// getStaticPathsのリファレンス
// https://nextjs.org/docs/pages/api-reference/functions/get-static-paths
export const getStaticPaths= async()=>{
    // endpointにはpathが入っている。
    const data = await client.get({endpoint:"blog"});
    // dataにはpathのデータが複数個あるのでmap関数で写像を紐づけ。
    const paths= data.contents.map((content)=> `/blog/${content.id}`);
    return {
        paths,
        fallback: false,
    };
};
// // __html プロパティ
// dangerouslySetInnerHTML にはオブジェクトを渡し、
// そのオブジェクトの中に __html というプロパティを持たせます。
// このプロパティに挿入したいHTML文字列を指定します。
export default function BlogId({blog}){
    return (
      <main className={styles.main}>
        <h1 className={styles.title}>{blog.title}</h1>
        <p className={styles.publishedAt}>{blog.publishedAt}</p>
        <div
          dangerouslySetInnerHTML={{ __html: `${blog.body}` }}
          className={styles.post}
        ></div>
      </main>
    );
};
