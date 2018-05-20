using System;
using System.Collections.Generic;
using System.Net;
using Newtonsoft.Json.Linq;

namespace AlfaBank.Test.WebAPI.Models
{
    public class Data
    {
        public Dictionary<int, Product> Products;

        public Data(string url)
        {
            Products = new Dictionary<int, Product>();

            using (WebClient client = new WebClient())
            {
                while (true)
                {
                    var json = client.DownloadString(url);
                    dynamic data = JObject.Parse(json);

                    foreach (JObject prod in data.products)
                    {
                        var p = prod.ToObject<Product>();
                        Products.TryAdd(p.PartNumber, p);
                    }

                    if (data.next != null)
                        url = data.next.ToString();
                    else
                        break;
                }
            }
        }
        
    }
}
