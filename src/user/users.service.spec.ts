import { Test, TestingModule } from "@nestjs/testing";
import { AuthService } from "../auth/auth.service";
import { JwtService } from "@nestjs/jwt";
import { UserRepository } from "./repository/user.repository";
import { UserService } from "./user.service";
import { CreateUserDto, SafeTransferUserDto, UpdateUserDto } from "./dto/user.dto";
import { dbFailure } from "../utils/constants/errors.constant";
import { User } from "./entity/user.entity";
import { InternalServerErrorException, NotFoundException } from "@nestjs/common";

// Unit test for the UserService
describe('UserService', () => {

  let service: UserService;

  // mocking required repository for mock injection
  const mockUserRepository = {
    getUserList: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    userExists: jest.fn(),
    softDelete: jest.fn(),
    isUserRegistered: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        AuthService,
        JwtService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  // test for the service
  it('should be defined', ()=>{
    expect(service).toBeDefined();
  });

  // tests for showAllUsers method
  describe('getAllSubAdmins', ()=>{

    // mocking
    const users: User[] = [
      { 
        id: "245", 
        isActive: true,
        firstName: 'nitish', 
        lastName: 'rawat', 
        username: 'nitish', 
        email: 'abhishek@binmile.com', 
        contact: '1234567890', 
        pass: 'abc', 
        createdAt: new Date(),
        deletedAt: null, 
        roleId: 2, 
      },
      { 
        id: "123",
        isActive: true,
        firstName: 'abhishek', 
        lastName: 'singh', 
        username: 'abhishek', 
        email: 'nitish@binmile.com', 
        contact: '1234567890', 
        pass: 'xyz', 
        createdAt: new Date(),
        deletedAt: null, 
        roleId: 1, 
      },
    ];

    // test case 1
    it('should return an array of subAdmins', async () => {

      // mocking repo method call
      jest.spyOn(mockUserRepository, 'getUserList').mockResolvedValue(users);

      // conforming the result
      expect(await service.getAllSubAdmins()).toBe(users);

      // conforming the mockUserRepository method is called
      expect(mockUserRepository.getUserList).toHaveBeenCalled();
    });

    // test case 2
    it('should return an empty array when no users exist', async () => {

      // expected result
      const result:SafeTransferUserDto[] = [];

      // mock repo method call
      jest.spyOn(mockUserRepository, 'getUserList').mockResolvedValue(result);

      // conforming the result
      expect(await service.getAllSubAdmins()).toBe(result);

      // conforming the mockUserRepository method is called
      expect(mockUserRepository.getUserList).toHaveBeenCalled();
    });

    // test case 3
    it('should throw an error when database operation fails', async () => {

      // mocking
      mockUserRepository.getUserList.mockRejectedValue(
        new InternalServerErrorException(dbFailure.DB_FAILURE)
      );

      // conforming the result
      await expect(service.getAllSubAdmins()).rejects.toThrow(
        new InternalServerErrorException(dbFailure.DB_FAILURE)
      );
    });
                
  });

  // // tests for checkUser method
  describe('checkUser', () => {

    // mocking
    const user: User = { 
      id: "123",
      isActive: true,
      firstName: 'abhishek', 
      lastName: 'singh', 
      username: 'abhishek', 
      email: 'nitish@binmile.com', 
      contact: '1234567890', 
      pass: 'xyz', 
      createdAt: new Date(),
      deletedAt: null, 
      roleId: 1, 
    };

    // test case 1
    it('should return response with user data when the username exists', async () => {

      mockUserRepository.userExists.mockResolvedValue(user);

      const result = await service.getUser(user.username);
      expect(result).toBe(user);
    });

    // test case 2
    it('should return null when the username does not exist', async () => {

      // mocking
      const username = "nonexistentUser";
      mockUserRepository.userExists.mockResolvedValue(null);

      const result = await service.getUser(username);

      // conforming the result
      expect(result).toBe(null);
    });

    // test case 3
    it('should handle errors from userExists method', async () => {

      // mocking
      const username = "errorUser";
      mockUserRepository.userExists.mockRejectedValue(
        new InternalServerErrorException(dbFailure.DB_FAILURE)
      );

      // conforming the result
      await expect(service.getUser(username)).rejects.toThrow(
        new InternalServerErrorException(dbFailure.DB_FAILURE));
    });
  });

  // tests for addNewUSer method
  describe('addNewUser', () => {

    // mocking
    const newUser: CreateUserDto = {
      id: '123',
      isActive: true,
      firstName: 'Nitish',
      lastName: 'Rawat',
      username: 'nitishrawat',
      email: 'nitish@binmile.com',
      contact: '1234567890',
      pass: 'password123',
      roleId: 1
    };

    // test case 1
    it('should add a new user successfully', async () => {


      const hashedPassword = 'hashedPassword';
      mockUserRepository.addUser.mockResolvedValue({
         ...newUser, pass: hashedPassword 
        });

      const result = await service.addNewUser(newUser);

      // conforming the result
      expect(result).toEqual({ ...newUser, pass: hashedPassword });

      // conforming the mockUserRepository method is called
      expect(mockUserRepository.addUser).toHaveBeenCalled();
    });

    // test case 2
    it('should handle errors when adding a new user', async () => {

      mockUserRepository.addUser.mockRejectedValue(
        new InternalServerErrorException(dbFailure.DB_FAILURE)
      );

      // conforming the result
      await expect(service.addNewUser(newUser)).rejects.toThrow(
        new InternalServerErrorException(dbFailure.DB_FAILURE)
      );
    });
  });

  // tests for updateUser method
  describe('updateUser', () => {

    // mocking
    const user: User = {
      id: '123',
      isActive: true,
      roleId: 1,
      firstName: 'Nitis',
      lastName: 'Rawat',
      username: 'nitishrawat',
      email: 'nitish@binmile.com',
      contact: '9876543221',
      pass: 'password456',
      createdAt: new Date(),
      deletedAt: null,
    };

    // test case 1
    it('should update user successfully', async () => {


      const username = 'nitishawat';
      const updateData: UpdateUserDto = { firstName: 'Nitish' };
      const updatedUser: User = { ...updateData, ...user };
      mockUserRepository.updateUser.mockResolvedValue(updatedUser);

      const result = await service.updateUser(username, updateData);

      // conforming the result
      expect(result).toEqual({ success: true, user: updatedUser });
    });

    // test case 2
    it('should return failure when user not found', async () => {

      // mocking
      const username = 'nonexistent';

      const updateData: UpdateUserDto = { firstName: 'Nitish' };
      const updatedUser: User = { ...updateData, ...user };
      mockUserRepository.updateUser.mockRejectedValue(new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND));

      const result = await service.updateUser(username, updateData);

      // conforming the result
      expect(result).rejects.toThrow(new NotFoundException(dbFailure.DB_ITEM_NOT_FOUND));
    });

    // test case 3
    it('should handle errors during user update', async () => {

      // mocking
      const username = 'errorUser';

      const updateData: UpdateUserDto = { firstName: 'Nitish' };
      const updatedUser: User = { ...updateData, ...user };
      mockUserRepository.updateUser.mockRejectedValue(new InternalServerErrorException(dbFailure.DB_FAILURE));

      // conforming the result
      await expect(service.updateUser(username, updateData)).rejects.toThrow(new InternalServerErrorException(dbFailure.DB_FAILURE));
    });
  });


});
