using System.Threading.Tasks;
using api.Models;
using db.IRepositories;
using db.Models.BaseModels;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace api.Controllers
{
    [ApiController]
    [Authorize(AuthenticationSchemes = JwtBearerDefaults.AuthenticationScheme)]
    [Route("api/[controller]")]
    public class UsersController : ControllerBase
    {
         private const string ID = "{userID}";
        private readonly IUsersRepository _usersRepository;
        public UsersController(IUsersRepository usersRepository){
            _usersRepository = usersRepository;
        }
        [HttpPost]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> CreateAsync(User entity)
        {
            if (await _usersRepository.CreateAsync(entity)) return Ok();
            else return BadRequest("error on creating");
        }

        [HttpGet(ID)]
        [ProducesResponseType(typeof(User), StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status404NotFound)]
        public async Task<IActionResult> GetAsync(int userID)
        {
            User user = await _usersRepository.GetAsync(userID);
            if(user != null){
                return Ok(user);
            } 
            return NotFound("no data available");
        }

        [HttpPut(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> UpdateAsync(int userID, User entity)
        {
            if (await _usersRepository.UpdateAsync(userID, entity)) return Ok();
            else return BadRequest("error on updating");
        }
        
        [HttpPut("UserPasswordReset/{userID}")]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> PasswordReset(int userID, PasswordReset passwords)
        {
            if (await _usersRepository.PasswordReset(userID, passwords.Password, passwords.NewPassword)) return Ok();
            else return BadRequest("password reset error");
        }

        [HttpDelete(ID)]
        [ProducesResponseType(StatusCodes.Status200OK)]
        [ProducesResponseType(StatusCodes.Status400BadRequest)]
        public async Task<ActionResult> DeleteAsync(int userID)
        {
            if (await _usersRepository.DeleteAsync(userID)) return Ok();
            else return BadRequest("can't delete this entity");
        }
        
    }
}