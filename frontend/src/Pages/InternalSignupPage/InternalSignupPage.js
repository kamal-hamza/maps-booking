import UserForm from "../../Components/UserForm/UserForm";

function InternalSignupPage () {
    return (
        <div>
            <UserForm isSignup={true} isInternal={true} />
        </div>
    );
}
export default InternalSignupPage;