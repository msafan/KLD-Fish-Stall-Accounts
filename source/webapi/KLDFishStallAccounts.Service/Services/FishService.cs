using KLDFishStallAccounts.DTO.Fish;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class FishService : IFish
    {
        private IUnitOfWork _unitOfWork;

        public FishService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public FishDTO AddFish(FishDTO fish)
        {
            var fishFromDB = _unitOfWork.Fish.Get(x => x.Name.ToLowerInvariant() == fish.Name.ToLowerInvariant());
            if (fishFromDB != null)
                throw new Exception($"Fish {fish.Name} already exists");

            var fishToInsert = fish.Map();

            _unitOfWork.Fish.Insert(fishToInsert);
            _unitOfWork.Commit();

            return new FishDTO(fishToInsert);
        }

        public void DeleteFish(int id)
        {
            var hasInvoice = _unitOfWork.InvoiceItem.GetAllQueryable().Any(x => x.FK_ID_Fish == id);
            if (hasInvoice)
                throw new Exception("Fish has invoices. Hence, cannot delete this fish");

            _unitOfWork.Fish.Delete(x => x.ID == id);
            _unitOfWork.Commit();
        }

        public FishDTO EditFish(FishDTO fish)
        {
            var fishToUpdate = _unitOfWork.Fish.Get(x => x.ID == fish.ID);
            if (fishToUpdate == null)
                throw new Exception("Could not find the fish");

            if (fishToUpdate.Name.ToLowerInvariant() != fish.Name.ToLowerInvariant())
            {
                var fishWithName = _unitOfWork.Fish.Get(x => x.Name.ToLowerInvariant() == fish.Name.ToLowerInvariant());
                if (fishWithName != null)
                    throw new Exception($"Fish {fish.Name} already exists");
            }

            fishToUpdate.Name = fish.Name;

            _unitOfWork.Fish.Update(fishToUpdate);
            _unitOfWork.Commit();

            return new FishDTO(fishToUpdate);
        }

        public List<FishDTO> GetAllFishes()
        {
            return _unitOfWork.Fish.GetAll().Select(x => new FishDTO(x)).ToList();
        }
    }
}
