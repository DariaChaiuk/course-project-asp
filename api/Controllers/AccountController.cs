using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using api.Models;
using api.Config;
using db.IRepositories;
using db.Models.BaseModels;

namespace api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AccountController : ControllerBase
    {
        private readonly IUsersRepository _usersRepository;
        public AccountController(IUsersRepository usersRepository)
        {
            _usersRepository = usersRepository;
        }
        [HttpPost("Registration")]
        public async Task<IActionResult> Registration([FromBody] User user){

            var identity = await GetRegistrationIdentity(user);
            if (identity == null)
            {
                return BadRequest(new { error = "Same user is already exists" });
            }

            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                user_id = (await _usersRepository.CheckUserAsync(user.Login, user.Password)).Id
            };
            return new JsonResult(response);
        }

        [HttpPost("Login")]
        public async Task<IActionResult> Token([FromBody] TokenUser tokenUser)
        {
            var identity = await GetIdentity(tokenUser.Login, tokenUser.Password);
            if (identity == null)
            {
                return BadRequest(new { error = "Invalid login or password" });
            }

            var now = DateTime.Now;
            var jwt = new JwtSecurityToken(
                issuer: AuthOptions.ISSUER,
                audience: AuthOptions.AUDIENCE,
                notBefore: now,
                claims: identity.Claims,
                expires: now.Add(TimeSpan.FromMinutes(AuthOptions.LIFETIME)),
                signingCredentials: new Microsoft.IdentityModel.Tokens.SigningCredentials(AuthOptions.GetSymmetricSecurityKey(), SecurityAlgorithms.HmacSha256)
            );

            var encodedJwt = new JwtSecurityTokenHandler().WriteToken(jwt);
            var response = new
            {
                access_token = encodedJwt,
                username = identity.Name,
                user_id = (await _usersRepository.CheckUserAsync(tokenUser.Login, tokenUser.Password)).Id
            };
            return new JsonResult(response);

        }
        private async Task<ClaimsIdentity> GetRegistrationIdentity(User user)
        {
            var result = await _usersRepository.CheckUserAsync(user.Login, user.Password);

            if (result == null)
            {

                await _usersRepository.CreateAsync(user);
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, user.Login)
                };

                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, null);

                return claimsIdentity;
            }

            return null;
        }
        private async Task<ClaimsIdentity> GetIdentity(string login, string password)
        {

            var result = await _usersRepository.CheckUserAsync(login, password);

            if (result != null)
            {
                var claims = new List<Claim>
                {
                    new Claim(ClaimsIdentity.DefaultNameClaimType, login)
                };

                ClaimsIdentity claimsIdentity =
                    new ClaimsIdentity(claims, "Token", ClaimsIdentity.DefaultNameClaimType, null);

                return claimsIdentity;
            }

            return null;
        }
    }
}