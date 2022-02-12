using System.Collections.Generic;
using System.Linq;
using db.Models.BaseModels;

namespace db
{
    public static class DbInitialize
    {
        public static void Init(PlanningContext context)
        {
            if(!context.Users.Any()){
                context.Users.AddRange(
                    new User{
                        Name = "User",
                        Login = "Login",
                        Password = "Password",
                        Plans = new List<Plan>()
                    }
                );
            }

            if(!context.Statuses.Any()){
                context.Statuses.AddRange (
                    new Status{
                        StatusName = "planned"
                    },
                    new Status{
                        StatusName = "in progress"
                    },
                    new Status{
                        StatusName = "done"
                    }                    
                );
            }

            context.SaveChanges();
        }
    }
}