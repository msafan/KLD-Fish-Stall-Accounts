using KLDFishStallAccounts.DTO.Invoice;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System.Collections.Generic;
using System.Web.Http;

namespace KLDFishStallAccounts.WebApi.Controllers
{
    [ExceptionHandler]
    public class InvoiceController : ApiController
    {
        private IInvoice _invoiceService;

        public InvoiceController(IInvoice invoiceService)
        {
            _invoiceService = invoiceService;
        }

        [HttpGet]
        public List<InvoiceDTO> GetAllInvoices()
        {
            return _invoiceService.GetAllInvoices();
        }

        [HttpGet]
        public List<CashVoucherDTO> GetAllCashVouchers()
        {
            return _invoiceService.GetAllCashVouchers();
        }

        [HttpGet]
        public InvoiceDTO GetInvoiceByID([FromUri]int id)
        {
            return _invoiceService.GetInvoiceByID(id);
        }

        [HttpGet]
        public CashVoucherDTO GetCashVoucherByID([FromUri]int id)
        {
            return _invoiceService.GetCashVoucherByID(id);
        }

        [HttpGet]
        public List<InvoiceDTO> GetAllInvoicesByCustomerID([FromUri]int id)
        {
            return _invoiceService.GetAllInvoicesByCustomerID(id);
        }

        [HttpGet]
        public List<CashVoucherDTO> GetAllCashVoucherByCustomerID([FromUri]int id)
        {
            return _invoiceService.GetAllCashVoucherByCustomerID(id);
        }

        [HttpPost]
        public InvoiceDTO AddInvoice([FromBody]InvoiceDTO invoice)
        {
            return _invoiceService.AddInvoice(invoice);
        }

        [HttpPost]
        public CashVoucherDTO AddCashVoucher([FromBody]CashVoucherDTO cashVoucher)
        {
            return _invoiceService.AddCashVoucher(cashVoucher);
        }

        [HttpPost]
        public InvoiceDTO EditInvoice([FromBody]InvoiceDTO invoice)
        {
            return _invoiceService.EditInvoice(invoice);
        }

        [HttpPost]
        public CashVoucherDTO EditCashVoucher([FromBody]CashVoucherDTO cashVoucher)
        {
            return _invoiceService.EditCashVoucher(cashVoucher);
        }

        [HttpGet]
        public void DeleteInvoice([FromUri] int id)
        {
            _invoiceService.DeleteInvoice(id);
        }

        [HttpGet]
        public void DeleteCashVoucher([FromUri] int id)
        {
            _invoiceService.DeleteCashVoucher(id);
        }
    }
}