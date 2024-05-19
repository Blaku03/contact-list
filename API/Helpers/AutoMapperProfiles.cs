using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Entities.User, DTOs.BasicUserDataDTO>();
        CreateMap<Entities.User, DTOs.DetailedUserDataDTO>();
        CreateMap<DTOs.RegisterDTO, Entities.User>();
    }
}