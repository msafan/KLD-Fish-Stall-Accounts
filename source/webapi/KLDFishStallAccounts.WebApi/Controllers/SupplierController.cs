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
    public class SupplierController : ApiController
    {
        private ISupplier _supplierService;

        public SupplierController(ISupplier supplierSerice)
        {
            _supplierService = supplierSerice;
        }

        [HttpGet]
        public List<CustomerDTO> GetAllCustomers()
        {
            return _supplierService.GetAllCustomers();
        }

        [HttpGet]
        public CustomerDTO GetCustomerByID([FromUri] int id)
        {
            return _supplierService.GetCustomerByID(id);
        }

        [HttpPost]
        public CustomerDTO AddCustomer([FromBody]CustomerDTO customer)
        {
            return _supplierService.AddCustomer(customer);
        }

        [HttpPost]
        public CustomerDTO EditCustomer([FromBody] CustomerDTO customer)
        {
            return _supplierService.EditCustomer(customer);
        }

        [HttpGet]
        public void DeleteCustomer([FromUri]int id)
        {
            _supplierService.DeleteCustomer(id);
        }

        [HttpPost]
        public List<CustomerStatement> GetCustomerStatement([FromUri]int id,[FromBody]DateRange dateRange)
        {
            return _supplierService.GetCustomerStatement(id, dateRange);
        }
    }
}