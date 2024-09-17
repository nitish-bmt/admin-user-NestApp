import { validRoleId } from '../../user/entity/role.entity';
export declare const PUBLIC_KEY = "isPublic";
export declare const Public: () => import("@nestjs/common").CustomDecorator<string>;
export declare const ROLES_KEY = "roles";
export declare const Roles: (...roles: validRoleId[]) => import("@nestjs/common").CustomDecorator<string>;
