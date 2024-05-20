using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class UsersController : ControllerBase
{
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public UsersController(IUserRepository userRepository, IMapper mapper)
    {
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<BasicUserDataDTO>>> GetUsers()
    {
        return Ok(await _userRepository.GetUsersBasicDataAsync());
    }

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

    [Authorize]
    [HttpDelete("{query}")]
    public async Task<ActionResult> DeleteUser(string query)
    {
        if (int.TryParse(query, out int id))
        {
            await _userRepository.DeleteUserAsync(id);
            return NoContent();
        }

        return BadRequest("Invalid user id");
    }

    [Authorize]
    [HttpPut("{id}")]
    public async Task<ActionResult<DetailedUserDataDTO>> UpdateUser(int id, DetailedUserDataDTO userToUpdate)
    {
        if (id != userToUpdate.Id)
        {
            return BadRequest("Invalid user id");
        }

        var currentUserData = await _userRepository.GetUserByIdAsync(id);

        if (currentUserData == null)
        {
            return BadRequest("User not found");
        }

        // Map the changes onto the tracked entity
        _mapper.Map(userToUpdate, currentUserData);

        await _userRepository.SaveAllAsync();

        var updatedUser = await _userRepository.GetDetailedUserDataByIdAsync(id);

        if (updatedUser == null)
        {
            // If the user is not found then saving went wrong
            return BadRequest("Failed to update user");
        }

        return updatedUser;
    }
}