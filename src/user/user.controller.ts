import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Req, Request, HttpCode, HttpStatus } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { AdminOnly, Public, UserAndAdmin } from '../utils/customDecorator/custom.decorator';
import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { StandardResponse, userEmbeddedRequest } from '../utils/types';
import { User } from './entity/user.entity';
import { standardizeErrorResponse, standardizeResponse } from '../utils/utilityFunction';
import { userSuccess } from '../utils/constants/success.constant';
import { StatusCodes } from '../utils/constants/statusCodes.constant';
import { UpdateResult } from 'typeorm';

// Controller for handling user-related operations
@Controller('users')
@UseGuards(JwtAuthGuard, RolesGuard)  // Apply JWT authentication and role-based access control to all routes
export class UserController {
  constructor(private readonly userService: UserService) {}

  // Create a new user (Public access)
  @Post("register")
  @Public()
  async addNewUser(@Body() createUserDto: CreateUserDto) {
    // Attempt to create a new user and handle potential errors
    let response: User;
    try{
      response = await this.userService.addNewUser(createUserDto);
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(HttpStatus.CREATED, userSuccess.USER_CREATED, response);
  }

  // Get all users (Admin only)
  @Get()
  @AdminOnly()
  @UseGuards(RolesGuard)
  async getAllUsers() {
    // Retrieve all sub-admin users and convert to safe transfer DTOs
    let users: User[];
    let result: SafeTransferUserDto[];

    try{
      users = await this.userService.getAllSubAdmins();
      result = users.map(user=>this.userService.userEntityToShareableDto(user));
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(HttpStatus.OK, userSuccess.FETCHED_USER_LIST, result);
  }
  
  // Get details of the authenticated user
  @Get('details')
  @UserAndAdmin()
  async getOwnDetials(@Req() req: userEmbeddedRequest) {
    // Retrieve and return the authenticated user's details
    let user: User;
    let result: SafeTransferUserDto;
    try{
      user = (await this.userService.getUser( req.user.username ));
      result = this.userService.userEntityToShareableDto(user);
    }
    catch(error){
      standardizeErrorResponse(error);
    }
    return standardizeResponse(HttpStatus.OK, userSuccess.FETCHED_USER, result);
  }

  // Get details of a specific user by username (Admin only)
  @Get('details/:username')
  @AdminOnly()
  async getUser(@Param('username') username: string) {
    // Retrieve and return details of a specific user
    let user: User;
    try{
      user =  await this.userService.getUserIfSubAdmin(username);
    }
    catch(error){
      standardizeErrorResponse(error);
    }
    const result: SafeTransferUserDto = this.userService.userEntityToShareableDto(user);
    return standardizeResponse(HttpStatus.OK, userSuccess.FETCHED_USER, result);
  }
  
  // Deactivate the authenticated user's account
  @Patch("deactivate")
  @UserAndAdmin()
  async deactivateSelf(@Req() req: userEmbeddedRequest){
    // Deactivate the authenticated user's account
    let deactivatedUser: User;
    try{
      deactivatedUser = await this.userService.updateUser(req.user.username, {isActive: false} as UpdateUserDto);
    }
    catch(error){
      standardizeErrorResponse(error);
    }

    return standardizeResponse(StatusCodes.UPDATED, userSuccess.DEACTIVATED, deactivatedUser);
  }

  // Deactivate a specific user's account (Admin only)
  @Patch("deactivate/:username")
  @AdminOnly()
  async deactivateUser(@Param('username') username: string){
    // Deactivate a specific user's account
    let deactivatedUser: User;
    try{
      deactivatedUser = await this.userService.updateUser(username, {isActive: false} as UpdateUserDto)
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(StatusCodes.UPDATED, userSuccess.DEACTIVATED, deactivatedUser)
  }

  // Activate a specific user's account (Admin only)
  @Patch("activate/:username")
  @AdminOnly()
  async activateUser(@Param('username') username: string){
    // Activate a specific user's account
    let activatedUser: User;
    try{
      activatedUser = await this.userService.updateUser(username, {isActive: true} as UpdateUserDto)
    }
    catch(error){
      return standardizeErrorResponse(error);
    }

    return standardizeResponse(StatusCodes.UPDATED, userSuccess.ACTIVATED, activatedUser);
  }

  // Delete the authenticated user's account
  @Delete("delete")
  @UserAndAdmin()
  async deleteOwnDetails(@Request() req: userEmbeddedRequest) {
    // Delete the authenticated user's account
    let isUserDeleted: UpdateResult;
    try{
      isUserDeleted = await this.userService.deleteUser(req.user.userId);
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(StatusCodes.UPDATED, userSuccess.ACTIVATED, isUserDeleted);
  }
  
  // Delete a specific user's account (Admin only)
  @Delete('delete/:username')
  @AdminOnly()
  async deleteUser(@Param('username') username: string) {
    // Delete a specific user's account
    let isUserDeleted: UpdateResult;
    try{
      isUserDeleted = await this.userService.deleteUser(username);
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(StatusCodes.UPDATED, userSuccess.USER_DELETED, isUserDeleted);
  }

  // Update a specific user's details (Admin only)
  @Patch(':username')
  @AdminOnly()
  async updateUser(@Param('username') username: string, @Body() updateUserDto: UpdateUserDto) {
    // Update a specific user's details
    let updatedUser: User;
    try{
      updatedUser = await this.userService.updateUser(username, updateUserDto);
    }
    catch(error){
      return standardizeErrorResponse(error);
    }
    return standardizeResponse(StatusCodes.UPDATED, userSuccess.USER_UPDATED, updatedUser);
  }
}