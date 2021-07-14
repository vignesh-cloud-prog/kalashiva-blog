import { db } from "../firebase";
import styles from "../styles/Home.module.css";
import { useState } from "react";
import Link from "next/link";

export default function Home({ allBlogs }) {
  const [blogs,setBlogs]=useState(allBlogs);
  const [end,setEnd] = useState(false)
  const loadMore = async ()=>{
    const last  = blogs[blogs.length-1]
    const res = await  db.collection('blogs')
    .orderBy('createdAt','desc')
    .startAfter(new Date(last.createdAt))
    .limit(3)
    .get()
    const newblogs = res.docs.map(docSnap=>{
      return {
       ...docSnap.data(),
       createdAt:docSnap.data().createdAt.toMillis(),
       id:docSnap.id
     }
    })
    setBlogs(blogs.concat(newblogs))

    if(newblogs.length < 3){
      setEnd(true)
    }
  }
  return (
    <div className="center">
      {blogs.map((blog) => {
        return (
          <div className="card" key={blog.id}>
            <div className="card-image">
              <img src={blog.imageURL} />
              <span className="card-title">{blog.title}</span>
            </div>
            <div className="card-content">
              <p>{blog.body}</p>
            </div>
            <div className="card-action">
              <Link href={`/blogs/${blog.id}`}>READ MORE</Link>
            </div>
          </div>
        );
      })
      }
      {end==false?
        <button className="btn #fb8c00 orange darken-1" onClick={()=>loadMore()}>Load more</button>
         :<h3>You have reached end</h3>
      }
      <style jsx>
        {`
          .card {
            max-width: 800px;
            margin: 22px auto;
          }
            p {
              display: -webkit-box;
              overflow: hidden;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
        `}
      </style>
    </div>
  );
}

// This gets called on every request
export async function getServerSideProps() {
  // Fetch data from external API
  const querySnap = await db
    .collection("blogs")
    .orderBy("createdAt", "desc")
    .limit(3)
    .get();
  const allBlogs = querySnap.docs.map((docSnap) => {
    return {
      ...docSnap.data(),
      createdAt: docSnap.data().createdAt.toMillis(),
      id: docSnap.id,
    };
  });
  // Pass data to the page via props
  return { props: { allBlogs } };
}
