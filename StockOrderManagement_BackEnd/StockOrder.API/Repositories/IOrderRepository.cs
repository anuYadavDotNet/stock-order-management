using StockOrder.API.Models;
using System;

namespace StockOrder.API.Repositories
{
    public interface IOrderRepository
    {
        List<Order> GetAll();
        Order Create(Order order);
        void Delete(string id);
    }
}
