using LoginAPI.Domain.Entities;

namespace LoginAPI.Infra.Repositories.Interfaces
{
    public interface IUserRepository
    {
        Task<User> Create(User user);
        Task<User?> GetByEmail(string email);
        Task<bool> EmailExists(string email);
        Task Update(User user);
    }
}
