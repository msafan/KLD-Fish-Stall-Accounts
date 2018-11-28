using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Fish
{
    public class FishDTO : DataTransferObject<Model.EDMX.Fish>, IDataTransferObjectConvertible<Model.EDMX.Fish>
    {
        public FishDTO() : base(null) { }

        public FishDTO(Model.EDMX.Fish fish) : base(fish)
        {
            ID = fish.ID;
            Name = fish.Name;
        }

        public int ID { get; set; }
        public string Name { get; set; }

        public Model.EDMX.Fish Map()
        {
            return new Model.EDMX.Fish()
            {
                ID = ID,
                Name = Name
            };
        }
    }
}
