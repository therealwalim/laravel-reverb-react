import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "src/context/AuthContext";


const Login = () => {

    const { login, isAuthenticated } = useAuthContext();
    const [error, setError] = useState(null);

    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        const formData = new FormData(e.target);
        const { email, password } = Object.fromEntries(formData);

        if (!email || !password) {
            setError("Email and Password are required");
            return;
        }

        try {
            await login({ email, password });
            console.log("Login successful");
            window.location.href = "/dashboard";
        } catch (err) {
            console.error("Login failed:", err);
            setError("Invalid email or password");
        }
    };

    useEffect(() => {
        if (isAuthenticated) {
            navigate("/dashboard");
        }
    }, [isAuthenticated, navigate]);

    return (
        <div className="w-full h-screen grid place-items-center">
            <div>
                <h1 className="text-3xl">Login</h1>
                <form className="flex flex-col gap-4 mt-3" onSubmit={handleSubmit}>
                    <input
                        name="email"
                        className="border-solid border-2 border-gray-300 px-1 py-1"
                        type="email"
                        placeholder="Email"
                    />
                    <input
                        name="password"
                        className="border-solid border-2 border-gray-300 px-1 py-1"
                        type="password"
                        placeholder="Password"
                    />
                    {error && <p className="text-red-500">{error}</p>} {/* Display errors */}
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;