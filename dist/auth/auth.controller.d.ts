import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dto/user.dto';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    login(loginCredentials: LoginUserDto): Promise<string>;
}
