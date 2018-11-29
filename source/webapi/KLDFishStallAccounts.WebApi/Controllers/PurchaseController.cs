using KLDFishStallAccounts.DTO.Purchase;
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
        public List<PurchaseInvoiceDTO> GetAllPurchaseInvoices()
        {
            return _purchaseService.GetAllPurchaseInvoices();
        }

        [HttpGet]
        public List<PaymentVoucherDTO> GetAllPaymentVouchers()
        {
            return _purchaseService.GetAllPaymentVouchers();
        }

        [HttpGet]
        public PurchaseInvoiceDTO GetPurchaseInvoiceByID([FromUri]int id)
        {
            return _purchaseService.GetPurchaseInvoiceByID(id);
        }

        [HttpGet]
        public PaymentVoucherDTO GetPaymentVoucherByID([FromUri]int id)
        {
            return _purchaseService.GetPaymentVoucherByID(id);
        }

        [HttpGet]
        public List<PurchaseInvoiceDTO> GetAllPurchaseInvoicesBySupplierID([FromUri]int id)
        {
            return _purchaseService.GetAllPurchaseInvoicesBySupplierID(id);
        }

        [HttpGet]
        public List<PaymentVoucherDTO> GetAllPaymentVoucherBySupplierID([FromUri]int id)
        {
            return _purchaseService.GetAllPaymentVoucherBySupplierID(id);
        }

        [HttpPost]
        public PurchaseInvoiceDTO AddPurchaseInvoice([FromBody]PurchaseInvoiceDTO purchaseInvoice)
        {
            return _purchaseService.AddPurchaseInvoice(purchaseInvoice);
        }

        [HttpPost]
        public PaymentVoucherDTO AddPaymentVoucher([FromBody]PaymentVoucherDTO paymentVoucher)
        {
            return _purchaseService.AddPaymentVoucher(paymentVoucher);
        }

        [HttpPost]
        public PurchaseInvoiceDTO EditPurchaseInvoice([FromBody]PurchaseInvoiceDTO paymentInvoice)
        {
            return _purchaseService.EditPurchaseInvoice(paymentInvoice);
        }

        [HttpPost]
        public PaymentVoucherDTO EditPaymentVoucher([FromBody]PaymentVoucherDTO paymentVoucher)
        {
            return _purchaseService.EditPaymentVoucher(paymentVoucher);
        }

        [HttpGet]
        public void DeletePurchaseInvoice([FromUri] int id)
        {
            _purchaseService.DeletePurchaseInvoice(id);
        }

        [HttpGet]
        public void DeletePaymentVoucher([FromUri] int id)
        {
            _purchaseService.DeletePaymentVoucher(id);
        }
    }
}