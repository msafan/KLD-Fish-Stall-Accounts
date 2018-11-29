using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Supplier;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class SupplierController : ApiController
    {
        private ISupplier _supplierService;

        public SupplierController(ISupplier supplierSerice)
        {
            _supplierService = supplierSerice;
        }

        [HttpGet]
        public List<SupplierDTO> GetAllSuppliers()
        {
            return _supplierService.GetAllSuppliers();
        }

        [HttpGet]
        public SupplierDTO GetSupplierByID([FromUri] int id)
        {
            return _supplierService.GetSupplierByID(id);
        }

        [HttpPost]
        public SupplierDTO AddSupplier([FromBody]SupplierDTO Supplier)
        {
            return _supplierService.AddSupplier(Supplier);
        }

        [HttpPost]
        public SupplierDTO EditSupplier([FromBody] SupplierDTO Supplier)
        {
            return _supplierService.EditSupplier(Supplier);
        }

        [HttpGet]
        public void DeleteSupplier([FromUri]int id)
        {
            _supplierService.DeleteSupplier(id);
        }

        [HttpPost]
        public List<SupplierStatement> GetSupplierStatement([FromUri]int id,[FromBody]DateRange dateRange)
        {
            return _supplierService.GetSupplierStatement(id, dateRange);
        }
    }
}