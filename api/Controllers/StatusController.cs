using System.Collections.Generic;
using System.Threading.Tasks;
using db.IRepositories;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using db.Models.BaseModels;

namespace api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class StatusController : ControllerBase
    {
        private const string ID = "{statusID}";
        private readonly IStatusRepository _statusesRepository;
        public StatusController(IStatusRepository statusesRepository){
            _statusesRepository = statusesRepository;
        }
        [HttpPost("{userId}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateAsync(Status entity)
        {
            if (await _statusesRepository.CreateAsync(entity)) return Ok();
            else return BadRequest("error on creating");
        }

        [HttpGet(ID)]
        [ProducesResponseType(typeof(Plan), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAsync(int statusID)
        {
            Status plan = await _statusesRepository.GetAsync(statusID);
            if(plan != null){
                return Ok(plan);
            } 
            return NotFound("no data available");
        }

        [HttpGet ("AllStatuses")]
        [ProducesResponseType(typeof(IEnumerable<Plan>), StatusCodes.Status200OK)]
        public async Task<JsonResult> GetAllDataAsync()
        {
            IEnumerable<Status> plans = await _statusesRepository.GetAllAsync();
            return new JsonResult(plans);
        }

        [HttpPut(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateAsync(int statusID, Status entity)
        {
            if (await _statusesRepository.UpdateAsync(statusID, entity)) return Ok();
            else return BadRequest("error on updating");
        }
        
        [HttpDelete(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteAsync(int statusID)
        {
            if (await _statusesRepository.DeleteAsync(statusID)) return Ok();
            else return BadRequest("can't delete this entity");
        }

        [HttpGet ("UserStatuses/{userID}")]
        [ProducesResponseType(typeof(IEnumerable<Status>), StatusCodes.Status200OK)]
        public async Task<JsonResult> GetUserPlans(int userID)
        {
            IEnumerable<Status> statuses = await _statusesRepository.GetAllAsync(userID);
            return new JsonResult(statuses);
        }
    }
}