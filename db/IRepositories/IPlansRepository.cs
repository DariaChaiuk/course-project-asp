using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using db.Models.BaseModels;

namespace db.IRepositories
{
    public interface IPlansRepository : IBaseRepository<Plan>
    {
        Task<IEnumerable<Plan>> GetUserPlansAsync(int id);
    }
}