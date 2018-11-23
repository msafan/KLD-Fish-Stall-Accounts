using KLDFishStallAccounts.Model.EDMX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IUser
    {
        List<User> GetAllUsers();
        User GetuserByID(int id);
        User GetUserByUserID(string userID);
        User AddUser(User user);
        User EditUser(User user);
        void DeleteUser(int id);
        User Login(User user);
        void ChangeUserPassword(KLDFishStallAccounts.DTO.User.ChangeUserPassword user);
    }
}
