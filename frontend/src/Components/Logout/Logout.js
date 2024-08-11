import { useEffect } from "react";
import { redirect } from "react-router-dom";
import { getAuth, signOut } from "firebase/auth";
import app from "../../firebaseConfig";

function Logout() {

    const auth = getAuth(app);

    useEffect(() => {
        const handleLogout = async () => {
            try {
                await signOut(auth);
                localStorage.clear();
                console.log("called")
                redirect("/login");
            } catch (error) {
                console.error("Error signing out: ", error);
            }
        };
        handleLogout();
    }, []);
    return (
        <div>
            <h1>loading....</h1>
        </div>
    );
}

export default Logout;