import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AdminOnly, Public, UserAndAdmin } from '../utils/customDecorator/custom.decorator';
import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { userEmbeddedRequest } from '../utils/types';
import { User } from './entity/user.entity';

@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)  // Apply JWT authentication and role-based access control to all routes
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user (Admin only)
  @Post("register")
  @Public()
  async addNewUser(@Body() createUserDto: CreateUserDto) {
    return await this.userService.addNewUser(createUserDto);
  }

  // Get all users (Admin only)
  @Get()
  @AdminOnly()
  @UseGuards(RolesGuard)
  async getAllUsers() {
    const users: User[] = await this.userService.getAllSubAdmins();
    const result: SafeTransferUserDto[] = users.map(user=>this.userService.userEntityToShareableDto(user));
    return result;
  }
  
  // Get a specific user by username (Accessible by both users and admins)
  @Get('details')
  @UserAndAdmin()
  async getOwnDetials(@Req() req: userEmbeddedRequest) {
    const res: User|null = (await this.userService.getUser( req.user.username ));
    return this.userService.userEntityToShareableDto(res);
  }

  // Get a specific user by username (Accessible by both users and admins)
  @Get('details/:username')
  @AdminOnly()
  async getUser(@Param('username') username: string) {
    const res: User =  await this.userService.getUserIfSubAdmin(username);
    return res;
  }

  // Delete a self (AdminAndUser)
  @Delete("delete")
  @UserAndAdmin()
  deleteOwnDetails(@Request() req: userEmbeddedRequest) {
    return this.userService.deleteUser(req.user.userId);
  }
  
  // Delete a user (Admin only)
  @Delete('delete/:username')
  @AdminOnly()
  deleteUser(@Param('username') username: string) {
    return this.userService.deleteUser(username);
  }

  // Update a user (Admin only)
  @Patch(':username')
  @AdminOnly()
  async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    return await this.userService.updateUser(username, updateUserDto);
  }

  @Patch(":username")
  @AdminOnly()
  async deactivateUser(@Param('username') username: string){
    return await this.userService.updateUser(username, {isActive: false} as UpdateUserDto)
  }

  @Patch()
  @UserAndAdmin()
  async deactivateSelf(@Req() req: userEmbeddedRequest){
    return await this.userService.updateUser(req.user.username, {isActive: false} as UpdateUserDto)
  }

  @Patch(":username")
  @AdminOnly()
  async activateUser(@Param('username') username: string){
    return await this.userService.updateUser(username, {isActive: false} as UpdateUserDto)
  }

}