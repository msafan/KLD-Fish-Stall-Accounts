using KLDFishStallAccounts.DTO.User;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class UserService : IUser
    {
        private IUnitOfWork _unitOfWork;

        public UserService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public User AddUser(User user)
        {
            var userFromDB = _unitOfWork.User.Get(x => user.UserID.ToLowerInvariant() == user.UserID.ToLowerInvariant());
            if (userFromDB != null)
                throw new Exception($"User with UserId: {user.UserID} already exists");

            user.Password = AESEncryption.Encrypt(user.Password);

            _unitOfWork.User.Insert(user);
            _unitOfWork.Commit();

            return user;
        }

        public void ChangeUserPassword(ChangeUserPassword user)
        {
            var userFromDB = _unitOfWork.User.Get(x => x.ID == user.ID && x.Password == AESEncryption.Encrypt(user.OldPassword));
            if (userFromDB == null)
                throw new Exception("Old password did not match");

            userFromDB.Password = AESEncryption.Encrypt(user.Password);

            _unitOfWork.User.Update(userFromDB);
            _unitOfWork.Commit();
        }

        public void DeleteUser(int id)
        {
            _unitOfWork.User.Delete(x => x.ID == id);
            _unitOfWork.Commit();
        }

        public User EditUser(User user)
        {
            var userToUpdate = _unitOfWork.User.Get(x => x.ID == user.ID);
            if (userToUpdate == null)
                throw new Exception("Could not find the user");

            if (userToUpdate.UserID.ToLowerInvariant() == "admin" && user.UserID.ToLowerInvariant() != userToUpdate.UserID.ToLowerInvariant())
                throw new Exception("Cannot change the UserID of default user");

            if (userToUpdate.UserID.ToLowerInvariant() != user.UserID.ToLowerInvariant())
            {
                var userWithName = _unitOfWork.User.Get(x => x.UserID.ToLowerInvariant() == user.UserID.ToLowerInvariant());
                if (userWithName != null)
                    throw new Exception($"User with UserId: {user.UserID} already exists");
            }

            userToUpdate.Name = user.Name;
            userToUpdate.UserID = user.Name;
            if (!string.IsNullOrEmpty(user.Password))
                userToUpdate.Password = AESEncryption.Encrypt(user.Password);

            _unitOfWork.User.Update(userToUpdate);
            _unitOfWork.Commit();

            return userToUpdate;
        }

        public List<User> GetAllUsers()
        {
            return _unitOfWork.User.GetAll().Select(x => { x.Password = string.Empty; return x; }).ToList();
        }

        public User GetuserByID(int id)
        {
            var user = _unitOfWork.User.Get(x => x.ID == id);
            if (user == null)
                throw new Exception("Could not find the user");

            user.Password = string.Empty;

            return user;
        }

        public User GetUserByUserID(string userID)
        {
            var user = _unitOfWork.User.Get(x => x.UserID.ToLowerInvariant() == userID.ToLowerInvariant());
            if (user == null)
                throw new Exception("Could not find the user");

            user.Password = string.Empty;

            return user;
        }

        public User Login(User user)
        {
            var userFromDB = _unitOfWork.User.
                Get(x => x.UserID.ToLowerInvariant() == user.UserID.ToLowerInvariant() &&
                    x.Password == AESEncryption.Encrypt(user.Password));
            if (userFromDB == null)
                throw new Exception("UserID and Password did not match.");

            userFromDB.Password = string.Empty;

            return userFromDB;
        }
    }
}
