import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { StandardResponse, userEmbeddedRequest } from '../utils/types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addNewUser(createUserDto: CreateUserDto): Promise<StandardResponse>;
    getAllUsers(): Promise<StandardResponse>;
    getOwnDetials(req: userEmbeddedRequest): Promise<StandardResponse>;
    getUser(username: string): Promise<StandardResponse>;
    deactivateSelf(req: userEmbeddedRequest): Promise<StandardResponse>;
    deactivateUser(username: string): Promise<StandardResponse>;
    activateUser(username: string): Promise<StandardResponse>;
    deleteOwnDetails(req: userEmbeddedRequest): Promise<StandardResponse>;
    deleteUser(username: string): Promise<StandardResponse>;
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<StandardResponse>;
}
