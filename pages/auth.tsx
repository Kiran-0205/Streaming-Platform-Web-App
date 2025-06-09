import Input from "@/components/Input";
import { useCallback, useState } from "react";
import axios from "axios";
import { signIn } from "next-auth/react";

import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

const Auth = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  // const [confirmPassword, setConfirmPassword] = useState('');
  const [variant, setVariant] = useState("login");

  const toggleVariant = useCallback(() => {
    setVariant((current) => (current === "login" ? "register" : "login"));
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn("credentials", {
        email,
        password,
        callbackUrl: "/profiles",
      });
    
    } catch (err) {
      console.log(err);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post("/api/register", {
        email,
        name,
        password,
      });

      login();
    } catch (err) {
      console.log(err);
    }
  }, [email, name, password]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-center bg-no-repeat bg-fixed bg-cover">
      <div className="bg-black sm:bg-black/50 h-full w-full">
        <nav className="px-5 py-5 ">
          <img
            src="/images/logo.png"
            alt="Netflix logo at top"
            className="h-12 scale-75"
          />
        </nav>
        <div className="flex justify-center">
          <div className="bg-black/70 px-16 py-16 self-center mt-2 sm:max-w-md rounded-md w-full">
            <h2 className="text-white text-4xl mb-8 font-bold font-serif">
              {variant === "login" ? "Sign in" : "Register"}
            </h2>
            <div className="flex flex-col gap-4">
              {variant == "register" && (
                <Input
                  label="Username"
                  id="userName"
                  type="userName"
                  onChange={(e: any) => {
                    setName(e.target.value);
                  }}
                  value={name}
                />
              )}
              <Input
                label="Email"
                id="email"
                type="email"
                onChange={(e: any) => {
                  setEmail(e.target.value);
                }}
                value={email}
              />
              <Input
                label="Password"
                id="password"
                type="password"
                onChange={(e: any) => {
                  setPassword(e.target.value);
                }}
                value={password}
              />
              {/* {variant == 'register' && <Input label="Confirm Password" id="confirmPassword" type="confirmPassword" onChange={(e: any) => {setConfirmPassword(e.target.value)}} value={confirmPassword}/>} */}
            </div>
            <button
              onClick={variant === "login" ? login : register}
              className="bg-red-600 py-3 w-full mt-6 rounded-md text-white font-bold hover:bg-red-700 transition hover:cursor-pointer"
            >
              {variant === "login" ? "Login" : "Sign up"}
            </button>
            <div className="flex flex-row items-center justify-center mt-6 gap-2">
              <div onClick={() => signIn('google', { callbackUrl: '/profiles' })}
              className="bg-white h-10 w-10 flex items-center justify-center rounded-full scale-90 cursor-pointer hover:opacity-80">
                <FcGoogle className="size-3/4" />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className="bg-white h-10 w-10 flex items-center justify-center rounded-full scale-90 cursor-pointer hover:opacity-80"
              >
                <FaGithub className="size-3/4" />
              </div>
            </div>
            <p className="text-gray-400 mt-10">
              {variant === "login"
                ? "New to Netflix?"
                : "Already have an account?"}
              <span
                className="hover:underline font-bold px-2 text-white hover:cursor-pointer"
                onClick={toggleVariant}
              >
                {variant === "login" ? "Register" : "Login"}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Auth;
