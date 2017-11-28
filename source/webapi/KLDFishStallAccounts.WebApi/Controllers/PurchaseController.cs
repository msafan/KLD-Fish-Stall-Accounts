using KLDFishStallAccounts.DTO.Invoice;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class PurchaseController : ApiController
    {
        private IPurchase _purchaseService;

        public PurchaseController(IPurchase purchaseService)
        {
            _purchaseService = purchaseService;
        }

        [HttpGet]
        public List<InvoiceDTO> GetAllInvoices()
        {
            return _purchaseService.GetAllInvoices();
        }

        [HttpGet]
        public List<CashVoucherDTO> GetAllCashVouchers()
        {
            return _purchaseService.GetAllCashVouchers();
        }

        [HttpGet]
        public InvoiceDTO GetInvoiceByID([FromUri]int id)
        {
            return _purchaseService.GetInvoiceByID(id);
        }

        [HttpGet]
        public CashVoucherDTO GetCashVoucherByID([FromUri]int id)
        {
            return _purchaseService.GetCashVoucherByID(id);
        }

        [HttpGet]
        public List<InvoiceDTO> GetAllInvoicesByCustomerID([FromUri]int id)
        {
            return _purchaseService.GetAllInvoicesByCustomerID(id);
        }

        [HttpGet]
        public List<CashVoucherDTO> GetAllCashVoucherByCustomerID([FromUri]int id)
        {
            return _purchaseService.GetAllCashVoucherByCustomerID(id);
        }

        [HttpPost]
        public InvoiceDTO AddInvoice([FromBody]InvoiceDTO invoice)
        {
            return _purchaseService.AddInvoice(invoice);
        }

        [HttpPost]
        public CashVoucherDTO AddCashVoucher([FromBody]CashVoucherDTO cashVoucher)
        {
            return _purchaseService.AddCashVoucher(cashVoucher);
        }

        [HttpPost]
        public InvoiceDTO EditInvoice([FromBody]InvoiceDTO invoice)
        {
            return _purchaseService.EditInvoice(invoice);
        }

        [HttpPost]
        public CashVoucherDTO EditCashVoucher([FromBody]CashVoucherDTO cashVoucher)
        {
            return _purchaseService.EditCashVoucher(cashVoucher);
        }

        [HttpGet]
        public void DeleteInvoice([FromUri] int id)
        {
            _purchaseService.DeleteInvoice(id);
        }

        [HttpGet]
        public void DeleteCashVoucher([FromUri] int id)
        {
            _purchaseService.DeleteCashVoucher(id);
        }
    }
}