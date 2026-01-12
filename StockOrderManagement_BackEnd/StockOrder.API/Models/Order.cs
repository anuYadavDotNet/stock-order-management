using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace StockOrder.API.Models
{
    public class Order
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string? Id { get; set; }

        public string? Customer { get; set; }

        public string? Stock { get; set; }

        public int Qty { get; set; }
    }
}
