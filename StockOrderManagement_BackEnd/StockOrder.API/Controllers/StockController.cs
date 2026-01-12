using Microsoft.AspNetCore.Mvc;
using StockOrder.API.Models;
using StockOrder.API.Repositories;

namespace StockOrder.API.Controllers
{
    [ApiController]
    [Route("api/stocks")]
    public class StocksController : ControllerBase
    {
        private readonly StockRepository _stockRepo;

        public StocksController(StockRepository stockRepo)
        {
            _stockRepo = stockRepo;
        }

        [HttpGet]
        public IActionResult GetStocks()
        {
            return Ok(_stockRepo.GetAll());
        }

        [HttpPost]
        public IActionResult AddStock([FromBody] StockCreateRequest request)
        {
            var existing = _stockRepo.GetByName(request.Name);
            if (existing != null)
                return BadRequest("Stock already exists");

            var stock = new Stock
            {
                Name = request.Name,
                Qty = request.Qty,
                OrderedQty = 0
            };

            return Ok(_stockRepo.Create(stock));
        }


        [HttpDelete("{id}")]
        public IActionResult DeleteStock(string id)
        {
            var stock = _stockRepo.GetAll().FirstOrDefault(s => s.Id == id);

            if (stock == null)
                return NotFound();

            if (stock.OrderedQty > 0)
                return BadRequest("Cannot delete stock with active orders");

            _stockRepo.Delete(id);
            return Ok();
        }
    }
}
