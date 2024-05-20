using API.DTOs;
using API.Entities;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class UserRepository : IUserRepository
{
    private readonly DataContext _context;
    private readonly IMapper _mapper;

    public UserRepository(DataContext context, IMapper mapper)
    {
        _context = context;
        _mapper = mapper;
    }

    public void Update(User user)
    {
        _context.Entry(user).State = EntityState.Modified;
    }

    public async Task<bool> SaveAllAsync()
    {
        return await _context.SaveChangesAsync() > 0; //Save changes returns amount changes
    }

    public async Task<IEnumerable<BasicUserDataDTO>> GetUsersBasicDataAsync()
    {
        return await _context.Users.ProjectTo<BasicUserDataDTO>(_mapper.ConfigurationProvider).ToListAsync();
    }

    public async Task<DetailedUserDataDTO?> GetDetailedUserDataByIdAsync(int id)
    {
        return await _context.Users
            .Where(x => x.Id == id)
            .ProjectTo<DetailedUserDataDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<DetailedUserDataDTO?> GetDetailedUserDataByUserNameAsync(string username)
    {
        return await _context.Users
            .Where(x => x.UserName == username)
            .ProjectTo<DetailedUserDataDTO>(_mapper.ConfigurationProvider)
            .SingleOrDefaultAsync();
    }

    public async Task<User?> GetUserByUserNameAsync(string username)
    {
        return await _context.Users
            .Where(x => x.UserName == username)
            .SingleOrDefaultAsync();
    }

    public async Task<User?> GetUserByIdAsync(int id)
    {
        return await _context.Users
            .Where(x => x.Id == id)
            .SingleOrDefaultAsync();
    }

    public async Task DeleteUserAsync(int id)
    {
        var user = await _context.Users.Where(x => x.Id == id).SingleOrDefaultAsync();
        if (user != null)
        {
            _context.Users.Remove(user);
            await _context.SaveChangesAsync();
        }
    }
}