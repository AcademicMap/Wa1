using System;
using System.Collections.Generic;
using System.Data;
using System.Data.Entity;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Mvc;
using WebApplication1;

namespace WebApplication1.Areas.Admin.Controllers
{
    public class AcademicPapersController : Controller
    {
        private MapModel db = new MapModel();

        // GET: Admin/AcademicPapers
        public ActionResult Index()
        {
            return View(db.AcademicPaper.ToList());
        }

        // GET: Admin/AcademicPapers/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AcademicPaper academicPaper = db.AcademicPaper.Find(id);
            if (academicPaper == null)
            {
                return HttpNotFound();
            }
            return View(academicPaper);
        }

        // GET: Admin/AcademicPapers/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/AcademicPapers/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "PaperId,Name,Writer,Link,PublishYear")] AcademicPaper academicPaper)
        {
            if (ModelState.IsValid)
            {
                db.AcademicPaper.Add(academicPaper);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(academicPaper);
        }

        // GET: Admin/AcademicPapers/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AcademicPaper academicPaper = db.AcademicPaper.Find(id);
            if (academicPaper == null)
            {
                return HttpNotFound();
            }
            return View(academicPaper);
        }

        // POST: Admin/AcademicPapers/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "PaperId,Name,Writer,Link,PublishYear")] AcademicPaper academicPaper)
        {
            if (ModelState.IsValid)
            {
                db.Entry(academicPaper).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(academicPaper);
        }

        // GET: Admin/AcademicPapers/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            AcademicPaper academicPaper = db.AcademicPaper.Find(id);
            if (academicPaper == null)
            {
                return HttpNotFound();
            }
            return View(academicPaper);
        }

        // POST: Admin/AcademicPapers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            AcademicPaper academicPaper = db.AcademicPaper.Find(id);
            db.AcademicPaper.Remove(academicPaper);
            db.SaveChanges();
            return RedirectToAction("Index");
        }

        protected override void Dispose(bool disposing)
        {
            if (disposing)
            {
                db.Dispose();
            }
            base.Dispose(disposing);
        }
    }
}
