using LoginAPI.Application.DTOs;

namespace LoginAPI.Application.Interfaces;

public interface IAuthService
{
    Task<LoginResponseDTO> Login(LoginDTO loginDTO);
}