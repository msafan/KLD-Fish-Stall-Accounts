using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.DTO.User
{
    public class UserDTO : DataTransferObject<Model.EDMX.User>, IDataTransferObjectConvertible<Model.EDMX.User>
    {
        public UserDTO() : base(null) { }

        public UserDTO(Model.EDMX.User item) : base(item)
        {
            ID = item.ID;
            Name = item.Name;
            UserID = item.UserID;
            Password = item.Password;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string UserID { get; set; }
        public string Password { get; set; }

        public Model.EDMX.User Map()
        {
            return new Model.EDMX.User()
            {
                ID = ID,
                Name = Name,
                UserID = UserID,
                Password = Password
            };
        }
    }
}
