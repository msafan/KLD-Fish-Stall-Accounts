using KLDFishStallAccounts.DTO.Supplier;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.DTO.Purchase
{
    public class PaymentVoucherDTO : DataTransferObject<PaymentVoucher>, IDataTransferObjectConvertible<PaymentVoucher>
    {
        public PaymentVoucherDTO() : base(null) { }

        public PaymentVoucherDTO(PaymentVoucher item) : base(item)
        {
            ID = item.ID;
            FK_ID_Supplier = item.FK_ID_Supplier;
            Date = item.Date;
            Amount = item.Amount;
            Remarks = item.Remarks;
            Supplier = item.Supplier == null ? null : new SupplierDTO(item.Supplier);
        }

        public int ID { get; set; }
        public int FK_ID_Supplier { get; set; }
        public DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Remarks { get; set; }

        public SupplierDTO Supplier { get; set; }

        public PaymentVoucher Map()
        {
            return new PaymentVoucher()
            {
                Amount = Amount,
                FK_ID_Supplier = FK_ID_Supplier,
                Date = Date,
                Supplier = Supplier == null ? null : Supplier.Map(),
                ID = ID,
                Remarks = Remarks
            };
        }
    }
}
