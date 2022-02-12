using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using db.Models.BaseModels;

namespace db.IRepositories
{
    public interface IStatusRepository : IBaseRepository<Status>
    {
        Task<IEnumerable<Status>> GetAllAsync(int userId);
    }


}