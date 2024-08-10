import { OAuthProvider, getAuth, signInWithPopup } from "firebase/auth"
import app from '../../firebaseConfig';
import logo from '../../assets/microsoft-logo.svg';
import ProviderLogin from '../ProviderLogin/ProviderLogin';


function MicrosoftButton () {

    const registerWithMicrosoft = async () => {
        const auth = getAuth(app);
        const provider = new OAuthProvider('microsoft.com');
        
        try {
            const result = await signInWithPopup(auth, provider);
            const credential = OAuthProvider.credentialFromResult(result);
            const user = result.user;
            localStorage.setItem('userID', user.uid);
            console.log("User signed in:", user);
        } catch (error) {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.customData ? error.customData.email : "Unknown email";
            const credential = OAuthProvider.credentialFromError(error);
            console.error("Error signing in with Microsoft:", errorCode, errorMessage, email, credential);
        }
    };

    return (
        <ProviderLogin
            logo={logo}
            text="Sign in with Microsoft"
            onClick={registerWithMicrosoft}
        />
    );
}

export default MicrosoftButton;