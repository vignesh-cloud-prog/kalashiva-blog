import { createContext, useState } from "react";

const ShareContext = createContext({
  share: { url: "", title: "", summary: "", open: true },
  addToShare: (data) => {},
  removeFromShre: (data) => {},
});

export function ShareContextProvider(props) {
  const [toShare, settoShare] = useState({
    url: "hii",
    title: "hello",
    open: false,
  });
  const context = {
    share: toShare,
    addToShare: addToShareHandler,
    removeFromShre: removeFromShareHandler,
  };
  function addToShareHandler(data) {
    settoShare(data);
  }
  function removeFromShareHandler(data) {
    settoShare(data);
  }
  return (
    <ShareContext.Provider value={context}>
      {props.children}
    </ShareContext.Provider>
  );
}

export default ShareContext;
