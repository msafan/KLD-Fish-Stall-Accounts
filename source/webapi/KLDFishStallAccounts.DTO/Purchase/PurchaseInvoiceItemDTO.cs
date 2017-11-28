using KLDFishStallAccounts.DTO.Fish;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.DTO.Purchase
{
    public class PurchaseInvoiceItemDTO : DataTransferObject<PurchaseInvoiceItem>, IDataTransferObjectConvertible<PurchaseInvoiceItem>
    {
        public PurchaseInvoiceItemDTO() : base(null) { }

        public PurchaseInvoiceItemDTO(PurchaseInvoiceItem item) : base(item)
        {
            ID = item.ID;
            FK_ID_Fish = item.FK_ID_Fish;
            FK_ID_PurchaseInvoice = item.FK_ID_PurchaseInvoice;
            Quantity = item.Quantity;
            Rate = item.Rate;
            Total = item.Total;
            Fish = item.Fish == null ? null : new FishDTO(item.Fish);
        }

        public int ID { get; set; }
        public int FK_ID_PurchaseInvoice { get; set; }
        public int FK_ID_Fish { get; set; }
        public double Quantity { get; set; }
        public double Rate { get; set; }
        public double Total { get; set; }

        public FishDTO Fish { get; set; }

        public PurchaseInvoiceItem Map()
        {
            return new PurchaseInvoiceItem()
            {
                Fish = Fish == null ? null : Fish.Map(),
                FK_ID_Fish = FK_ID_Fish,
                FK_ID_PurchaseInvoice = FK_ID_PurchaseInvoice,
                ID = ID,
                Quantity = Quantity,
                Rate = Rate,
                Total = Total
            };
        }
    }
}
