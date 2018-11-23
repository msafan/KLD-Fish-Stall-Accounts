using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Customer;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
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
        public List<Customer> GetAllCustomers()
        {
            return _customerService.GetAllCustomers();
        }

        [HttpGet]
        public Customer GetCustomerByID([FromUri] int id)
        {
            return _customerService.GetCustomerByID(id);
        }

        [HttpPost]
        public Customer AddCustomer([FromBody]Customer customer)
        {
            return _customerService.AddCustomer(customer);
        }

        [HttpPost]
        public Customer EditCustomer([FromBody] Customer customer)
        {
            return _customerService.EditCustomer(customer);
        }

        [HttpGet]
        public void DeleteCustomer([FromUri]int id)
        {
            _customerService.DeleteCustomer(id);
        }

        [HttpGet]
        public List<Invoice> GetAllInvoicesByCustomerID([FromUri]int id)
        {
            return _customerService.GetAllInvoicesByCustomerID(id);
        }

        [HttpGet]
        public List<CashVoucher> GetAllCashVoucherByCustomerID([FromUri]int id)
        {
            return _customerService.GetAllCashVoucherByCustomerID(id);
        }

        [HttpPost]
        public List<CustomerStatement> GetCustomerStatement([FromUri] int id, [FromBody]DateRange dateRange)
        {
            return _customerService.GetCustomerStatement(id, dateRange);
        }
    }
}