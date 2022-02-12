using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using db.IRepositories;
using db.Models.BaseModels;
using Microsoft.EntityFrameworkCore;

namespace db.Repositories
{
    public class PlansRepository : IPlansRepository
    {
        private readonly PlanningContext _context;
        private readonly DbSet <Plan> _entities; 
        public PlansRepository(PlanningContext context){
            _context = context;
            _entities = context.Set<Plan>();
        }
        public async Task<bool> CreateAsync(Plan entity)
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

        public Task<IEnumerable<Plan>> GetAllAsync()
        {
            return Task.Run(() => _entities.AsEnumerable());
        }

        public Task<Plan> GetAsync(int id)
        {
            return Task.Run(() => _entities.SingleOrDefault(s => s.Id == id));
        }

        public Task<IEnumerable<Plan>> GetUserPlansAsync(int id)
        {
            return Task.Run(() => _entities.Where(x => x.User.Id == id).Include("Status").AsEnumerable());
        }

        public async Task<bool> UpdateAsync(int id, Plan entity)
        {
            var str = 0;
            if (entity == null) {  
                throw new ArgumentNullException("entity is null");  
            }
            else{
                var plan = await _entities.FirstOrDefaultAsync(x => x.Id == entity.Id);
                _context.Entry(plan).CurrentValues.SetValues(entity);
                
                str = await _context.SaveChangesAsync();
                if(str > 0){
                    return true;
                }
                else{
                    return false;
                }
            }
        }
    }
}