using LoginAPI.Application.DTOs;

namespace LoginAPI.Application.Interfaces
{
public interface IUserValidator
{
    Task ValidateEmail(string email);
    Task ValidateCreateUser(CreateUserDTO userDTO);
}
}
