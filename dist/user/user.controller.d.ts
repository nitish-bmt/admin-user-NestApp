import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { userEmbeddedRequest } from '../utils/types';
import { User } from './entity/user.entity';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addNewUser(createUserDto: CreateUserDto): Promise<User>;
    getAllUsers(): Promise<SafeTransferUserDto[]>;
    getOwnDetials(req: userEmbeddedRequest): Promise<SafeTransferUserDto>;
    getUser(username: string): Promise<User>;
    deleteOwnDetails(req: userEmbeddedRequest): Promise<import("typeorm").UpdateResult>;
    deleteUser(username: string): Promise<import("typeorm").UpdateResult>;
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<User>;
    deactivateUser(username: string): Promise<User>;
    deactivateSelf(req: userEmbeddedRequest): Promise<User>;
    activateUser(username: string): Promise<User>;
}
