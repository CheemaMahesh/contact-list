import axios from "axios";
import {SignUpForm} from "../../Utils/types";

const useAuth = () => {
    const signin = async (payload: SignUpForm) => {
        let res;
        try {
            res = await axios.post("/api/auth/signin", { email: payload?.email, password: payload?.password });
        } catch (error) {
            
        }
        return res;
    }

    const signup = async (payload: SignUpForm) => {
        let res;
        try {
            res = await axios.post("/api/auth/signup", { email: payload?.email, password: payload?.password, name: payload?.name });
        } catch (error) {
            console.log(error);
        }
        return res;
    }


    return {
        signin,
        signup,
    }
}

export default useAuth;