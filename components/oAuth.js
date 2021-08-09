import StyledFirebaseAuth from "react-firebaseui/StyledFirebaseAuth";
import firebase from "firebase/app";
import { auth } from "../firebase/firebase";
import { uiConfig } from "../firebase/firebaseAuthUI";



export default function OAuth() {
    const authConfig = uiConfig(firebase);
    return (
        <div>
                    <StyledFirebaseAuth uiConfig={authConfig} firebaseAuth={auth} />

        </div>
    )
}
