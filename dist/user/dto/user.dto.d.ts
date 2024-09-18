import { validRoleId } from "../entity/role.entity";
import { User } from "../entity/user.entity";
export declare class CreateUserDto {
    roleId: validRoleId;
    isActive: boolean;
    firstName: string;
    lastName: string;
    username: string;
    password: string;
    email: string;
    contact: string;
}
export declare class SafeTransferUserDto extends User {
    password: string;
    deletedAt: Date;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    password?: string;
    deletedAt?: Date;
    roleId?: validRoleId;
}
export declare class LoginUserDto {
    username: string;
    password: string;
}
export {};
