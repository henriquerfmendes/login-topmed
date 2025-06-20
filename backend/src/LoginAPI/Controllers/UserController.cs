using Microsoft.AspNetCore.Mvc;
using LoginAPI.Application.DTOs;
using System.Threading.Tasks;
using LoginAPI.Application.Interfaces;

namespace LoginAPI.Controllers;

[ApiController]
[Route("api/user")]
public class UserController : ControllerBase
{
    private readonly IUserService _userService;

    public UserController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpPost]
    public async Task<ActionResult<UserResponseDTO>> Create(CreateUserDTO createUserDTO)
    {
        try
        {
            var user = await _userService.Create(createUserDTO);
            return Ok(user);
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}
