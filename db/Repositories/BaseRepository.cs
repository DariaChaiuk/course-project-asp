using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using db.IRepositories;
using db.Models.BaseModels;
using Microsoft.EntityFrameworkCore;

namespace db.Repositories
{
    public class BaseRepository<TEntity> : IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        private readonly PlanningContext _context;
        private readonly DbSet <TEntity> _entities; 
        public BaseRepository(PlanningContext context){
            _context = context;
            _entities = context.Set<TEntity>();
        }

        public async Task<bool> CreateAsync(TEntity entity)
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

        public Task<IEnumerable<TEntity>> GetAllAsync()
        {
            return Task.Run(() => _entities.AsEnumerable());
        }

        public Task<TEntity> GetAsync(int id)
        {
            return Task.Run(() => _entities.SingleOrDefault(s => s.Id == id));
        }

        public async Task<bool> UpdateAsync(int id, TEntity entity)
        {
            var str = 0;
            if (entity == null) {  
                throw new ArgumentNullException("entity is null");  
            }  
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