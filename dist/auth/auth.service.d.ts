import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { LoginUserDto } from '../user/dto/user.dto';
import { User } from '../user/entity/user.entity';
export declare class AuthService {
    private userService;
    private userRepository;
    private jwtService;
    constructor(userService: UserService, userRepository: UserRepository, jwtService: JwtService);
    validateUser(username: string, password: string): Promise<User | null>;
    login(loginData: LoginUserDto): Promise<string>;
    authenticateUser(username: string, password: string): Promise<User>;
}
