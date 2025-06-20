using Microsoft.AspNetCore.Mvc;
using LoginAPI.Application.DTOs;
using LoginAPI.Application.Interfaces;
using LoginAPI.Application.Services;

namespace LoginAPI.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
    private readonly IAuthService _authService;

    public AuthController(IAuthService authService)
    {
        _authService = authService;
    }

    [HttpPost("login")]
    public async Task<ActionResult<LoginResponseDTO>> Login(LoginDTO loginDTO)
    {
        try
        {
            var result = await _authService.Login(loginDTO);
            return Ok(result);
        }
        catch (UnauthorizedAccessException ex)
        {
            return Unauthorized(new { message = ex.Message });
        }
        catch (Exception ex)
        {
            return BadRequest(new { message = ex.Message });
        }
    }
}