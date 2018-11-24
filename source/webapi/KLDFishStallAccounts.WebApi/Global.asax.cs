using Castle.Windsor;
using KLDFishStallAccounts.WebApi.CastleDI;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Http.Dispatcher;
using System.Web.Mvc;
using System.Web.Optimization;
using System.Web.Routing;

namespace KLDFishStallAccounts.WebApi
{
    public class WebApiApplication : System.Web.HttpApplication
    {
        private IWindsorContainer container;

        public WebApiApplication()
        {
            this.container =
                new WindsorContainer().Install(new DependencyInstaller());
        }

        public override void Dispose()
        {
            this.container.Dispose();
            base.Dispose();
        }

        protected void Application_Start()
        {
            WebApiConfig.Register(GlobalConfiguration.Configuration);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);

            GlobalConfiguration.Configuration.Services.Replace(
               typeof(IHttpControllerActivator),
               new WindsorActivator(this.container));
        }
    }
}
