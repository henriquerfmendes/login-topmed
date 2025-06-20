namespace LoginAPI.Application.DTOs
{
    public class CreateUserDTO
    {
        public required string FullName { get; set; }
        public required string Email { get; set; }
        public required string Password { get; set; }
    }
}
