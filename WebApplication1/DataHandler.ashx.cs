using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApplication1
{
    /// <summary>
    /// Summary description for DataHandler
    /// </summary>
    public class DataHandler : IHttpHandler
    {
        string opr = string.Empty;
        
        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/x-json";
            context.Response.Write("Hello World");
            opr = context.Request.QueryString["opr"];
            
            switch(opr)
            {
                case "search":
                    context.Response.Write(Search(context));
                    break;
                
            }
        }

        public string Search(HttpContext context)
        {
            return "asd";
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }
    }
}