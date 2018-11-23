using Castle.MicroKernel.Registration;
using Castle.MicroKernel.SubSystems.Configuration;
using Castle.Windsor;
using KLDFishStallAccounts.Model;
using KLDFishStallAccounts.Service.Contracts;
using KLDFishStallAccounts.Service.Services;
using System.Web.Http.Controllers;

namespace KLDFishStallAccounts.WebApi.CastleDI
{
    public class DependencyInstaller : IWindsorInstaller
    {
        public void Install(IWindsorContainer container, IConfigurationStore store)
        {
            container.Register(
                Component.For<IUnitOfWork>().ImplementedBy<UnitOfWork>().LifeStyle.PerWebRequest,

                //Component.For<IOAuthAuthorizationServerProvider>()
                //    .ImplementedBy<SBSAuthorizationServerProvider>()
                //    .LifeStyle.PerWebRequest,

                //Component.For<IAuthenticationTokenProvider>()
                //    .ImplementedBy<SBSRefreshTokenProvider>()
                //    .LifeStyle.PerWebRequest,

                Classes.FromThisAssembly().BasedOn<IHttpController>().LifestyleTransient(),

                Component.For<ICustomer>().ImplementedBy<CustomerService>().LifeStyle.PerWebRequest,
                Component.For<IFish>().ImplementedBy<FishService>().LifeStyle.PerWebRequest,
                Component.For<IInvoice>().ImplementedBy<InvoiceService>().LifeStyle.PerWebRequest,
                Component.For<IUser>().ImplementedBy<UserService>().LifeStyle.PerWebRequest
            );
        }
    }
}