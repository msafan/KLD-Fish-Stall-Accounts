using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Customer;
using System.Collections.Generic;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface ICustomer
    {
        List<CustomerDTO> GetAllCustomers();
        CustomerDTO GetCustomerByID(int id);
        CustomerDTO AddCustomer(CustomerDTO customer);
        CustomerDTO EditCustomer(CustomerDTO customer);
        void DeleteCustomer(int id);
        List<CustomerStatement> GetCustomerStatement(int id, DateRange dateRange);
    }
}
