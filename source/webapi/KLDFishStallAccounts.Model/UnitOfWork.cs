﻿using KLDFishStallAccounts.Model.EDMX;

namespace KLDFishStallAccounts.Model
{
    public class UnitOfWork : IUnitOfWork
    {
        private KLDFishStallAccountsEntities dataContext;

        private Repository<CashVoucher> _cashVoucher;
        private Repository<PaymentVoucher> _paymentVoucher;
        private Repository<Customer> _customer;
        private Repository<Supplier> _supplier;
        private Repository<Fish> _fish;
        private Repository<Invoice> _invoice;
        private Repository<PurchaseInvoice> _purchaseInvoice;
        private Repository<InvoiceItem> _invoiceItem;
        private Repository<PurchaseInvoiceItem> _purchaseInvoiceItem;
        private Repository<User> _user;

        public UnitOfWork()
        {
            dataContext = dataContext ?? (dataContext = new KLDFishStallAccountsEntities());

            dataContext.Configuration.AutoDetectChangesEnabled = false;
            dataContext.Configuration.ValidateOnSaveEnabled = false;
        }


        public Repository<CashVoucher> CashVoucher
        {
            get
            {
                return _cashVoucher ?? (_cashVoucher = new Repository<CashVoucher>(dataContext));
            }
        }

        public Repository<PaymentVoucher> PaymentVoucher
        {
            get
            {
                return _paymentVoucher ?? (_paymentVoucher = new Repository<PaymentVoucher>(dataContext));
            }
        }

        public Repository<Customer> Customer
        {
            get
            {
                return _customer ?? (_customer = new Repository<Customer>(dataContext));
            }
        }

        public Repository<Supplier> Supplier
        {
            get
            {
                return _supplier ?? (_supplier = new Repository<Supplier>(dataContext));
            }
        }

        public Repository<Fish> Fish
        {
            get
            {
                return _fish ?? (_fish = new Repository<Fish>(dataContext));
            }
        }

        public Repository<Invoice> Invoice
        {
            get
            {
                return _invoice ?? (_invoice = new Repository<Invoice>(dataContext));
            }
        }

        public Repository<PurchaseInvoice> PurchaseInvoice
        {
            get
            {
                return _purchaseInvoice ?? (_purchaseInvoice = new Repository<PurchaseInvoice>(dataContext));
            }
        }

        public Repository<InvoiceItem> InvoiceItem
        {
            get
            {
                return _invoiceItem ?? (_invoiceItem = new Repository<InvoiceItem>(dataContext));
            }
        }

        public Repository<PurchaseInvoiceItem> PurchaseInvoiceItem
        {
            get
            {
                return _purchaseInvoiceItem ?? (_purchaseInvoiceItem = new Repository<PurchaseInvoiceItem>(dataContext));
            }
        }

        public Repository<User> User
        {
            get
            {
                return _user ?? (_user = new Repository<User>(dataContext));
            }
        }

        public void Commit()
        {
            dataContext.SaveChanges();
        }
    }
}
