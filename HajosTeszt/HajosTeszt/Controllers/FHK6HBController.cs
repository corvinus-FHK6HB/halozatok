using HajosTeszt.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/FHK6HB")]
    [ApiController]
    public class FHK6HBController : ControllerBase
    {
        MárkaContext context = new MárkaContext();

        //tábla rekordjainak számának megjelenítése
        [HttpGet("count")]
        public int ItemsCount()
        {
            return context.Márkas.Count();
        }

        //tábla teljes tartalmának listázása
        [HttpGet("all")]
        public IEnumerable<Márka> Items()
        {
            return context.Márkas.ToList();
        }

        //rekord lekérdezése kulcs alapján
        [HttpGet("{id}")]
        public ActionResult M2(int id)
        {
            var márka = (from x in context.Márkas
                          where x.Id == id
                          select x).FirstOrDefault();
            if (márka == null) return BadRequest("Nincs ilyen márka az adatbázisban");

            return new JsonResult(márka);

        }

        //rekord törlésére kulcs alapján
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            var törlendő = (from x in context.Márkas
                                where x.Id == id
                                select x).FirstOrDefault();
            context.Remove(törlendő);
            context.SaveChanges();
        }
        //új rekord rögzítése
        [HttpPost]
        public void Post([FromBody] Márka adat)
        {
            context.Márkas.Add(adat);
            context.SaveChanges();
        }  
    }
}
