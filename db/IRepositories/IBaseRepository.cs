using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using db.Models.BaseModels;

namespace db.IRepositories
{
    public interface IBaseRepository<TEntity> where TEntity : BaseEntity
    {
        Task<bool> CreateAsync(TEntity entity);
        Task<bool> DeleteAsync(int id);
        Task<TEntity> GetAsync(int id);
        Task<IEnumerable<TEntity>> GetAllAsync();
        Task<bool> UpdateAsync(int id, TEntity entity);
    }
}