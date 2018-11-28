using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Supplier
{
    public class SupplierStatement
    {
        public DateTimeOffset Date { get; set; }

        public string Particulars { get; set; }

        public int ID { get; set; }

        public double Amount { get; set; }

        public double Credit { get; set; }

        public double Debit { get; set; }

        public double Balance { get; set; }
    }
}
