using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Http.Filters;

namespace KLDFishStallAccounts.WebApi.Attributes
{
    public class ExceptionHandler : ExceptionFilterAttribute
    {
        public override void OnException(HttpActionExecutedContext actionExecutedContext)
        {
            actionExecutedContext.Response = actionExecutedContext.Request.
                CreateErrorResponse(HttpStatusCode.InternalServerError,
                new HttpError(actionExecutedContext.Exception, true));
        }
    }
}