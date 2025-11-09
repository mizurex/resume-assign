import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router-dom";

export default function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        // Require a Gmail address
        const gmailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/i;
        if (!gmailRegex.test(username)) {
            setError('Please use a valid Gmail address (e.g., name@gmail.com)');
            return;
        }
        if(username === 'testuser@gmail.com' && password === '1234'){
            sessionStorage.setItem('isAuthed', 'true');
            setError('');
            navigate('/resume', { replace: true });
        }   
        else{
            setError('Invalid username or password');
        }
    };
    
    return (
        <div className="min-h-screen bg-zinc-100 text-gray-900 font-mono selection:bg-zinc-500 selection:text-zinc-100 flex items-center justify-center px-4">
            <div className="w-full max-w-sm bg-white rounded-xl shadow p-6">
                <h1 className="text-2xl font-bold tracking-tight text-zinc-900">Login</h1>
                {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
                <form onSubmit={handleSubmit} className="mt-4 space-y-3">
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Gmail</label>
                        <input
                            type="email"
                            placeholder="name@gmail.com"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            required
                            pattern="^[a-zA-Z0-9._%+-]+@gmail\.com$"
                            title="Please enter a Gmail address like name@gmail.com"
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                        />
                    </div>
                    <div>
                        <label className="block text-sm text-gray-700 mb-1">Password</label>
                        <input
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            className="w-full rounded-md border border-neutral-300 px-3 py-2 text-sm text-gray-800 placeholder-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-neutral-400"
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded-md border border-zinc-300 bg-[#e7eefc] hover:bg-[#dbe7fc] px-3 py-2 text-sm text-gray-800 cursor-pointer"
                    >
                        Login
                    </button>
                </form>
                <p className="text-sm text-gray-500 mt-8"> use <span className="font-bold">testuser@gmail.com</span> and <span className="font-bold">1234</span> as credentials</p>
            </div>
        </div>
    )
}