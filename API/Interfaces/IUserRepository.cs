using API.DTOs;
using API.Entities;

namespace API.Interfaces;

public interface IUserRepository
{
    void Update(User user);

    Task<bool> SaveAllAsync();

    Task<IEnumerable<BasicUserDataDTO>> GetUsersBasicDataAsync();

    Task<DetailedUserDataDTO?> GetDetailedUserDataByIdAsync(int id);

    Task<DetailedUserDataDTO?> GetDetailedUserDataByUserNameAsync(string username);

    Task<User?> GetUserByUserNameAsync(string username);
}