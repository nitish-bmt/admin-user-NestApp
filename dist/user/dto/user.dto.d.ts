import { validRoleId } from "../entity/role.entity";
import { User } from "../entity/user.entity";
export declare class CreateUserDto {
    roleId: validRoleId;
    isActive: boolean;
    firstName: string;
    lastName: string;
    username: string;
    pass: string;
    email: string;
    contact: string;
}
export declare class SafeTransferUserDto extends User {
    pass: string;
    deletedAt: Date;
}
declare const UpdateUserDto_base: import("@nestjs/common").Type<Partial<CreateUserDto>>;
export declare class UpdateUserDto extends UpdateUserDto_base {
    pass?: string;
    deletedAt?: Date;
    roleId?: validRoleId;
}
export declare class LoginUserDto {
    username: string;
    pass: string;
}
export {};
