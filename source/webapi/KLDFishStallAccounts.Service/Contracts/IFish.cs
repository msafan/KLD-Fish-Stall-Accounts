using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IFish
    {
        List<Fish> GetAllFishes();
        Fish AddFish(Fish fish);
        Fish EditFish(Fish fish);
        void DeleteFish(int id);
    }
}
