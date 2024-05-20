using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {
        CreateMap<Entities.User, DTOs.BasicUserDataDTO>();
        CreateMap<Entities.User, DTOs.DetailedUserDataDTO>();
        CreateMap<DTOs.DetailedUserDataDTO, Entities.User>();
        CreateMap<DTOs.RegisterDTO, Entities.User>();
    }
}