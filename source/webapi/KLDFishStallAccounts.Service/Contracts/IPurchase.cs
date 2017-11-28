using KLDFishStallAccounts.DTO.Purchase;
using System.Collections.Generic;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IPurchase
    {
        List<PurchaseInvoiceDTO> GetAllPurchaseInvoicesBySupplierID(int id);
        List<PaymentVoucherDTO> GetAllPaymentVoucherBySupplierID(int id);
        List<PurchaseInvoiceDTO> GetAllPurchaseInvoices();
        List<PaymentVoucherDTO> GetAllPaymentVouchers();
        PurchaseInvoiceDTO AddPurchaseInvoice(PurchaseInvoiceDTO purchaseInvoice);
        PaymentVoucherDTO AddPaymentVoucher(PaymentVoucherDTO paymentVoucher);
        PurchaseInvoiceDTO EditPurchaseInvoice(PurchaseInvoiceDTO purchaseInvoice);
        PaymentVoucherDTO EditPaymentVoucher(PaymentVoucherDTO paymentVoucher);
        void DeletePurchaseInvoice(int id);
        void DeletePaymentVoucher(int id);
        PurchaseInvoiceDTO GetPurchaseInvoiceByID(int id);
        PaymentVoucherDTO GetPaymentVoucherByID(int id);
    }
}
