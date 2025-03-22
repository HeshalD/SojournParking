import { useState } from "react";
import { useParams } from "react-router-dom";

const ResetPassword = () => {
    const { token } = useParams();
    const [newPassword, setNewPassword] = useState("");
    const [message, setMessage] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:8070/user/reset-password/${token}`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ newPassword }),
        });

        const data = await response.json();
        setMessage(data.message);
    };

    return (
        <div className="auth-page">
            <div className="auth-card">
                <h2>Reset Password</h2>
                <p>Make Your New Password</p>
                <form onSubmit={handleSubmit}>
                    <input
                        type="password"
                        className="auth-input"
                        placeholder="Enter new password"
                        value={newPassword}
                        onChange={(e) => setNewPassword(e.target.value)}
                        required
                    />
                    <button type="submit" className="auth-btn">Reset Password</button>
                </form>
                {message && <p className="message">{message}</p>}
            </div>
        </div>
    );
};

export default ResetPassword;
