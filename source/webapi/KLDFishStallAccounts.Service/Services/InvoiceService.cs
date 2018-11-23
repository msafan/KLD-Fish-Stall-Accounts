using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class InvoiceService : IInvoice
    {
        private IUnitOfWork _unitOfWork;

        public InvoiceService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public CashVoucher AddCashVoucher(CashVoucher cashVoucher)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == cashVoucher.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance -= cashVoucher.Amount;

            _unitOfWork.Customer.Update(customer);
            _unitOfWork.CashVoucher.Insert(cashVoucher);
            _unitOfWork.Commit();

            return cashVoucher;
        }

        public Invoice AddInvoice(Invoice invoice)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance += invoice.Total;

            _unitOfWork.Customer.Update(customer);
            _unitOfWork.Invoice.Insert(invoice);
            _unitOfWork.Commit();

            return invoice;
        }

        public void DeleteCashVoucher(int id)
        {
            var cashVoucher = _unitOfWork.CashVoucher.Get(x => x.ID == id);
            if (cashVoucher == null)
                throw new Exception("Could not find the voucher");

            var customer = _unitOfWork.Customer.Get(x => x.ID == cashVoucher.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance += cashVoucher.Amount;
            _unitOfWork.CashVoucher.Delete(cashVoucher);
            _unitOfWork.Customer.Update(customer);
            _unitOfWork.Commit();
        }

        public void DeleteInvoice(int id)
        {
            var invoice = _unitOfWork.Invoice.Get(x => x.ID == id);
            if (invoice == null)
                throw new Exception("Could not find the invoice");

            var customer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance -= invoice.Total;
            _unitOfWork.CashVoucher.Delete(invoice);
            _unitOfWork.Customer.Update(customer);
            _unitOfWork.Commit();
        }

        public CashVoucher EditCashVoucher(CashVoucher cashVoucher)
        {
            var cashVoucherFromDB = _unitOfWork.CashVoucher.Get(x => x.ID == cashVoucher.ID);
            if (cashVoucherFromDB == null)
                throw new Exception("Could not find the voucher");

            var oldCustomer = _unitOfWork.Customer.Get(x => x.ID == cashVoucherFromDB.FK_ID_Customer);
            if (oldCustomer == null)
                throw new Exception("Could not find the customer");

            var newCustomer = _unitOfWork.Customer.Get(x => x.ID == cashVoucher.FK_ID_Customer);
            if (newCustomer == null)
                throw new Exception("Could not find the customer");

            oldCustomer.Balance += cashVoucherFromDB.Amount;
            _unitOfWork.Customer.Update(oldCustomer);
            _unitOfWork.Commit();

            cashVoucherFromDB.Amount = cashVoucher.Amount;
            cashVoucherFromDB.Date = cashVoucher.Date;
            cashVoucherFromDB.FK_ID_Customer = cashVoucher.FK_ID_Customer;
            cashVoucherFromDB.Remarks = cashVoucher.Remarks;
            _unitOfWork.CashVoucher.Update(cashVoucherFromDB);

            newCustomer = _unitOfWork.Customer.Get(x => x.ID == cashVoucher.FK_ID_Customer);
            newCustomer.Balance -= cashVoucher.Amount;
            _unitOfWork.Customer.Update(newCustomer);

            _unitOfWork.Commit();

            return cashVoucherFromDB;
        }

        public Invoice EditInvoice(Invoice invoice)
        {
            var invoiceFromDB = _unitOfWork.Invoice.Get(x => x.ID == invoice.ID);
            if (invoiceFromDB == null)
                throw new Exception("Could not find the invoice");

            var oldCustomer = _unitOfWork.Customer.Get(x => x.ID == invoiceFromDB.FK_ID_Customer);
            if (oldCustomer == null)
                throw new Exception("Could not find the customer");

            var newCustomer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            if (newCustomer == null)
                throw new Exception("Could not find the customer");

            oldCustomer.Balance -= invoiceFromDB.Total;
            _unitOfWork.Customer.Update(oldCustomer);
            _unitOfWork.Commit();

            invoiceFromDB.Total = invoice.Total;
            invoiceFromDB.Date = invoice.Date;
            invoiceFromDB.FK_ID_Customer = invoice.FK_ID_Customer;
            invoiceFromDB.Balance = invoice.Balance;
            invoiceFromDB.Discount = invoice.Discount;
            _unitOfWork.Invoice.Update(invoiceFromDB);
            
            _unitOfWork.InvoiceItem.Delete(x => x.ID == invoiceFromDB.ID);

            var invoiceItems = invoice.InvoiceItems.ToList();
            invoiceItems.ForEach(x => x.FK_ID_Invoice = invoiceFromDB.ID);
            _unitOfWork.InvoiceItem.InsertAll(invoiceItems);

            newCustomer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            newCustomer.Balance += invoice.Total;
            _unitOfWork.Customer.Update(newCustomer);

            _unitOfWork.Commit();

            return invoiceFromDB;
        }

        public List<CashVoucher> GetAllCashVoucherByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            return _unitOfWork.CashVoucher.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
        }

        public List<CashVoucher> GetAllCashVouchers()
        {
            return _unitOfWork.CashVoucher.GetAll().ToList();
        }

        public List<Invoice> GetAllInvoices()
        {
            return _unitOfWork.Invoice.GetAll().ToList();
        }

        public List<Invoice> GetAllInvoicesByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            return _unitOfWork.Invoice.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
        }
    }
}
