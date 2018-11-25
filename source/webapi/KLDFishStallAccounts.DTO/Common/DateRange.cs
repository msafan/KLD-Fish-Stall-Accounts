using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Common
{
    public class DateRange
    {
        public DateTime StartDate { get; set; }
        public DateTime EndDate { get; set; }
    }

    public class DateRangeDTO
    {
        public int ID { get; set; }
        public string StartDate { get; set; }
        public string EndDate { get; set; }
    }
}
