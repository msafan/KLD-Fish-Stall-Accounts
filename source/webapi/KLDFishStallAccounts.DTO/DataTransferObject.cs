using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO
{
    public class DataTransferObject<T> where T : class
    {
        protected DataTransferObject(T item) { }
    }
}
