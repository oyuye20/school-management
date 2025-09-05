import React, {
  type ChangeEvent,
  type FormEvent,
  useEffect,
  useState,
} from "react";
import { http } from "../services/http";

const LoginPage = () => {
  const [formValue, setFormValue] = useState({
      email: "",
      password: "",
    });
  
    const [errorMsg, setErrorMsg] = useState({
      email: "",
      password: "",
    });
  
    const loginBtn = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      console.log(formValue);
      await http
        .get("sanctum/csrf-cookie")
        .then(async () => {
          await http
            .post("api/v1/login", formValue)
            .then((res) => {
              console.log(res);
            })
            .catch((err) => {
              console.log(err.response.data);
            });
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    };
  
    const getUserInfo = () => {
      http
        .get("api/user")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
  
      /* http
          .get("api/v1/teachers")
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            console.log(err);
          }); */
  
  
    };
  
    const Logout = () => {
      http
        .post("http://localhost:8000/api/logout")
        .then((res) => {
          console.log(res);
        })
        .catch((err) => {
          console.log(err);
        });
    };
  
    return (
      <>
        <div className="h-dvh flex justify-center items-center bg-[#F6FFF4]">
          <form
            onSubmit={loginBtn}
            className="flex flex-col gap-4 w-[500px] border-[#BEBEBE] border-[0.9px]
                  p-5 py-10 m-4 rounded-lg"
          >
            <div className="flex flex-col">
              <div className="text-center flex flex-col gap-4">
                <h1 className="font-bold text-3xl">Login</h1>
                <p>Login with your credentials</p>
              </div>
  
              <div className="email flex flex-col gap-2">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="border-[1px] border-[#CCCCCC] p-2"
                  name="email"
                  onChange={(e) =>
                    setFormValue({ ...formValue, email: e.target.value })
                  }
                />
              </div>
  
              <div className="password flex flex-col gap-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="border-[1px] border-[#CCCCCC] p-2"
                  name="password"
                  onChange={(e) =>
                    setFormValue({ ...formValue, password: e.target.value })
                  }
                />
  
                <a
                  href=""
                  className="text-right pt-2 text-[#5D62C9] font-semibold"
                >
                  Forgot Password?
                </a>
              </div>
  
              <div className="flex flex-col">
                <button type="submit" className="bg-[#72AF72] p-2 text-white">
                  Login
                </button>
                <a href="" className="text-center py-2">
                  Don't have account? <span>Sign up?</span>
                </a>
              </div>
            </div>
  
            <button type="button" className="bg-green-300" onClick={getUserInfo}>
              Get user info
            </button>
            <button type="button" className="bg-green-300" onClick={Logout}>
              Logout
            </button>
          </form>
        </div>
      </>
    );
}

export default LoginPage