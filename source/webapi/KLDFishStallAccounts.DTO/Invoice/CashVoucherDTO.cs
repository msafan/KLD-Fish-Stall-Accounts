using KLDFishStallAccounts.DTO.Customer;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.DTO.Invoice
{
    public class CashVoucherDTO : DataTransferObject<CashVoucher>, IDataTransferObjectConvertible<CashVoucher>
    {
        public CashVoucherDTO() : base(null) { }

        public CashVoucherDTO(CashVoucher item) : base(item)
        {
            ID = item.ID;
            FK_ID_Customer = item.FK_ID_Customer;
            Date = item.Date;
            Amount = item.Amount;
            Remarks = item.Remarks;
            Customer = item.Customer == null ? null : new CustomerDTO(item.Customer);
        }

        public int ID { get; set; }
        public int FK_ID_Customer { get; set; }
        public DateTimeOffset Date { get; set; }
        public double Amount { get; set; }
        public string Remarks { get; set; }

        public CustomerDTO Customer { get; set; }

        public CashVoucher Map()
        {
            return new CashVoucher()
            {
                Amount = Amount,
                FK_ID_Customer = FK_ID_Customer,
                Date = Date,
                Customer = Customer == null ? null : Customer.Map(),
                ID = ID,
                Remarks = Remarks
            };
        }
    }
}
