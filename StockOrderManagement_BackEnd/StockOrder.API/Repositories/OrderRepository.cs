using Microsoft.Extensions.Options;
using MongoDB.Driver;
using StockOrder.API.Models;
using StockOrder.API.Settings;

namespace StockOrder.API.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly IMongoCollection<Order> _orders;

        public OrderRepository(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _orders = database.GetCollection<Order>("Orders");
        }

        public List<Order> GetAll() =>
            _orders.Find(_ => true).ToList();

        public Order Create(Order order)
        {
            _orders.InsertOne(order);
            return order;
        }

        public void Delete(string id) =>
            _orders.DeleteOne(o => o.Id == id);
    }
}
