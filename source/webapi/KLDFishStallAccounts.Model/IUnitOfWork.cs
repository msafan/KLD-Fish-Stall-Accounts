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
        Repository<Fish> Fish { get; }
        Repository<User> User { get; }
        Repository<Invoice> Invoice { get; }
        Repository<InvoiceItem> InvoiceItem { get; }
        Repository<CashVoucher> CashVoucher { get; }

        void Commit();
    }
}
