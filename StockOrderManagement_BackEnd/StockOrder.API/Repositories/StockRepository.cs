using Microsoft.Extensions.Options;
using MongoDB.Driver;
using StockOrder.API.Models;
using StockOrder.API.Settings;

namespace StockOrder.API.Repositories
{
    public class StockRepository : IStockRepository
    {
        private readonly IMongoCollection<Stock> _stocks;

        public StockRepository(IOptions<MongoDBSettings> settings)
        {
            var client = new MongoClient(settings.Value.ConnectionString);
            var database = client.GetDatabase(settings.Value.DatabaseName);
            _stocks = database.GetCollection<Stock>("Stocks");
        }

        public List<Stock> GetAll() =>
            _stocks.Find(_ => true).ToList();

        public Stock GetByName(string name) =>
            _stocks.Find(s => s.Name == name).FirstOrDefault();

        public Stock Create(Stock stock)
        {
            _stocks.InsertOne(stock);
            return stock;
        }

        public void Update(string id, Stock stock) =>
            _stocks.ReplaceOne(s => s.Id == id, stock);

        public void Delete(string id) =>
            _stocks.DeleteOne(s => s.Id == id);
    }
}
