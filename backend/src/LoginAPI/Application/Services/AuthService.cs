using LoginAPI.Application.DTOs;
using LoginAPI.Application.Interfaces;
using LoginAPI.Infra.Repositories.Interfaces;
using LoginAPI.Domain.Entities;

namespace LoginAPI.Application.Services;

public class AuthService : IAuthService
{
    private readonly IUserRepository _userRepository;
    private readonly IPasswordService _passwordService;
    private readonly ITokenService _tokenService;
    public AuthService(
        IUserRepository userRepository,
        IPasswordService passwordService,
        ITokenService tokenService
    )
    {
        _userRepository = userRepository;
        _passwordService = passwordService;
        _tokenService = tokenService;
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
    public async Task<LoginResponseDTO> Login(LoginDTO loginDTO)
    {
        var user = await _userRepository.GetByEmail(loginDTO.Email);
        if (user == null || !_passwordService.VerifyPassword(loginDTO.Password, user.Password))
        {
            throw new UnauthorizedAccessException("Email ou senha inválidos");
        }
        user.LastLogin = DateTime.UtcNow;
        await _userRepository.Update(user);

        var token = _tokenService.GenerateToken(user);

        return new LoginResponseDTO
        {
            Token = token,
            User = UserResponse(user)
        };
    }

}