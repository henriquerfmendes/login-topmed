using LoginAPI.Application.DTOs;
using LoginAPI.Infra.Repositories.Interfaces;
using LoginAPI.Application.Interfaces;

namespace LoginAPI.Application.Services
{
    public class UserValidator : IUserValidator
    {
        private readonly IUserRepository _userRepository;

        public UserValidator(IUserRepository userRepository)
        {
            _userRepository = userRepository;
        }

        public async Task ValidateCreateUser(CreateUserDTO userDTO)
        {
            if (string.IsNullOrWhiteSpace(userDTO.FullName))
                throw new Exception("Full name is required");

            if (string.IsNullOrWhiteSpace(userDTO.Password))
                throw new Exception("Password is required");

            if (userDTO.Password.Length < 8)
                throw new Exception("Password must be at least 8 characters long");

            await ValidateEmail(userDTO.Email);
        }

        public async Task ValidateEmail(string email)
        {
            if (string.IsNullOrWhiteSpace(email))
                throw new Exception("Email is required");

            if (await _userRepository.EmailExists(email))
                throw new Exception("Email already registered");
        }
    }
}