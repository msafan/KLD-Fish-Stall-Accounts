using KLDFishStallAccounts.DTO.Supplier;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.DTO.Purchase
{
    public class PurchaseInvoiceDTO : DataTransferObject<Model.EDMX.PurchaseInvoice>, IDataTransferObjectConvertible<Model.EDMX.PurchaseInvoice>
    {
        public PurchaseInvoiceDTO() : base(null) { }

        public PurchaseInvoiceDTO(Model.EDMX.PurchaseInvoice item) : base(item)
        {
            ID = item.ID;
            FK_ID_Supplier = item.FK_ID_Supplier;
            Date = item.Date;
            Discount = item.Discount;
            Total = item.Total;
            Balance = item.Balance;
            Supplier = item.Supplier == null ? null : new SupplierDTO(item.Supplier);
            PurchaseInvoiceItems = item.PurchaseInvoiceItems == null ? null : item.PurchaseInvoiceItems.Select(x => new PurchaseInvoiceItemDTO(x)).ToList();
        }

        public int ID { get; set; }
        public int FK_ID_Supplier { get; set; }
        public DateTime Date { get; set; }
        public double Discount { get; set; }
        public double Total { get; set; }
        public double Balance { get; set; }

        public SupplierDTO Supplier { get; set; }
        public List<PurchaseInvoiceItemDTO> PurchaseInvoiceItems { get; set; }

        public Model.EDMX.PurchaseInvoice Map()
        {
            return new Model.EDMX.PurchaseInvoice()
            {
                ID = ID,
                FK_ID_Supplier = FK_ID_Supplier,
                Balance = Balance,
                Supplier = Supplier == null ? null : Supplier.Map(),
                Date = Date,
                Discount = Discount,
                PurchaseInvoiceItems = PurchaseInvoiceItems == null ? null : PurchaseInvoiceItems.Select(x => x.Map()).ToList(),
                Total = Total
            };
        }
    }
}
