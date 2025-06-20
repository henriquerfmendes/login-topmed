using LoginAPI.Application.DTOs;

namespace LoginAPI.Application.Interfaces
{
    public interface IUserService
    {
        Task<UserResponseDTO> Create(CreateUserDTO userDTO);
    }
}
