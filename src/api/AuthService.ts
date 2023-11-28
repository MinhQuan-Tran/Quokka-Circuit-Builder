import {AxiosInstance} from "axios";
import {LoginUserDto, RegisterUserDto} from "../common/dtos";

class AuthService {
    private readonly axios : AxiosInstance;

    constructor(axiosInstance : AxiosInstance) {
        this.axios = axiosInstance;
    }

    public async register(registerUserDto : RegisterUserDto) {
        try {
            return this.axios.post('/register', registerUserDto);
        }
        catch (error) {
            console.log("Error ", error);
        }
    }

    public async login(loginUserDto: LoginUserDto) {
        try {
            return this.axios.post('/login', loginUserDto);
        } catch (error) {
            console.log("Error ", error);
        }
    }

    public async getMe() {
        try {
             return this.axios.post('users/me', {email: localStorage.getItem("userEmail")});
        } catch (error) {
            console.log("Error ", error);
        }
    }

}

export default AuthService;
