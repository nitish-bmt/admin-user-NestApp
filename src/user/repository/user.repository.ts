import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "../entity/user.entity";
import { Repository } from "typeorm";
import * as bcrypt from "bcrypt";
import { CreateUserDto, UpdateUserDto } from "../dto/user.dto";
import { authFailure, dbFailure, errorMessages, userFailure } from "../../utils/constants/errors.constant";
import { validRoleId } from "../entity/role.entity";

@Injectable()
export class UserRepository extends Repository<User> {

  // Constructor to inject the User repository into this custom repository
  constructor(
    @InjectRepository(User) // Injecting TypeORM's User repository
    private userRepository: Repository<User>,
  ) {
    // Super call to inherit behavior from TypeORM's Repository class
    super(
      userRepository.target, 
      userRepository.manager, 
      userRepository.queryRunner,
    );
  }

  // Method to find a user by username or email
  async findUser(username?: string, email?: string): Promise<User> {
    const whereClause: Partial<User> = {}; // Define empty search condition object

    // Add search conditions based on input
    if (username) whereClause.username = username;
    else if (email) whereClause.email = email;
    else throw new BadRequestException(errorMessages.INSUFFICIENT_ARGUMENTS); // Throw error if no arguments provided

    let user: User;
    try {
      // Search for a user based on the where clause
      user = await this.userRepository.findOne({ where: whereClause });
      if(!user) throw new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND);
    } 
    catch (error) {
      throw new InternalServerErrorException(dbFailure.DB_FAILURE);
    }

    return user; // Return found user
  }

  // Method to retrieve all users with the role of subAdmin
  async getAllSubAdmins(): Promise<User[]> {
    let users: User[];
    try {
      // Find all users where roleId is subAdmin
      users = await this.userRepository.find({
        where: {
          roleId: validRoleId.subAdmin,
        },
      });
      if(!users)  
        throw new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND); // Throw if users are not found
    } 
    catch (error) {
      throw new InternalServerErrorException(dbFailure.DB_FAILURE);
    }

    return users; // Return array of subAdmins
  }

  // Method to add a new user
  async addUser(newUserData: CreateUserDto) {

    let newUser: User;
    try {
      const usr = this.userRepository.create(newUserData); // Create new user instance
      newUser = await this.userRepository.save(usr); // Save the user to the database
    } 
    catch (error) {
      console.log(error); // Log error to console for debugging
      throw new InternalServerErrorException(dbFailure.DB_WRITE_FAILURE); // Throw if saving fails
    }

    return newUser;
  }

  // Method to update an existing user
  async updateUser(username: string, updateData: UpdateUserDto): Promise<User> {
    let user: User;
    try {
      user = await this.findUser(username); // Retrieve user by username
    } 
    catch (error) {
      throw error; // Re-throw bad request exceptions
    }

    // If password needs to be updated, hash it before updating
    if (updateData.pass) {
      try {
        updateData.pass = await bcrypt.hash(updateData.pass, Number(process.env.SALT_ROUNDS)); // Encrypt password
      } 
      catch (error) {
        throw new Error(errorMessages.ENCRYPTION_FAILURE); // Throw error if encryption fails
      }
    }

    // Update the user's data with new values
    Object.assign(user, updateData);

    let updatedUser: User;
    try {
      updatedUser = await this.userRepository.save(user); // Save the updated user
    } 
    catch (error) {
      throw new InternalServerErrorException(dbFailure.DB_WRITE_FAILURE); // Throw if saving fails
    }

    return updatedUser; // Return updated user
  }
}
