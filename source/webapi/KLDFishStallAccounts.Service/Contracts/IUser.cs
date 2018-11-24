using KLDFishStallAccounts.DTO.User;
using System.Collections.Generic;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IUser
    {
        List<UserDTO> GetAllUsers();
        UserDTO GetuserByID(int id);
        UserDTO GetUserByUserID(string userID);
        UserDTO AddUser(UserDTO user);
        UserDTO EditUser(UserDTO user);
        void DeleteUser(int id);
        UserDTO Login(UserDTO user);
        void ChangeUserPassword(ChangeUserPassword user);
    }
}
