using KLDFishStallAccounts.DTO.User;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class UserController : ApiController
    {
        private IUser _userService;

        public UserController(IUser userService)
        {
            _userService = userService;
        }

        [HttpGet]
        public List<User> GetAllUsers()
        {
            return _userService.GetAllUsers();
        }

        [HttpGet]
        public User GetUserByID([FromUri]int id)
        {
            return _userService.GetuserByID(id);
        }

        [HttpGet]
        public User GetUserByUserID([FromUri]string userID)
        {
            return _userService.GetUserByUserID(userID);
        }

        [HttpPost]
        public User AddUser([FromBody]User user)
        {
            return _userService.AddUser(user);
        }

        [HttpPost]
        public User EditUser([FromBody]User user)
        {
            return _userService.EditUser(user);
        }

        [HttpGet]
        public void DeleteUser([FromUri]int id)
        {
            _userService.DeleteUser(id);
        }

        [HttpPost]
        public User Login([FromBody]User user)
        {
            return _userService.Login(user);
        }

        [HttpPost]
        public void ChangeUserPassword(ChangeUserPassword user)
        {
            _userService.ChangeUserPassword(user);
        }
    }
}