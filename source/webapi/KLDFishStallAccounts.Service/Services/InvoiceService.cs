﻿using KLDFishStallAccounts.DTO.Invoice;
using KLDFishStallAccounts.Model;
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

        public CashVoucherDTO AddCashVoucher(CashVoucherDTO cashVoucher)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == cashVoucher.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance -= cashVoucher.Amount;

            var cashVoucherToInsert = cashVoucher.Map();
            _unitOfWork.Customer.Update(customer);
            _unitOfWork.CashVoucher.Insert(cashVoucherToInsert);
            _unitOfWork.Commit();

            return new CashVoucherDTO(cashVoucherToInsert);
        }

        public InvoiceDTO AddInvoice(InvoiceDTO invoice)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            if (customer == null)
                throw new Exception("Could not find the customer");

            customer.Balance += invoice.Total;

            var invoiceToInsert = invoice.Map();
            _unitOfWork.Customer.Update(customer);
            _unitOfWork.Invoice.Insert(invoiceToInsert);
            _unitOfWork.Commit();

            return new InvoiceDTO(invoiceToInsert);
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
            _unitOfWork.CashVoucher.Delete(x => x.ID == cashVoucher.ID);
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
            _unitOfWork.Invoice.Delete(x => x.ID == invoice.ID);
            _unitOfWork.Customer.Update(customer);
            _unitOfWork.Commit();
        }

        public CashVoucherDTO EditCashVoucher(CashVoucherDTO cashVoucher)
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
            _unitOfWork.Customer.Detach(oldCustomer);
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

            return new CashVoucherDTO(cashVoucherFromDB);
        }

        public InvoiceDTO EditInvoice(InvoiceDTO invoice)
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
            _unitOfWork.Customer.Detach(oldCustomer);
            _unitOfWork.Commit();

            invoiceFromDB.Total = invoice.Total;
            invoiceFromDB.Date = invoice.Date;
            invoiceFromDB.FK_ID_Customer = invoice.FK_ID_Customer;
            invoiceFromDB.Balance = invoice.Balance;
            invoiceFromDB.Discount = invoice.Discount;
            _unitOfWork.Invoice.Update(invoiceFromDB);

            newCustomer = _unitOfWork.Customer.Get(x => x.ID == invoice.FK_ID_Customer);
            newCustomer.Balance += invoice.Total;
            _unitOfWork.Customer.Update(newCustomer);

            _unitOfWork.InvoiceItem.Delete(x => x.FK_ID_Invoice == invoiceFromDB.ID);
            _unitOfWork.Commit();


            var invoiceItems = invoice.InvoiceItems.Select(x => x.Map()).ToList();
            invoiceItems.ForEach(x => x.FK_ID_Invoice = invoiceFromDB.ID);
            _unitOfWork.InvoiceItem.InsertAll(invoiceItems);
            _unitOfWork.Commit();

            invoiceFromDB = _unitOfWork.Invoice.Get(x => x.ID == invoiceFromDB.ID);
            return new InvoiceDTO(invoiceFromDB);
        }

        public List<CashVoucherDTO> GetAllCashVoucherByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            var cashVouchers = _unitOfWork.CashVoucher.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
            return cashVouchers.Select(x => new CashVoucherDTO(x)).ToList();
        }

        public List<CashVoucherDTO> GetAllCashVouchers()
        {
            return _unitOfWork.CashVoucher.GetAll().Select(x => new CashVoucherDTO(x)).ToList();
        }

        public List<InvoiceDTO> GetAllInvoices()
        {
            return _unitOfWork.Invoice.GetAll().Select(x => new InvoiceDTO(x)).ToList();
        }

        public List<InvoiceDTO> GetAllInvoicesByCustomerID(int id)
        {
            var customer = _unitOfWork.Customer.Get(x => x.ID == id);
            if (customer == null)
                throw new Exception("Could not find the customer");

            var invoices = _unitOfWork.Invoice.GetAllQueryable().Where(x => x.FK_ID_Customer == id).ToList();
            return invoices.Select(x => new InvoiceDTO(x)).ToList();
        }

        public CashVoucherDTO GetCashVoucherByID(int id)
        {
            var cashVoucher = _unitOfWork.CashVoucher.Get(x => x.ID == id);
            if (cashVoucher == null)
                throw new Exception("Could not find the cash voucher");

            return new CashVoucherDTO(cashVoucher);
        }

        public InvoiceDTO GetInvoiceByID(int id)
        {
            var invoice = _unitOfWork.Invoice.Get(x => x.ID == id);
            if (invoice == null)
                throw new Exception("Could not find the invoice");

            return new InvoiceDTO(invoice);
        }
    }
}
