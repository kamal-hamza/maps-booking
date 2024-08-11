import UserForm from "../../Components/UserForm/UserForm";

function InternalLoginPage() {
    return (
        <div>
            <UserForm isSignup={false} isInternal={true} />
        </div>
    );
}

export default InternalLoginPage;