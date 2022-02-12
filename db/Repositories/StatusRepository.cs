using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using db.IRepositories;
using db.Models.BaseModels;
using Microsoft.EntityFrameworkCore;

namespace db.Repositories
{
    public class StatusRepository: IStatusRepository
    {
        private readonly PlanningContext _context;
        private readonly DbSet <Status> _entities; 

        public StatusRepository(PlanningContext context){
            _context = context;
            _entities = context.Set<Status>();
        }

        public async Task<bool> CreateAsync(Status entity)
        {
            var str = 0;
            if (entity == null) {  
                throw new ArgumentNullException("entity is null");  
            }  
            await _entities.AddAsync(entity);  
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

        public Task<IEnumerable<Status>> GetAllAsync()
        {
            return Task.Run(() => _entities.AsEnumerable());
        }

        public Task<IEnumerable<Status>> GetAllAsync(int userId)
        {
            return Task.Run(() => _entities.Where((x) => x.UserId == userId).AsEnumerable());
        }

        public Task<Status> GetAsync(int id)
        {
            return Task.Run(() => _entities.SingleOrDefault(s => s.Id == id));
        }

        public async Task<bool> UpdateAsync(int id, Status entity)
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