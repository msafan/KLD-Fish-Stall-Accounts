using KLDFishStallAccounts.Model.EDMX;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.WebApi.Attributes;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
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
        public List<Invoice> GetAllInvoices()
        {
           return _invoiceService.GetAllInvoices();
        }

        [HttpGet]
        public List<CashVoucher> GetAllCashVouchers()
        {
            return _invoiceService.GetAllCashVouchers();
        }

        [HttpGet]
        public List<Invoice> GetAllInvoicesByCustomerID([FromUri]int id)
        {
            return _invoiceService.GetAllInvoicesByCustomerID(id);
        }

        [HttpGet]
        public List<CashVoucher> GetAllCashVoucherByCustomerID([FromUri]int id)
        {
            return _invoiceService.GetAllCashVoucherByCustomerID(id);
        }

        [HttpPost]
        public Invoice AddInvoice([FromBody]Invoice invoice)
        {
            return _invoiceService.AddInvoice(invoice);
        }

        [HttpPost]
        public CashVoucher AddCashVoucher([FromBody]CashVoucher cashVoucher)
        {
            return _invoiceService.AddCashVoucher(cashVoucher);
        }

        [HttpPost]
        public Invoice EditInvoice([FromBody]Invoice invoice)
        {
            return _invoiceService.EditInvoice(invoice);
        }

        [HttpPost]
        public CashVoucher EditCashVoucher([FromBody]CashVoucher cashVoucher)
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