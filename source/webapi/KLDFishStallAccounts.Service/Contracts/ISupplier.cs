using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Supplier;
using System.Collections.Generic;

namespace KLDFishStallAccounts.Service.Contracts
{
    public interface ISupplier
    {
        List<SupplierDTO> GetAllSuppliers();
        SupplierDTO GetSupplierByID(int id);
        SupplierDTO AddSupplier(SupplierDTO Supplier);
        SupplierDTO EditSupplier(SupplierDTO Supplier);
        void DeleteSupplier(int id);
        List<SupplierStatement> GetSupplierStatement(int id, DateRange dateRange);
    }
}
