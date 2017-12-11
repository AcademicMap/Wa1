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
    public class RelationsController : Controller
    {
        private MapModel db = new MapModel();

        // GET: Admin/Relations
        public ActionResult Index()
        {
            return View(db.Relation.ToList());
        }

        // GET: Admin/Relations/Details/5
        public ActionResult Details(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Relation relation = db.Relation.Find(id);
            if (relation == null)
            {
                return HttpNotFound();
            }
            return View(relation);
        }

        // GET: Admin/Relations/Create
        public ActionResult Create()
        {
            return View();
        }

        // POST: Admin/Relations/Create
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Create([Bind(Include = "SourceId,RelatedId,Rate")] Relation relation)
        {
            if (ModelState.IsValid)
            {
                db.Relation.Add(relation);
                db.SaveChanges();
                return RedirectToAction("Index");
            }

            return View(relation);
        }

        // GET: Admin/Relations/Edit/5
        public ActionResult Edit(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Relation relation = db.Relation.Find(id);
            if (relation == null)
            {
                return HttpNotFound();
            }
            return View(relation);
        }

        // POST: Admin/Relations/Edit/5
        // To protect from overposting attacks, please enable the specific properties you want to bind to, for 
        // more details see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public ActionResult Edit([Bind(Include = "SourceId,RelatedId,Rate")] Relation relation)
        {
            if (ModelState.IsValid)
            {
                db.Entry(relation).State = EntityState.Modified;
                db.SaveChanges();
                return RedirectToAction("Index");
            }
            return View(relation);
        }

        // GET: Admin/Relations/Delete/5
        public ActionResult Delete(int? id)
        {
            if (id == null)
            {
                return new HttpStatusCodeResult(HttpStatusCode.BadRequest);
            }
            Relation relation = db.Relation.Find(id);
            if (relation == null)
            {
                return HttpNotFound();
            }
            return View(relation);
        }

        // POST: Admin/Relations/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public ActionResult DeleteConfirmed(int id)
        {
            Relation relation = db.Relation.Find(id);
            db.Relation.Remove(relation);
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
