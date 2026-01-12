using StockOrder.API.Models;

namespace StockOrder.API.Repositories
{
    public interface IStockRepository
    {
        List<Stock> GetAll();
        Stock GetByName(string name);
        Stock Create(Stock stock);
        void Update(string id, Stock stock);
        void Delete(string id);
    }
}
