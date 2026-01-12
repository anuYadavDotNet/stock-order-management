using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace StockOrder.API.Models
{
    public class Stock
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Name { get; set; }

        public int Qty { get; set; }

        public int OrderedQty { get; set; }
    }
}
