using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace KLDFishStallAccounts.DTO.Customer
{
    public class CustomerDTO : DataTransferObject<Model.EDMX.Customer>, IDataTransferObjectConvertible<Model.EDMX.Customer>
    {
        public CustomerDTO() : base(null) { }

        public CustomerDTO(Model.EDMX.Customer customer) : base(customer)
        {
            ID = customer.ID;
            Name = customer.Name;
            Address = customer.Address;
            PhoneNumber = customer.PhoneNumber;
            Balance = customer.Balance;
        }

        public int ID { get; set; }
        public string Name { get; set; }
        public string Address { get; set; }
        public string PhoneNumber { get; set; }
        public double Balance { get; set; }

        public Model.EDMX.Customer Map()
        {
            return new Model.EDMX.Customer()
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
