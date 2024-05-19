using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDTO
{
    [Required] public string UserName { get; set; }

    [Required] public string Name { get; set; }
    [Required] public string Surname { get; set; }
    [Required] public string Email { get; set; }
    [Required] public string Category { get; set; }
    [Required] public string PhoneNumber { get; set; }

    [Required]
    public DateOnly? DateOfBirth { get; set; } //DateOnly cannot be null and types like that are not required check

    [Required]
    [StringLength(8, MinimumLength = 4)]
    public string Password { get; set; }
}