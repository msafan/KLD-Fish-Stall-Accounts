using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Supplier
{
    public class SupplierDTO : DataTransferObject<Model.EDMX.Supplier>, IDataTransferObjectConvertible<Model.EDMX.Supplier>
    {
        public SupplierDTO() : base(null) { }

        public SupplierDTO(Model.EDMX.Supplier supplier) : base(supplier)
        {
            ID = supplier.ID;
            Name = supplier.Name;
            Address = supplier.Address;
            PhoneNumber = supplier.PhoneNumber;
            Balance = supplier.Balance;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double Balance { get; set; }

        public Model.EDMX.Supplier Map()
        {
            return new Model.EDMX.Supplier()
            {
                ID = ID,
                Name = Name,
                Address = Address,
                PhoneNumber = PhoneNumber,
                Balance = Balance,
            };
        }
    }
}
