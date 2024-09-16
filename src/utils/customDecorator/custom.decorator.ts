import { SetMetadata } from '@nestjs/common';
import { validRoleId } from '../../user/entity/role.entity';

// Decorator for publicly accessible routes (no authentication required)
// Usage: @Public()
export const PUBLIC_KEY = 'isPublic';
export const Public = () => SetMetadata(PUBLIC_KEY, true);

// Decorator for routes accessible by both users and admins
// Usage: @UserAndAdmin()
export const ROLES_KEY = 'roles';
export const UserAndAdmin = () => SetMetadata(ROLES_KEY, [validRoleId.subAdmin, validRoleId.admin]);

// Decorator for admin-only routes
// Usage: @AdminOnly()
export const AdminOnly = () => SetMetadata(ROLES_KEY, [validRoleId.admin]);

// Existing Roles decorator (kept for backward compatibility)
// Usage: @Roles('role1', 'role2', ...)
export const Roles = (...roles: string[]) => SetMetadata(ROLES_KEY, roles);