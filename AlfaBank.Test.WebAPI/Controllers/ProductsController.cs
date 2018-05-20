using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AlfaBank.Test.WebAPI.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace AlfaBank.Test.WebAPI.Controllers
{
    [Produces("application/json")]
    [Route("api/[controller]")]
    public class ProductsController : Controller
    {
        private Data _data;

        public ProductsController(Data data)
        {
            _data = data;
        }

        [HttpGet]
        public IEnumerable<Product> Get()
        {
            return _data.Products.Values;
        }
    }
}