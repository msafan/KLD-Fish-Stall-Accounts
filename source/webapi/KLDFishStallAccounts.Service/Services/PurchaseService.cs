using KLDFishStallAccounts.DTO.Purchase;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class PurchaseService : IPurchase
    {
        private IUnitOfWork _unitOfWork;

        public PurchaseService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }

        public PaymentVoucherDTO AddPaymentVoucher(PaymentVoucherDTO paymentVoucher)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == paymentVoucher.FK_ID_Supplier);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            supplier.Balance -= paymentVoucher.Amount;

            var cashVoucherToInsert = paymentVoucher.Map();
            _unitOfWork.Supplier.Update(supplier);
            _unitOfWork.PaymentVoucher.Insert(cashVoucherToInsert);
            _unitOfWork.Commit();

            return new PaymentVoucherDTO(cashVoucherToInsert);
        }

        public PurchaseInvoiceDTO AddPurchaseInvoice(PurchaseInvoiceDTO purchaseInvoice)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == purchaseInvoice.FK_ID_Supplier);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            supplier.Balance += purchaseInvoice.Total;

            var invoiceToInsert = purchaseInvoice.Map();
            _unitOfWork.Supplier.Update(supplier);
            _unitOfWork.PurchaseInvoice.Insert(invoiceToInsert);
            _unitOfWork.Commit();

            return new PurchaseInvoiceDTO(invoiceToInsert);
        }

        public void DeletePaymentVoucher(int id)
        {
            var cashVoucher = _unitOfWork.PaymentVoucher.Get(x => x.ID == id);
            if (cashVoucher == null)
                throw new Exception("Could not find the voucher");

            var supplier = _unitOfWork.Supplier.Get(x => x.ID == cashVoucher.FK_ID_Supplier);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            supplier.Balance += cashVoucher.Amount;
            _unitOfWork.PaymentVoucher.Delete(x => x.ID == cashVoucher.ID);
            _unitOfWork.Supplier.Update(supplier);
            _unitOfWork.Commit();
        }

        public void DeletePurchaseInvoice(int id)
        {
            var invoice = _unitOfWork.PurchaseInvoice.Get(x => x.ID == id);
            if (invoice == null)
                throw new Exception("Could not find the invoice");

            var supplier = _unitOfWork.Supplier.Get(x => x.ID == invoice.FK_ID_Supplier);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            supplier.Balance -= invoice.Total;
            _unitOfWork.PurchaseInvoice.Delete(x => x.ID == invoice.ID);
            _unitOfWork.Supplier.Update(supplier);
            _unitOfWork.Commit();
        }

        public PaymentVoucherDTO EditPaymentVoucher(PaymentVoucherDTO paymentVoucher)
        {
            var paymentVoucherFromDB = _unitOfWork.PaymentVoucher.Get(x => x.ID == paymentVoucher.ID);
            if (paymentVoucherFromDB == null)
                throw new Exception("Could not find the voucher");

            var oldSupplier = _unitOfWork.Supplier.Get(x => x.ID == paymentVoucherFromDB.FK_ID_Supplier);
            if (oldSupplier == null)
                throw new Exception("Could not find the supplier");

            var newSupplier = _unitOfWork.Supplier.Get(x => x.ID == paymentVoucher.FK_ID_Supplier);
            if (newSupplier == null)
                throw new Exception("Could not find the supplier");

            oldSupplier.Balance += paymentVoucherFromDB.Amount;
            _unitOfWork.Supplier.Update(oldSupplier);
            _unitOfWork.Commit();
            _unitOfWork.Supplier.Detach(oldSupplier);
            _unitOfWork.Commit();

            paymentVoucherFromDB.Amount = paymentVoucher.Amount;
            paymentVoucherFromDB.Date = paymentVoucher.Date;
            paymentVoucherFromDB.FK_ID_Supplier = paymentVoucher.FK_ID_Supplier;
            paymentVoucherFromDB.Remarks = paymentVoucher.Remarks;
            _unitOfWork.PaymentVoucher.Update(paymentVoucherFromDB);

            newSupplier = _unitOfWork.Supplier.Get(x => x.ID == paymentVoucher.FK_ID_Supplier);
            newSupplier.Balance -= paymentVoucher.Amount;
            _unitOfWork.Supplier.Update(newSupplier);

            _unitOfWork.Commit();

            return new PaymentVoucherDTO(paymentVoucherFromDB);
        }

        public PurchaseInvoiceDTO EditPurchaseInvoice(PurchaseInvoiceDTO purchaseInvoice)
        {
            var invoiceFromDB = _unitOfWork.PurchaseInvoice.Get(x => x.ID == purchaseInvoice.ID);
            if (invoiceFromDB == null)
                throw new Exception("Could not find the invoice");

            var oldSupplier = _unitOfWork.Supplier.Get(x => x.ID == invoiceFromDB.FK_ID_Supplier);
            if (oldSupplier == null)
                throw new Exception("Could not find the supplier");

            var newSupplier = _unitOfWork.Supplier.Get(x => x.ID == purchaseInvoice.FK_ID_Supplier);
            if (newSupplier == null)
                throw new Exception("Could not find the supplier");

            oldSupplier.Balance -= invoiceFromDB.Total;
            _unitOfWork.Supplier.Update(oldSupplier);
            _unitOfWork.Commit();
            _unitOfWork.Supplier.Detach(oldSupplier);
            _unitOfWork.Commit();

            invoiceFromDB.Total = purchaseInvoice.Total;
            invoiceFromDB.Date = purchaseInvoice.Date;
            invoiceFromDB.FK_ID_Supplier = purchaseInvoice.FK_ID_Supplier;
            invoiceFromDB.Balance = purchaseInvoice.Balance;
            invoiceFromDB.Discount = purchaseInvoice.Discount;
            _unitOfWork.PurchaseInvoice.Update(invoiceFromDB);

            newSupplier = _unitOfWork.Supplier.Get(x => x.ID == purchaseInvoice.FK_ID_Supplier);
            newSupplier.Balance += purchaseInvoice.Total;
            _unitOfWork.Supplier.Update(newSupplier);

            _unitOfWork.InvoiceItem.Delete(x => x.FK_ID_Invoice == invoiceFromDB.ID);
            _unitOfWork.Commit();


            var invoiceItems = purchaseInvoice.PurchaseInvoiceItems.Select(x => x.Map()).ToList();
            invoiceItems.ForEach(x => x.FK_ID_PurchaseInvoice = invoiceFromDB.ID);
            _unitOfWork.PurchaseInvoiceItem.InsertAll(invoiceItems);
            _unitOfWork.Commit();

            invoiceFromDB = _unitOfWork.PurchaseInvoice.Get(x => x.ID == invoiceFromDB.ID);
            return new PurchaseInvoiceDTO(invoiceFromDB);
        }

        public List<PaymentVoucherDTO> GetAllPaymentVoucherBySupplierID(int id)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == id);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            var cashVouchers = _unitOfWork.PaymentVoucher.GetAllQueryable().Where(x => x.FK_ID_Supplier == id).ToList();
            return cashVouchers.Select(x => new PaymentVoucherDTO(x)).ToList();
        }

        public List<PaymentVoucherDTO> GetAllPaymentVouchers()
        {
            return _unitOfWork.PaymentVoucher.GetAll().Select(x => new PaymentVoucherDTO(x)).ToList();
        }

        public List<PurchaseInvoiceDTO> GetAllPurchaseInvoices()
        {
            return _unitOfWork.PurchaseInvoice.GetAll().Select(x => new PurchaseInvoiceDTO(x)).ToList();
        }

        public List<PurchaseInvoiceDTO> GetAllPurchaseInvoicesBySupplierID(int id)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == id);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            var invoices = _unitOfWork.PurchaseInvoice.GetAllQueryable().Where(x => x.FK_ID_Supplier == id).ToList();
            return invoices.Select(x => new PurchaseInvoiceDTO(x)).ToList();
        }

        public PaymentVoucherDTO GetPaymentVoucherByID(int id)
        {
            var cashVoucher = _unitOfWork.PaymentVoucher.Get(x => x.ID == id);
            if (cashVoucher == null)
                throw new Exception("Could not find the cash voucher");

            return new PaymentVoucherDTO(cashVoucher);
        }

        public PurchaseInvoiceDTO GetPurchaseInvoiceByID(int id)
        {
            var invoice = _unitOfWork.PurchaseInvoice.Get(x => x.ID == id);
            if (invoice == null)
                throw new Exception("Could not find the invoice");

            return new PurchaseInvoiceDTO(invoice);
        }
    }
}
