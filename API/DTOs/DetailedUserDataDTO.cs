using API.Entities;

namespace API.DTOs;

public class DetailedUserDataDTO
{
    public int Id { get; set; }
    public string UserName { get; set; }
    public string Name { get; set; }
    public string Surname { get; set; }
    public string Email { get; set; }
    public string Category { get; set; }
    public string? SubCategory { get; set; }
    public string PhoneNumber { get; set; }
    public DateOnly DateOfBirth { get; set; }
}