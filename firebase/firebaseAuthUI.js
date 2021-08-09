// /config/firebaseAuthUI.config.js
export const uiConfig = (firebase) => {
  return {
    signInFlow: "popup",
    signInSuccessUrl: "/",
    tosUrl: "/terms-of-service",
    privacyPolicyUrl: "/privacy-policy",
    signInOptions: [
        firebase.auth.PhoneAuthProvider.PROVIDER_ID,
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,

      
    ],
  };
};
