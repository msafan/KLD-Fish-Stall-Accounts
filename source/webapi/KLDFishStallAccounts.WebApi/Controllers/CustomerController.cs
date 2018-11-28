using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Customer;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class CustomerController : ApiController
    {
        private ICustomer _customerService;

        public CustomerController(ICustomer customerSerice)
        {
            _customerService = customerSerice;
        }

        [HttpGet]
        public List<CustomerDTO> GetAllCustomers()
        {
            return _customerService.GetAllCustomers();
        }

        [HttpGet]
        public CustomerDTO GetCustomerByID([FromUri] int id)
        {
            return _customerService.GetCustomerByID(id);
        }

        [HttpPost]
        public CustomerDTO AddCustomer([FromBody]CustomerDTO customer)
        {
            return _customerService.AddCustomer(customer);
        }

        [HttpPost]
        public CustomerDTO EditCustomer([FromBody] CustomerDTO customer)
        {
            return _customerService.EditCustomer(customer);
        }

        [HttpGet]
        public void DeleteCustomer([FromUri]int id)
        {
            _customerService.DeleteCustomer(id);
        }

        [HttpPost]
        public List<CustomerStatement> GetCustomerStatement([FromUri]int id,[FromBody]DateRange dateRange)
        {
            return _customerService.GetCustomerStatement(id, dateRange);
        }
    }
}