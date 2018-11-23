using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Customer;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface ICustomer
    {
        List<Customer> GetAllCustomers();
        Customer GetCustomerByID(int id);
        Customer AddCustomer(Customer customer);
        Customer EditCustomer(Customer customer);
        void DeleteCustomer(int id);
        List<CustomerStatement> GetCustomerStatement(int id, DateRange dateRange);
    }
}
