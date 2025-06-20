using LoginAPI.Domain.Entities;

namespace LoginAPI.Application.DTOs
{
    public class LoginResponseDTO
    {
        public required string Token { get; set; }
        public required UserResponseDTO User { get; set; }
    }
}