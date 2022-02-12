using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using db.IRepositories;
using db.Models.BaseModels;
using Microsoft.EntityFrameworkCore;

namespace db.Repositories
{
    public class UsersRepository : IUsersRepository
    {
        private readonly PlanningContext _context;
        private readonly DbSet <User> _entities; 
        public UsersRepository(PlanningContext context){
            _context = context;
            _entities = context.Set<User>();
        }
        public async Task<bool> CreateAsync(User entity)
        {
            var str = 0;
            if (entity == null) {  
                throw new ArgumentNullException("entity is null");  
            }  
            _entities.Add(entity);  
            str = await _context.SaveChangesAsync();
            if(str > 0){
                return true;
            }
            else{
                return false;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            var str = 0;
            var entity = _entities.SingleOrDefault(s => s.Id == id);
            if (entity == null) {  
                throw new ArgumentNullException("entity");  
            }  
            _entities.Remove(entity);  
            str = await _context.SaveChangesAsync();
            if(str > 0){
                return true;
            }
            else{
                return false;
            }
        }

        public Task<IEnumerable<User>> GetAllAsync()
        {
            return Task.Run(() => _entities.AsEnumerable());
        }

        public Task<User> GetAsync(int id)
        {
            return Task.Run(() => _entities.SingleOrDefault(s => s.Id == id));
        }

        public async Task<bool> UpdateAsync(int id, User entity)
        {
           var str = 0;
            if (entity == null) {  
                throw new ArgumentNullException("entity is null");  
            }
            else{
                var user = await _entities.FirstOrDefaultAsync(x => x.Id == entity.Id);
                _context.Entry(user).CurrentValues.SetValues(entity);
                
                str = await _context.SaveChangesAsync();
                if(str > 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
        public async Task<User> CheckUserAsync(string login, string password)
        {
            var user = await _context.Users.FirstOrDefaultAsync(x => x.Login == login && x.Password == password);
            return user;
        }

        public async Task<bool> PasswordReset(int userId, string password, string newPassword)
        {
            var user = await GetAsync(userId);
            if(user != null){
                if(user.Password == password){
                    user.Password = newPassword;
                    var str = 0;

                    _context.Entry(user).CurrentValues.SetValues(user);
                    str = await _context.SaveChangesAsync();
                    if(str > 0){
                        return true;
                    }
                    else{
                        return false;
                    }
                }
            }
            
            return false;
        }
    }
}