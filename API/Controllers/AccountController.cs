using System.Security.Cryptography;
using System.Text;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AccountController : ControllerBase
{
    private readonly DataContext _context;
    private readonly ITokenService _tokenService;
    private readonly IUserRepository _userRepository;
    private readonly IMapper _mapper;

    public AccountController(DataContext context, ITokenService tokenService, IUserRepository userRepository,
        IMapper mapper)
    {
        _context = context;
        _tokenService = tokenService;
        _userRepository = userRepository;
        _mapper = mapper;
    }

    [HttpPost("register")] // Post : api/account/register
    public async Task<ActionResult<UserDTO>> Register(RegisterDTO registerDto)
    {
        if (await UserNameExists(registerDto.UserName)) return BadRequest("Username is taken");
        if (await EmailExists(registerDto.Email)) return BadRequest("Email is taken");

        using var hmac = new HMACSHA512();

        var user = _mapper.Map<User>(registerDto);

        user.UserName = registerDto.UserName.ToLower();
        user.PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(registerDto.Password));
        user.PasswordSalt = hmac.Key;

        _context.Users.Add(user);
        await _context.SaveChangesAsync();

        return new UserDTO
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    [HttpPost("login")]
    public async Task<ActionResult<UserDTO>> Login(LoginDTO loginDto)
    {
        var user = await _userRepository.GetUserByUserNameAsync(loginDto.UserName);

        if (user == null) return Unauthorized("Invalid username");

        using var hmac = new HMACSHA512(user.PasswordSalt);
        var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(loginDto.Password));

        //Checking if password hashes are equal
        if (computedHash.Length != user.PasswordHash.Length) return Unauthorized("Invalid password");

        for (int i = 0; i < computedHash.Length; i++)
        {
            if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid password");
        }

        return new UserDTO
        {
            UserName = user.UserName,
            Token = _tokenService.CreateToken(user)
        };
    }

    private async Task<bool> UserNameExists(string username)
    {
        return await _context.Users.AnyAsync(
            x => x.UserName == username.ToLower());
    }

    private async Task<bool> EmailExists(string email)
    {
        return await _context.Users.AnyAsync(
            x => x.Email == email);
    }
}