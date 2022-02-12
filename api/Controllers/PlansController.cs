using System.Collections.Generic;
using System.Threading.Tasks;
using db.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using db.Models.BaseModels;
using System.Linq;
using db.Models.ComplexModels;

namespace api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class PlansController : ControllerBase
    {
        private const string ID = "{planID}";
        private readonly IPlansRepository _plansRepository;
        public PlansController(IPlansRepository plansRepository){
            _plansRepository = plansRepository;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateAsync(Plan entity)
        {
            if (await _plansRepository.CreateAsync(entity)) return Ok();
            else return BadRequest("error on creating");
        }

        [HttpGet(ID)]
        [ProducesResponseType(typeof(Plan), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAsync(int planID)
        {
            Plan plan = await _plansRepository.GetAsync(planID);
            if(plan != null){
                return Ok(plan);
            } 
            return NotFound("no data available");
        }

        [HttpGet ("AllPlans")]
        [ProducesResponseType(typeof(IEnumerable<Plan>), StatusCodes.Status200OK)]
        public async Task<JsonResult> GetAllDataAsync()
        {
            IEnumerable<Plan> plans = await _plansRepository.GetAllAsync();
            return new JsonResult(plans);
        }

        [HttpGet ("UserPlans/{userID}")]
        [ProducesResponseType(typeof(IEnumerable<Plan>), StatusCodes.Status200OK)]
        public async Task<JsonResult> GetUserPlans(int userID)
        {
            IEnumerable<Plan> plans = await _plansRepository.GetUserPlansAsync(userID);
            var plansVsStatuses = new List<PlansVsStatusModel>();
            var keys = plans.GroupBy(x => x.StatusId).Select(x =>x.Key).ToList();
            keys.ForEach(x => plansVsStatuses.Add(new PlansVsStatusModel(){
                StatusId = x,
                StatusName = plans.Where(plan => plan.StatusId == x).Select(x => x.Status).FirstOrDefault().StatusName,
                Plans = plans.Where(plan => plan.StatusId == x)
            }));
            return new JsonResult(plansVsStatuses);
        }

        [HttpPut(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateAsync(int planID, Plan entity)
        {
            if (await _plansRepository.UpdateAsync(planID, entity)) return Ok();
            else return BadRequest("error on updating");
        }
        
        [HttpDelete(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteAsync(int planID)
        {
            if (await _plansRepository.DeleteAsync(planID)) return Ok();
            else return BadRequest("can't delete this entity");
        }

    }
}