import { Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { UserService } from '../user/user.service';
import { UserRepository } from '../user/repository/user.repository';
import { JwtPayload } from '../utils/types';
import { LoginUserDto } from '../user/dto/user.dto';
import { authFailure, errorMessages, userFailure } from '../utils/constants/errors.constant';
import { User } from '../user/entity/user.entity';

// Authentication service responsible for handling user login and authentication.
@Injectable()
export class AuthService {
  // Constructor to inject dependencies.
  // @param userService User service instance.
  // @param userRepository User repository instance.
  // @param jwtService JWT service instance.
  constructor(
    private userService: UserService,
    private userRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  // Generate a JWT token for an authenticated user.
  // @param loginData Login data containing username and password.
  // @returns A JWT token string.
  async login(loginData: LoginUserDto): Promise<string> {
    let user: User;

    // Attempt to authenticate the user using the provided login data.
    try {
      user = await this.authenticateUser(loginData.username, loginData.pass);
    } catch (error) {
      // If authentication fails, re-throw the error.
      throw error;
    }

    // Check if the authenticated user is active.
    if (!user.isActive) {
      // If the user is not active, throw an unauthorized exception.
      throw new UnauthorizedException(authFailure.INACTIVE_USER);
    }

    // Create a JWT payload containing the user's details.
    const payload: JwtPayload = { username: user.username, userId: user.id, roleId: user.roleId };

    // Generate and return a JWT token.
    return this.jwtService.sign(payload);
  }

  // Authenticate a user using their username and password.
  // @param username Username to authenticate.
  // @param password Password to authenticate.
  // @returns The authenticated user instance.
  async authenticateUser(username: string, password: string): Promise<User> {
    let user: User;

    // Attempt to find the user by their username.
    try {
      user = await this.userRepository.findUser(username);
    } catch (error) {
      // If the user is not found, re-throw the error.
      throw error;
    }

    // Attempt to compare the provided password with the stored password.
    try {
      const isMatching: boolean = await bcrypt.compare(password, user.pass);

      // If the passwords do not match, throw an unauthorized exception.
      if (!isMatching) {
        throw new UnauthorizedException(authFailure.INVALID_CREDENTIALS);
      }
    } catch (error) {
      // If an error occurs during password comparison, check if it's an unauthorized exception.
      if (error instanceof UnauthorizedException) {
        // If it's an unauthorized exception, re-throw it.
        throw error;
      } else {
        // If it's not an unauthorized exception, throw an internal server error.
        throw new InternalServerErrorException(errorMessages.ENCRYPTION_FAILURE);
      }
    }

    // If authentication is successful, return the user instance.
    return user;
  }
}