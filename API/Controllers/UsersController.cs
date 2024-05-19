using API.DTOs;
using API.Interfaces;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;

    public UsersController(IUserRepository userRepository)
    {
        _userRepository = userRepository;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BasicUserDataDTO>>> GetUsers()
    {
        return Ok(await _userRepository.GetUsersBasicDataAsync());
    }

    [Authorize]
    [HttpGet("{query}")] // api/users/{id or username}
    public async Task<ActionResult<DetailedUserDataDTO>> GetUser(string query)
    {
        DetailedUserDataDTO? user = null;
        if (int.TryParse(query, out int id))
        {
            user = await _userRepository.GetDetailedUserDataByIdAsync(id);
        }
        
        // If the query is not an integer, it is a username
        user ??= await _userRepository.GetDetailedUserDataByUserNameAsync(query);

        if (user == null)
        {
            return NotFound();
        }

        return user;
    }
}