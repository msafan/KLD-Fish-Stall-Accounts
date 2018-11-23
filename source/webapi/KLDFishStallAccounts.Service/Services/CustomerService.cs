using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Customer;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class CustomerService : ICustomer
    {
        private IUnitOfWork _unitOfWork;

        public CustomerService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public Customer AddCustomer(Customer customer)
        {
            var customerFromDB = _unitOfWork.Customer.Get(x => x.Name.ToLowerInvariant() == customer.Name.ToLowerInvariant());
            if (customerFromDB != null)
                throw new Exception($"Customer {customer.Name} already exists");

            _unitOfWork.Customer.Insert(customer);
            _unitOfWork.Commit();

            return customer;
        }

        public void DeleteCustomer(int id)
        {
            var containsCashVoucher = _unitOfWork.CashVoucher.GetAllQueryable().Any(x => x.FK_ID_Customer == id);
            if (containsCashVoucher)
                throw new Exception("Customer has cash voucher. Hence, cannot delete customer");

            var containsInvoice = _unitOfWork.CashVoucher.GetAllQueryable().Any(x => x.FK_ID_Customer == id);
            if (containsInvoice)
                throw new Exception("Customer has invoices. Hence, cannot delete customer");

            _unitOfWork.Customer.Delete(x => x.ID == id);
            _unitOfWork.Commit();
        }

        public Customer EditCustomer(Customer customer)
        {
            var customerToUpdate = _unitOfWork.Customer.Get(x => x.ID == customer.ID);
            if (customerToUpdate == null)
                throw new Exception("Could not find the customer");

            if (customerToUpdate.Name.ToLowerInvariant() != customer.Name.ToLowerInvariant())
            {
                var customerWithName = _unitOfWork.Customer.Get(x => x.Name.ToLowerInvariant() == customer.Name.ToLowerInvariant());
                if (customerWithName != null)
                    throw new Exception($"Customer {customer.Name} already exists");
            }

            customerToUpdate.Address = customer.Address;
            customerToUpdate.Name = customer.Name;
            customerToUpdate.PhoneNumber = customer.PhoneNumber;

            _unitOfWork.Customer.Update(customerToUpdate);
            _unitOfWork.Commit();

            return customerToUpdate;
        }

        public List<CashVoucher> GetAllCashVoucherByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            return _unitOfWork.CashVoucher.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
        }

        public List<Customer> GetAllCustomers()
        {
            return _unitOfWork.Customer.GetAll().ToList();
        }

        public List<Invoice> GetAllInvoicesByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            return _unitOfWork.Invoice.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
        }

        public Customer GetCustomerByID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            return customer;
        }

        public List<CustomerStatement> GetCustomerStatement(int id, DateRange dateRange)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            var customerStatements = _unitOfWork.Invoice.
                GetAllQueryable().
                Where(x => x.FK_ID_Customer == id &&
                    x.Date >= dateRange.StartDate &&
                    x.Date <= dateRange.EndDate).
                Select(x => new CustomerStatement()
                {
                    Amount = x.Total,
                    Date = x.Date,
                    ID = x.ID,
                    Particulars = "Sales Invoice"
                });

            customerStatements.Concat(_unitOfWork.CashVoucher.
                GetAllQueryable().
                Where(x => x.FK_ID_Customer == id &&
                   x.Date >= dateRange.StartDate &&
                   x.Date <= dateRange.EndDate).
                Select(x => new CustomerStatement()
                {
                    Amount = x.Amount,
                    Date = x.Date,
                    ID = x.ID,
                    Particulars = "Cash Payment Voucher"
                }));

            var customerStatementsToReturn = customerStatements.OrderBy(x => x.Date).ToList();

            var hasCashVouchersBeyondDate = _unitOfWork.CashVoucher.GetAllQueryable().Any(x => x.ID == id && x.Date > dateRange.EndDate);
            var hasInvoicesBeyondDate = _unitOfWork.Invoice.GetAllQueryable().Any(x => x.ID == id && x.Date > dateRange.EndDate);
            if (hasCashVouchersBeyondDate || hasInvoicesBeyondDate)
                return customerStatementsToReturn;

            customerStatementsToReturn.Reverse();

            var currentBalance = customer.Balance;
            customerStatementsToReturn.ForEach(x =>
            {
                x.Balance = currentBalance;
                currentBalance += (x.Amount * (x.Particulars == "Sales Invoice" ? -1 : 1));
            });

            customerStatementsToReturn.Reverse();

            customerStatementsToReturn.Insert(0, new CustomerStatement()
            {
                ID = int.MinValue,
                Particulars = "Opening Balance",
                Amount = currentBalance,
                Balance = currentBalance
            });
            customerStatementsToReturn.Add(new CustomerStatement()
            {
                ID = int.MinValue,
                Particulars = "Closing Balance",
                Balance = currentBalance
            });

            return customerStatementsToReturn;
        }
    }
}
