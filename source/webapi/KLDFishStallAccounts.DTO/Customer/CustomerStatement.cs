using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Customer
{
    public class CustomerStatement
    {
        public DateTimeOffset Date { get; set; }

        public string Particulars { get; set; }

        public int ID { get; set; }

        public double Amount { get; set; }

        public double Balance { get; set; }
    }
}
