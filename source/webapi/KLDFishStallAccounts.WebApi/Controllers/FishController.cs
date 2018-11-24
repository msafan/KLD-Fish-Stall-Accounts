using KLDFishStallAccounts.DTO.Fish;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class FishController : ApiController
    {
        private IFish _fishService;

        public FishController(IFish fishService)
        {
            _fishService = fishService;
        }

        [HttpGet]
        public List<FishDTO> GetAllFishes()
        {
            return _fishService.GetAllFishes();
        }

        [HttpPost]
        public FishDTO AddFish([FromBody]FishDTO fish)
        {
            return _fishService.AddFish(fish);
        }

        [HttpPost]
        public FishDTO EditFish([FromBody] FishDTO fish)
        {
            return _fishService.EditFish(fish);
        }

        [HttpGet]
        public void DeleteFish([FromUri]int id)
        {
            _fishService.DeleteFish(id);
        }
    }
}