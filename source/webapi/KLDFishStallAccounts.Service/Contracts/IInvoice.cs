using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.DTO.Invoice;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface IInvoice
    {
        List<InvoiceDTO> GetAllInvoicesByCustomerID(int id);
        List<CashVoucherDTO> GetAllCashVoucherByCustomerID(int id);
        List<InvoiceDTO> GetAllInvoices();
        List<CashVoucherDTO> GetAllCashVouchers();
        InvoiceDTO AddInvoice(InvoiceDTO invoice);
        CashVoucherDTO AddCashVoucher(CashVoucherDTO cashVoucher);
        InvoiceDTO EditInvoice(InvoiceDTO invoice);
        CashVoucherDTO EditCashVoucher(CashVoucherDTO cashVoucher);
        void DeleteInvoice(int id);
        void DeleteCashVoucher(int id);
        InvoiceDTO GetInvoiceByID(int id);
        CashVoucherDTO GetCashVoucherByID(int id);
    }
}
