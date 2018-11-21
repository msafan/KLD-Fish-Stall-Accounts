using System.Web;
using System.Web.Mvc;

namespace KLD_Fish_Stall_Accounts
{
    public class FilterConfig
    {
        public static void RegisterGlobalFilters(GlobalFilterCollection filters)
        {
            filters.Add(new HandleErrorAttribute());
        }
    }
}
