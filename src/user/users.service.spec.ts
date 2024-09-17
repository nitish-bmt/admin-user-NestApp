import { Test, TestingModule } from "@nestjs/testing";
import { UserService } from "./user.service";
import { UserRepository } from "./repository/user.repository";
import { RoleRepository } from "./repository/role.repository";
import { CreateUserDto, UpdateUserDto } from "./dto/user.dto";
import { User } from "./entity/user.entity";
import { UnauthorizedException } from "@nestjs/common";
import { validRoleId } from "./entity/role.entity";
import * as bcrypt from "bcrypt";
import { UpdateResult } from "typeorm";

describe('UserService', () => {
  let service: UserService;
  let userRepository: UserRepository;
  let roleRepository: RoleRepository;

  const mockUserRepository = {
    getAllSubAdmins: jest.fn(),
    findUser: jest.fn(),
    addUser: jest.fn(),
    updateUser: jest.fn(),
    softDelete: jest.fn(),
  };

  const mockRoleRepository = {};

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: UserRepository,
          useValue: mockUserRepository,
        },
        {
          provide: RoleRepository,
          useValue: mockRoleRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    userRepository = module.get<UserRepository>(UserRepository);
    roleRepository = module.get<RoleRepository>(RoleRepository);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('getAllSubAdmins', () => {

    // test case
    it('should return an array of subAdmins', async () => {
      const users: User[] = [
        {
          id: "245",
          isActive: true,
          firstName: 'nitish',
          lastName: 'rawat',
          username: 'nitish',
          email: 'nitish@example.com',
          contact: '1234567890',
          pass: 'abc',
          createdAt: new Date(),
          deletedAt: null,
          roleId: validRoleId.subAdmin,
        },
      ];

      mockUserRepository.getAllSubAdmins.mockResolvedValue(users);

      const result = await service.getAllSubAdmins();
      expect(result).toBe(users);
      expect(mockUserRepository.getAllSubAdmins).toHaveBeenCalled();
    });

    // test case
    it('should throw an error when database operation fails', async () => {
      mockUserRepository.getAllSubAdmins.mockRejectedValue(new Error());

      await expect(service.getAllSubAdmins()).rejects.toThrow();
    });
  });

  describe('getUser', () => {

    // test case
    it('should return a user when found', async () => {
      const user: User = {
        id: "123",
        isActive: true,
        firstName: 'abhishek',
        lastName: 'singh',
        username: 'abhishek',
        email: 'abhishek@example.com',
        contact: '1234567890',
        pass: 'xyz',
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.admin,
      };

      mockUserRepository.findUser.mockResolvedValue(user);

      const result = await service.getUser('abhishek');
      expect(result).toBe(user);
    });

    // test case
    it('should throw an error when user is not found', async () => {
      mockUserRepository.findUser.mockRejectedValue(new Error());

      await expect(service.getUser('nonexistent')).rejects.toThrow();
    });
  });

  describe('getUserIfSubAdmin', () => {

    // test case
    it('should return a user if they are a subAdmin', async () => {
      const user: User = {
        id: "123",
        isActive: true,
        firstName: 'subadmin',
        lastName: 'user',
        username: 'subadmin',
        email: 'subadmin@example.com',
        contact: '1234567890',
        pass: 'xyz',
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.subAdmin,
      };

      mockUserRepository.findUser.mockResolvedValue(user);

      const result = await service.getUserIfSubAdmin('subadmin');
      expect(result).toBe(user);
    });

    // test case
    it('should throw UnauthorizedException if user is an admin', async () => {
      const adminUser: User = {
        id: "123",
        isActive: true,
        firstName: 'admin',
        lastName: 'user',
        username: 'admin',
        email: 'admin@example.com',
        contact: '1234567890',
        pass: 'xyz',
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.admin,
      };

      mockUserRepository.findUser.mockResolvedValue(adminUser);

      await expect(service.getUserIfSubAdmin('admin')).rejects.toThrow(UnauthorizedException);
    });
  });

  describe('addNewUser', () => {

    // test case
    it('should add a new user successfully', async () => {
      const newUserDto: CreateUserDto = {
        roleId: 2,
        isActive: true,
        firstName: 'New',
        lastName: 'User',
        username: 'newuser',
        email: 'newuser@example.com',
        contact: '1234567890',
        pass: 'password123',
      };

      const savedUser: User = {
        ...newUserDto,
        id: '789',
        isActive: true,
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.subAdmin,
        pass: 'hashedPassword',
      };

      jest.spyOn(bcrypt, 'hash').mockResolvedValue('hashedPassword' as never);
      mockUserRepository.addUser.mockResolvedValue(savedUser);

      const result = await service.addNewUser(newUserDto);
      expect(result).toEqual(savedUser);
      expect(mockUserRepository.addUser).toHaveBeenCalledWith({
        ...newUserDto,
        roleId: validRoleId.subAdmin,
        pass: 'hashedPassword',
      });
    });
  });

  describe('updateUser', () => {

    // test case
    it('should update a user successfully', async () => {
      const updateUserDto: UpdateUserDto = {
        firstName: 'Updated',
        lastName: 'User',
      };

      const updatedUser: User = {
        id: '123',
        isActive: true,
        firstName: 'Updated',
        lastName: 'User',
        username: 'existinguser',
        email: 'existinguser@example.com',
        contact: '1234567890',
        pass: 'hashedPassword',
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.subAdmin,
      };

      mockUserRepository.updateUser.mockResolvedValue(updatedUser);

      const result = await service.updateUser('existinguser', updateUserDto);
      expect(result).toEqual(updatedUser);
    });

    // test case
    it('should throw an error when update fails', async () => {
      mockUserRepository.updateUser.mockRejectedValue(new Error());

      await expect(service.updateUser('existinguser', {})).rejects.toThrow();
    });
  });

  describe('deleteUser', () => {

    // test case
    it('should soft delete a user successfully', async () => {
      const user: User = {
        id: '123',
        isActive: true,
        firstName: 'To',
        lastName: 'Delete',
        username: 'todelete',
        email: 'todelete@example.com',
        contact: '1234567890',
        pass: 'hashedPassword',
        createdAt: new Date(),
        deletedAt: null,
        roleId: validRoleId.subAdmin,
      };

      const updateResult: UpdateResult = {
        affected: 1,
        raw: {},
        generatedMaps: [],
      };

      mockUserRepository.findUser.mockResolvedValue(user);
      mockUserRepository.softDelete.mockResolvedValue(updateResult);

      const result = await service.deleteUser('todelete');
      expect(result).toEqual(updateResult);
    });

    // test case
    it('should throw an error when user is not found', async () => {
      mockUserRepository.findUser.mockRejectedValue(new Error());

      await expect(service.deleteUser('nonexistent')).rejects.toThrow();
    });
  });
});