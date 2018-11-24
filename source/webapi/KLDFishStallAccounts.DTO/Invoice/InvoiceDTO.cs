using KLDFishStallAccounts.DTO.Customer;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.DTO.Invoice
{
    public class InvoiceDTO : DataTransferObject<Model.EDMX.Invoice>, IDataTransferObjectConvertible<Model.EDMX.Invoice>
    {
        public InvoiceDTO() : base(null) { }

        public InvoiceDTO(Model.EDMX.Invoice item) : base(item)
        {
            ID = item.ID;
            FK_ID_Customer = item.ID;
            Date = item.Date;
            Discount = item.Discount;
            Total = item.Total;
            Balance = item.Balance;
            Customer = item.Customer == null ? null : new CustomerDTO(item.Customer);
            InvoiceItems = item.InvoiceItems == null ? null : item.InvoiceItems.Select(x => new InvoiceItemDTO(x)).ToList();
        }

        public int ID { get; set; }
        public int FK_ID_Customer { get; set; }
        public DateTimeOffset Date { get; set; }
        public double Discount { get; set; }
        public double Total { get; set; }
        public double Balance { get; set; }

        public CustomerDTO Customer { get; set; }
        public List<InvoiceItemDTO> InvoiceItems { get; set; }

        public Model.EDMX.Invoice Map()
        {
            return new Model.EDMX.Invoice()
            {
                ID = ID,
                FK_ID_Customer = FK_ID_Customer,
                Balance = Balance,
                Customer = Customer == null ? null : Customer.Map(),
                Date = Date,
                Discount = Discount,
                InvoiceItems = InvoiceItems == null ? null : InvoiceItems.Select(x => x.Map()).ToList(),
                Total = Total
            };
        }
    }
}
