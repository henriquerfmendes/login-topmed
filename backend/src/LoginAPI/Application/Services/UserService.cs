using LoginAPI.Application.Interfaces;
using LoginAPI.Infra.Repositories.Interfaces;
using LoginAPI.Domain.Entities;
using LoginAPI.Application.DTOs;

namespace LoginAPI.Application.Services
{
    public class UserService : IUserService
    {
        private readonly IUserRepository _userRepository;
        private readonly IPasswordService _passwordService;
        private readonly IUserValidator _userValidator;

        public UserService(
            IUserRepository userRepository,
            IPasswordService passwordService,
            IUserValidator userValidator)
        {
            _userRepository = userRepository;
            _passwordService = passwordService;
            _userValidator = userValidator;
        }

        private UserResponseDTO UserResponse(User user)
        {
            return new UserResponseDTO
            {
                Id = user.Id,
                FullName = user.FullName,
                Email = user.Email,
                CreatedAt = user.CreatedAt,
                LastLogin = user.LastLogin
            };
        }

        public async Task<UserResponseDTO> Create(CreateUserDTO userDTO)
        {
            await _userValidator.ValidateCreateUser(userDTO);
            var user = new User
            {
                FullName = userDTO.FullName,
                Email = userDTO.Email,
                Password = _passwordService.HashPassword(userDTO.Password),
                CreatedAt = DateTime.UtcNow
            };

            await _userRepository.Create(user);
            return UserResponse(user);
        }
    }
}
