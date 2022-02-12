using System.Threading.Tasks;
using db.Models.BaseModels;

namespace db.IRepositories
{
    public interface IUsersRepository : IBaseRepository<User>
    {
        Task<User> CheckUserAsync(string login, string password);
        Task<bool> PasswordReset (int userId, string password, string newPassword);
    }
}