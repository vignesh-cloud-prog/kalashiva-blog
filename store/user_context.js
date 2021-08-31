import { createContext, useEffect, useState } from "react";
import {
  getUserCollection,
  getUserReadLater,
} from "../components/helperFunc/userData";
import { auth } from "../firebase/firebase";

const UserContext = createContext({
  user: null,
  userCollection: "",
  userReadLater: "",
  userDataChanged: false,
  updateUserDataChanged: () => {},
});

export function UserContextProvider(props) {
  const [user, setUser] = useState(null);
  const [userCollection, setUserCollection] = useState("");
  const [userReadLater, setUserReadLater] = useState("");
  const [userDataChanged, setUserDataChanged] = useState(false);

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        setUserDataChanged(!userDataChanged);
      } else setUser(null);
    });
  }, []);

  useEffect(() => {
    if (user) {
      getUserCollection(user.uid).then((res) => {
        setUserCollection(res.userCollection);
      });
      getUserReadLater(user.uid).then((res) => {
        setUserReadLater(res.userReadLater);
      });
    }
  }, [userDataChanged]);

  function updateUserDataChanged() {
    setUserDataChanged(!userDataChanged);
    console.log("user data changed"+userDataChanged);
  }

  const context = {
    user: user,
    userCollection: userCollection,
    userReadLater: userReadLater,
    userDataChanged: userDataChanged,
    updateUserDataChanged: updateUserDataChanged,
  };

  return (
    <UserContext.Provider value={context}>
      {props.children}
    </UserContext.Provider>
  );
}

export default UserContext;
