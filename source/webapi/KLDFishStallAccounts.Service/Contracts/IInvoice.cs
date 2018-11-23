using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IInvoice
    {
        List<Invoice> GetAllInvoicesByCustomerID(int id);
        List<CashVoucher> GetAllCashVoucherByCustomerID(int id);
        List<Invoice> GetAllInvoices();
        List<CashVoucher> GetAllCashVouchers();
        Invoice AddInvoice(Invoice invoice);
        CashVoucher AddCashVoucher(CashVoucher cashVoucher);
        Invoice EditInvoice(Invoice invoice);
        CashVoucher EditCashVoucher(CashVoucher cashVoucher);
        void DeleteInvoice(int id);
        void DeleteCashVoucher(int id);
    }
}
