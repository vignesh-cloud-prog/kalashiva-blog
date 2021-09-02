import { useContext } from "react";
import { db } from "../../firebase/firebase";

export const getUserCollection = (uId) => {
  const userCollectionQuery = db
    .collection("users")
    .doc(uId)
    .collection("collection")
    .get()
    .then((querySnap) => {
      return {
        userCollection: querySnap.docs.map((docSnap) => docSnap.data()),
      };
    });

  return userCollectionQuery;
};

export const getUserReadLater = (uId) => {
  const userReadLaterQuery = db
    .collection("users")
    .doc(uId)
    .collection("readlater")
    .get()
    .then((querySnap) => {
      return {
        userReadLater: querySnap.docs.map((docSnap) => docSnap.data()),
      };
    });
  return userReadLaterQuery;
};

export const addToCollection = async (uId, pId, pTitle,pCategory, pURL) => {
  const result = await db
    .collection("users")
    .doc(uId)
    .collection("collection")
    .doc(pId)
    .set({
      id: pId,
      title: pTitle,
      category:pCategory,
      url: pURL,
    })
    .then(() => {
      return { message: `Added to your collection`, status: "success" };
    })
    .catch((error) => {
      return { message: error.message, status: "error" };
    });
  return result;
};
export const addToReadLater = async (uId, pId, pTitle,pCategory, pURL) => {
  const result = await db
    .collection("users")
    .doc(uId)
    .collection("readlater")
    .doc(pId)
    .set({
      id: pId,
      title: pTitle,
      category:pCategory,
      url: pURL,
      read: false,
    })
    .then(() => {
      return { message: `Saved to ReadLater`, status: "success" };
    })
    .catch((error) => {
      return { message: error.message, status: "error" };
    });
  return result;
};

export const removeFromCollection = async (uId, pId) => {
  const result = await db
    .collection("users")
    .doc(uId)
    .collection("collection")
    .doc(pId)
    .delete()
    .then(() => ({
      message: `removed from your collection`,
      status: "success",
    }));
  return result;
};
export const removeFromReadLater = async (uId, pId) => {
  const result = await db
    .collection("users")
    .doc(uId)
    .collection("readlater")
    .doc(pId)
    .delete()
    .then(() => ({ message: `removed from ReadLater`, status: "success" }));
  return result;
};
