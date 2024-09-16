import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
export declare class UserRepository extends Repository<User> {
    private userRepository;
    constructor(userRepository: Repository<User>);
    findUser(username?: string, email?: string): Promise<User>;
    getAllSubAdmins(): Promise<User[]>;
    addUser(newUserData: CreateUserDto): Promise<User>;
    updateUser(username: string, updateData: UpdateUserDto): Promise<User>;
}
