import { db } from "../../firebase/firebase";

export const removeBlog = async (bId) => {
  let blogDetailsDeleted = false;
  let blogBodyDeleted = false;
  db.collection("blogdetails")
    .doc(bId)
    .delete().
    blogDetailsDeleted = true
  db.collection("blogbody")
    .doc(bId)
    .delete()
    console.log("blog deleted");
  blogBodyDeleted = true
  if (blogBodyDeleted && blogDetailsDeleted) return true;
  return false;
};
