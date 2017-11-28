//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace KLDFishStallAccounts.Model.EDMX
{
    using System;
    using System.Collections.Generic;
    
    public partial class PurchaseInvoice
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public PurchaseInvoice()
        {
            this.PurchaseInvoiceItems = new HashSet<PurchaseInvoiceItem>();
        }
    
        public int ID { get; set; }
        public int FK_ID_Supplier { get; set; }
        public System.DateTime Date { get; set; }
        public double Discount { get; set; }
        public double Total { get; set; }
        public double Balance { get; set; }
    
        public virtual Supplier Supplier { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<PurchaseInvoiceItem> PurchaseInvoiceItems { get; set; }
    }
}
