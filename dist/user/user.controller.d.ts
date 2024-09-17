import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { userEmbeddedRequest } from '../utils/types';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    addNewUser(userToBeCreated: CreateUserDto): Promise<import("../utils/types").StandardResponse>;
    getAllUsers(): Promise<import("../utils/types").StandardResponse>;
    getOwnDetials(req: userEmbeddedRequest): Promise<import("../utils/types").StandardResponse>;
    getUser(username: string): Promise<import("../utils/types").StandardResponse>;
    deactivateUser(username: string): Promise<import("../utils/types").StandardResponse>;
    activateUser(username: string): Promise<import("../utils/types").StandardResponse>;
    deleteUser(username: string): Promise<import("../utils/types").StandardResponse>;
    updateOwnDetails(req: userEmbeddedRequest, dataToUpdate: UpdateUserDto): Promise<import("../utils/types").StandardResponse>;
    updateUser(username: string, updateUserDto: UpdateUserDto): Promise<import("../utils/types").StandardResponse>;
}
