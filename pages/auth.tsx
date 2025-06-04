import Input from "@/components/Input"
import { useCallback, useState } from "react"

const Auth = () => {
    const [userName, setUserName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [variant, setVariant] = useState('login');

    const toggleVariant = useCallback(() => {
        setVariant((current) => current === 'login' ? 'register' : 'login');
    }, []);

    return (
        <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
            <div className="bg-black sm:bg-black/50 h-full w-full">
                <nav className="px-10 py-5 ">
                    <img src='/images/logo.png' alt="Netflix logo at top" className="h-12"/>
                </nav>
                <div className="flex justify-center">
                    <div className="bg-black/70 px-16 py-16 self-center mt-2 sm:max-w-md rounded-md w-full">
                        <h2 className="text-white text-4xl mb-8 font-bold font-serif">
                            {variant === 'login' ? "Sign in" : "Register"}
                        </h2>
                        <div className="flex flex-col gap-4">
                            {variant == 'register' && <Input label="Username" id="userName" type="userName" onChange={(e: any) => {setUserName(e.target.value)}} value={userName}/>}
                            <Input label="Email" id="email" type="email" onChange={(e: any) => {setEmail(e.target.value)}} value={email}/>
                            <Input label="Password" id="password" type="password" onChange={(e: any) => {setPassword(e.target.value)}} value={password}/>
                            {variant == 'register' && <Input label="Confirm Password" id="confirmPassword" type="confirmPassword" onChange={(e: any) => {setConfirmPassword(e.target.value)}} value={confirmPassword}/>}
                        </div>
                        <button className="bg-red-600 py-3 w-full mt-6 rounded-md text-white font-bold hover:bg-red-700 transition hover:cursor-pointer">
                            {variant === 'login' ? "Login" : "Sign up"}
                        </button>
                        <p className="text-gray-400 mt-10">
                           {variant === 'login' ? "New to Netflix?" : "Already have an account?"}
                            <span className="hover:underline font-bold px-2 text-white hover:cursor-pointer" onClick={toggleVariant}>{
                            variant === 'login' ? "Register" : "Login"}</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}


export default Auth