using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Security;
using System.Globalization;
using System.Security.Claims;
using Newtonsoft.Json;
using System.Web.UI.WebControls;
using WebApplication1.Areas.Admin.Models;

namespace WebApplication1.Areas.Admin.Controllers
{
    public class UsersController : Controller
    {
        private MapModel db = new MapModel();

        [_AdminLoginControl]
        public ActionResult Login()
        {
            return View();
        }

        [HttpPost]
        [_AdminLoginControl]
        public string Login(AdminList input)
        {
            using (MapModel entity = new MapModel())
            {
                var user = entity.AdminList.Where(m => m.userName == input.userName).FirstOrDefault();

                if (user == null)
                    return "-1";
                else
                {
                    if (user.password.Equals(input.password))
                    {
                        FormsAuthentication.SetAuthCookie(user.userName, false);
                        Session["LoginID"] = user.id;
                        Session["Username"] = user.userName;
                        return user.id.ToString();
                    }
                    else
                    {
                        return "-1";
                    }
                    
                }
                    
            }
        }

        [_SessionControl]
        public ActionResult LogOut()
        {
            if (Request.IsAuthenticated)
            {
                FormsAuthentication.SignOut();
            }
            return RedirectToAction("Login", "Users");
        }
    }
}