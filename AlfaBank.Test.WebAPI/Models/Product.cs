using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Newtonsoft.Json;

namespace AlfaBank.Test.WebAPI.Models
{
    public class Product
    {
        [JsonProperty("part_number")]
        public int PartNumber { get; set; }

        [JsonProperty("name")]
        public string Name { get; set; }

        [JsonProperty("description")]
        public string Description { get; set; }

        [JsonProperty("supplier")]
        public string Suplier { get; set; }

        [JsonProperty("vendor")]
        public string Vendor { get; set; }

        [JsonProperty("vendor_part_number")]
        public int VendorPartNumber { get; set; }

        [JsonProperty("vendor_description")]
        public string VendorDescription { get; set; }

        [JsonProperty("price")]
        public decimal Price { get; set; }

        [JsonProperty("image")]
        public string Image { get; set; }
    }
}
