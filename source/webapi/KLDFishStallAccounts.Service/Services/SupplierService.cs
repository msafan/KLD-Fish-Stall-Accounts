using KLDFishStallAccounts.DTO.Common;
using KLDFishStallAccounts.DTO.Supplier;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using System;
using System.Collections.Generic;
using System.Linq;

namespace KLDFishStallAccounts.Service.Services
{
    public class SupplierService : ISupplier
    {
        private IUnitOfWork _unitOfWork;

        public SupplierService(IUnitOfWork unitOfWork)
        {
            _unitOfWork = unitOfWork;
        }
        public SupplierDTO AddSupplier(SupplierDTO supplier)
        {
            var supplierFromDB = _unitOfWork.Supplier.Get(x => x.Name.ToLowerInvariant() == supplier.Name.ToLowerInvariant());
            if (supplierFromDB != null)
                throw new Exception($"Supplier {supplier.Name} already exists");

            var supplierToInsert = supplier.Map();
            _unitOfWork.Supplier.Insert(supplierToInsert);
            _unitOfWork.Commit();

            return new SupplierDTO(supplierToInsert);
        }

        public void DeleteSupplier(int id)
        {
            var containsCashVoucher = _unitOfWork.PaymentVoucher.GetAllQueryable().Any(x => x.FK_ID_Supplier == id);
            if (containsCashVoucher)
                throw new Exception("Supplier has cash voucher. Hence, cannot delete supplier");

            var containsInvoice = _unitOfWork.PaymentVoucher.GetAllQueryable().Any(x => x.FK_ID_Supplier == id);
            if (containsInvoice)
                throw new Exception("Supplier has invoices. Hence, cannot delete supplier");

            _unitOfWork.Supplier.Delete(x => x.ID == id);
            _unitOfWork.Commit();
        }

        public SupplierDTO EditSupplier(SupplierDTO supplier)
        {
            var supplierToUpdate = _unitOfWork.Supplier.Get(x => x.ID == supplier.ID);
            if (supplierToUpdate == null)
                throw new Exception("Could not find the supplier");

            if (supplierToUpdate.Name.ToLowerInvariant() != supplier.Name.ToLowerInvariant())
            {
                var supplierWithName = _unitOfWork.Supplier.Get(x => x.Name.ToLowerInvariant() == supplier.Name.ToLowerInvariant());
                if (supplierWithName != null)
                    throw new Exception($"Supplier {supplier.Name} already exists");
            }

            supplierToUpdate.Address = supplier.Address;
            supplierToUpdate.Name = supplier.Name;
            supplierToUpdate.PhoneNumber = supplier.PhoneNumber;

            _unitOfWork.Supplier.Update(supplierToUpdate);
            _unitOfWork.Commit();

            return new SupplierDTO(supplierToUpdate);
        }

        public List<SupplierDTO> GetAllSuppliers()
        {
            return _unitOfWork.Supplier.GetAll().Select(x => new SupplierDTO(x)).ToList();
        }

        public SupplierDTO GetSupplierByID(int id)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == id);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            return new SupplierDTO(supplier);
        }

        public List<SupplierStatement> GetSupplierStatement(int id, DateRange dateRange)
        {
            var supplier = _unitOfWork.Supplier.Get(x => x.ID == id);
            if (supplier == null)
                throw new Exception("Could not find the supplier");

            if (dateRange == null)
                dateRange = new DateRange() { StartDate = new DateTime(1, 1, 1), EndDate = new DateTime(5000, 12, 31) };

            var supplierStatements = new List<SupplierStatement>();

            supplierStatements.AddRange(_unitOfWork.PurchaseInvoice.
                GetAllQueryable().
                Where(x => x.FK_ID_Supplier == id &&
                    x.Date >= dateRange.StartDate &&
                    x.Date <= dateRange.EndDate).
                Select(x => new SupplierStatement()
                {
                    Amount = x.Total,
                    Date = x.Date,
                    ID = x.ID,
                    Particulars = "Sales Invoice"
                }));

            supplierStatements.AddRange(_unitOfWork.PaymentVoucher.
                GetAllQueryable().
                Where(x => x.FK_ID_Supplier == id &&
                    x.Date >= dateRange.StartDate &&
                    x.Date <= dateRange.EndDate).
                Select(x => new SupplierStatement()
                {
                    Amount = x.Amount,
                    Date = x.Date,
                    ID = x.ID,
                    Particulars = "Cash Payment Voucher"
                }));

            var supplierStatementsToReturn = supplierStatements.OrderBy(x => x.Date).ToList();

            var hasCashVouchersBeyondDate = _unitOfWork.PaymentVoucher.GetAllQueryable().Any(x => x.FK_ID_Supplier == id && x.Date > dateRange.EndDate);
            var hasInvoicesBeyondDate = _unitOfWork.PurchaseInvoice.GetAllQueryable().Any(x => x.FK_ID_Supplier == id && x.Date > dateRange.EndDate);
            if (hasCashVouchersBeyondDate || hasInvoicesBeyondDate)
                return supplierStatementsToReturn;

            supplierStatementsToReturn.Reverse();

            var currentBalance = supplier.Balance;
            supplierStatementsToReturn.ForEach(x =>
            {
                x.Balance = currentBalance;
                currentBalance += (x.Amount * (x.Particulars == "Sales Invoice" ? -1 : 1));
            });

            supplierStatementsToReturn.Reverse();

            supplierStatementsToReturn.Insert(0, new SupplierStatement()
            {
                ID = int.MinValue,
                Particulars = "Opening Balance",
                Amount = currentBalance,
                Balance = currentBalance
            });
            supplierStatementsToReturn.Add(new SupplierStatement()
            {
                ID = int.MinValue,
                Particulars = "Closing Balance",
                Balance = supplier.Balance
            });

            return supplierStatementsToReturn;
        }
    }
}
