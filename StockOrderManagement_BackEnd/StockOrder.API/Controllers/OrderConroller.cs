using Microsoft.AspNetCore.Mvc;
using StockOrder.API.Models;
using StockOrder.API.Repositories;

namespace StockOrder.API.Controllers
{
    [ApiController]
    [Route("api/orders")]
    public class OrdersController : ControllerBase
    {
        private readonly OrderRepository _orderRepo;
        private readonly StockRepository _stockRepo;

        public OrdersController(OrderRepository orderRepo, StockRepository stockRepo)
        {
            _orderRepo = orderRepo;
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public IActionResult GetOrders()
        {
            return Ok(_orderRepo.GetAll());
        }

        [HttpPost]
        public IActionResult AddOrder(Order order)
        {
            var stock = _stockRepo.GetByName(order.Stock);

            if (stock == null)
                return BadRequest("Stock not found");

            if (order.Qty <= 0 || order.Qty > stock.Qty)
                return BadRequest("Invalid order quantity");

            stock.Qty -= order.Qty;
            stock.OrderedQty += order.Qty;
            _stockRepo.Update(stock.Id, stock);
            return Ok(_orderRepo.Create(order));
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteOrder(string id)
        {
            var order = _orderRepo.GetAll().FirstOrDefault(o => o.Id == id);
            if (order == null)
                return NotFound();

            var stock = _stockRepo.GetByName(order.Stock);
            stock.Qty += order.Qty;
            stock.OrderedQty -= order.Qty;
            _stockRepo.Update(stock.Id, stock);

            _orderRepo.Delete(id);
            return Ok();
        }
    }
}
