"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Roles = exports.AdminOnly = exports.UserAndAdmin = exports.ROLES_KEY = exports.Public = exports.PUBLIC_KEY = void 0;
const common_1 = require("@nestjs/common");
const role_entity_1 = require("../../user/entity/role.entity");
exports.PUBLIC_KEY = 'isPublic';
const Public = () => (0, common_1.SetMetadata)(exports.PUBLIC_KEY, true);
exports.Public = Public;
exports.ROLES_KEY = 'roles';
const UserAndAdmin = () => (0, common_1.SetMetadata)(exports.ROLES_KEY, [role_entity_1.validRoleId.subAdmin, role_entity_1.validRoleId.admin]);
exports.UserAndAdmin = UserAndAdmin;
const AdminOnly = () => (0, common_1.SetMetadata)(exports.ROLES_KEY, [role_entity_1.validRoleId.admin]);
exports.AdminOnly = AdminOnly;
const Roles = (...roles) => (0, common_1.SetMetadata)(exports.ROLES_KEY, roles);
exports.Roles = Roles;
//# sourceMappingURL=custom.decorator.js.map