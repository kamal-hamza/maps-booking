import { GoogleAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import app from '../../firebaseConfig';
import { getFirestore, doc, setDoc } from "firebase/firestore";
import { db } from '../../firebaseConfig';
import logo from '../../assets/google-logo.webp';
import ProviderLogin from '../ProviderLogin/ProviderLogin';


function GoogleButton() {

    const registerWithGoogle = async () => {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        const db = getFirestore(app);
        
        try {
            signInWithPopup(auth, provider)
                .then(async (result) => {
                    const user = result.user;
                    await setDoc(doc(db, "users", user.uid), {
                        email: user.email,
                        displayName: user.displayName,
                        isAdmin: false
                    });
                    localStorage.setItem('userID', user.uid);
                    console.log("User signed in:", user);
                })
                .catch((error) => {
                    const errorCode = error.code;
                    const errorMessage = error.message;
                    const email = error.customData ? error.customData.email : "Unknown email";
                    const credential = GoogleAuthProvider.credentialFromError(error);
                    console.error("Error signing in with Google:", errorCode, errorMessage, email, credential);
                });
        } catch (error) {
            console.error("Error during sign-in or Firestore update:", error);
        }
    };

    return (
        <ProviderLogin
            logo={logo}
            text="Sign in with Google"
            onClick={registerWithGoogle}
        />
    );
}

export default GoogleButton;