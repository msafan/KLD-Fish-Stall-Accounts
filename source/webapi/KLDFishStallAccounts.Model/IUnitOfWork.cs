using KLDFishStallAccounts.Model.EDMX;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.Model
{
    public interface IUnitOfWork
    {
        Repository<Customer> Customer { get; }
        Repository<Supplier> Supplier { get; }
        Repository<Fish> Fish { get; }
        Repository<User> User { get; }
        Repository<Invoice> Invoice { get; }
        Repository<PurchaseInvoice> PurchaseInvoice { get; }
        Repository<InvoiceItem> InvoiceItem { get; }
        Repository<PurchaseInvoiceItem> PurchaseInvoiceItem { get; }
        Repository<CashVoucher> CashVoucher { get; }
        Repository<PaymentVoucher> PaymentVoucher { get; }

        void Commit();
    }
}
