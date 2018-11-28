using KLDFishStallAccounts.DTO.Fish;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.DTO.Invoice
{
    public class InvoiceItemDTO : DataTransferObject<InvoiceItem>, IDataTransferObjectConvertible<InvoiceItem>
    {
        public InvoiceItemDTO() : base(null) { }

        public InvoiceItemDTO(InvoiceItem item) : base(item)
        {
            ID = item.ID;
            FK_ID_Fish = item.FK_ID_Fish;
            FK_ID_Invoice = item.FK_ID_Invoice;
            Quantity = item.Quantity;
            Rate = item.Rate;
            Total = item.Total;
            Fish = item.Fish == null ? null : new FishDTO(item.Fish);
        }

        public int ID { get; set; }
        public int FK_ID_Invoice { get; set; }
        public int FK_ID_Fish { get; set; }
        public double Quantity { get; set; }
        public double Rate { get; set; }
        public double Total { get; set; }

        public FishDTO Fish { get; set; }

        public InvoiceItem Map()
        {
            return new InvoiceItem()
            {
                Fish = Fish == null ? null : Fish.Map(),
                FK_ID_Fish = FK_ID_Fish,
                FK_ID_Invoice = FK_ID_Invoice,
                ID = ID,
                Quantity = Quantity,
                Rate = Rate,
                Total = Total
            };
        }
    }
}
