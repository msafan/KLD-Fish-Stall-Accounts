using KLDFishStallAccounts.DTO.Fish;
using System.Collections.Generic;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IFish
    {
        List<FishDTO> GetAllFishes();
        FishDTO AddFish(FishDTO fish);
        FishDTO EditFish(FishDTO fish);
        void DeleteFish(int id);
    }
}
