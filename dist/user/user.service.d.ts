import { UserRepository } from "./repository/user.repository";
import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import { RoleRepository } from "./repository/role.repository";
import { UpdateResult } from "typeorm";
export declare class UserService {
    private userRepository;
    private readonly roleRepository;
    constructor(userRepository: UserRepository, roleRepository: RoleRepository);
    userEntityToShareableDto(user: User): SafeTransferUserDto;
    getAllSubAdmins(): Promise<User[]>;
    getUser(username: string): Promise<User>;
    getUserIfSubAdmin(username: string): Promise<User | null>;
    addNewUser(newUserData: CreateUserDto): Promise<User>;
    updateUser(username: string, dataToUpdate: UpdateUserDto): Promise<User>;
    deleteUser(username: string): Promise<UpdateResult>;
}
