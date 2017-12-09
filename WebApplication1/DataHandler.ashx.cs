using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using Newtonsoft.Json;

namespace WebApplication1
{
    /// <summary>
    /// Summary description for DataHandler
    /// </summary>
    public class DataHandler : IHttpHandler
    {
        string opr = string.Empty;

        MapModel db = new MapModel();

        public void ProcessRequest(HttpContext context)
        {
            context.Response.ContentType = "application/x-json";
           
            opr = context.Request.QueryString["opr"];

            switch (opr)
            {
                case "search":
                    context.Response.Write(Search(context.Request.Params["Name"]));
                    break;
                
            }
        }

        public string Search(string str)
        {
            AcademicPaper paper = db.AcademicPaper.FirstOrDefault(m => m.Name == str);

            

            if(paper == null)
            {
                return "Err";
            }

            IEnumerable<Relation> rels = db.Relation.ToList().Where(m => m.SourceId == paper.PaperId);
            //try
            //{
            //    rels = db.Relation.ToList().Where(m => m.SourceId == paper.PaperId);
            //}
            //catch
            //{
            //    return "Err";
            //}

            AjaxResponseModel response = new AjaxResponseModel(rels);
            return JsonConvert.SerializeObject(response);
        }

        public bool IsReusable
        {
            get
            {
                return false;
            }
        }


        public abstract class AjaxResponseBaseModel
        {
            public readonly bool IsSuccess;
            public AjaxResponseBaseModel(bool success)
            {
                IsSuccess = success;
            }
        }
        public class AjaxResponseModel : AjaxResponseBaseModel
        {
            public readonly object Value;
            public AjaxResponseModel(object result)
                : base(true)
            {
                Value = result;
            }
        }
        public class RelObj
        {
            string Source;
            string Related;
            int Rate;
        }
    }

}