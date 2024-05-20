using System.ComponentModel.DataAnnotations;
using API.Entities;

namespace API.DTOs;

public class RegisterDTO
{
    [Required] public string UserName { get; set; }

    [Required] public string Name { get; set; }
    [Required] public string Surname { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string Category { get; set; }
    public string? SubCategory { get; set; } // SubCategory will be empty in case of private category
    [Required] public string PhoneNumber { get; set; }

    [Required] public DateOnly? DateOfBirth { get; set; }

    [Required]
    [StringLength(16, MinimumLength = 4)]
    public string Password { get; set; }
}