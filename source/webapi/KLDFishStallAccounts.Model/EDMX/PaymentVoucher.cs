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
    
    public partial class PaymentVoucher
    {
        public int ID { get; set; }
        public int FK_ID_Supplier { get; set; }
        public System.DateTime Date { get; set; }
        public double Amount { get; set; }
        public string Remarks { get; set; }
    
        public virtual Supplier Supplier { get; set; }
    }
}
