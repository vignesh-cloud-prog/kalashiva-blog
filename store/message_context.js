import { createContext, useState } from "react";

const MessageContext = createContext({
  message: { msg: "", type: "", open: true,duration:6000 },
  addMessage: (msg,type,duration) => {},
  removeMessage: () => {},
});

export function MessageContextProvider(props) {
  const [theMessage, setMessage] = useState({
    msg: "hii",
    type: "success",
    open: false,
    duration:6000 
  });
  const context = {
    message: theMessage,
    addMessage: addMessageHandler,
    removeMessage: removeMessageHandler,
  };
  function addMessageHandler(msg,type,duration) {
    setMessage({msg:msg,type:type,duration:duration ,open:true});
  }
  function removeMessageHandler() {
    setMessage({open:false});
  }

  return (
    <MessageContext.Provider value={context}>
      {props.children}
    </MessageContext.Provider>
  );
}

export default MessageContext;
