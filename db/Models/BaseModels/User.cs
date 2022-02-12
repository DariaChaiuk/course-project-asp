using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace db.Models.BaseModels
{
    public class User : BaseEntity
    {
        [Required (ErrorMessage = ("Name required"))]
        public string Name {get;set;}
        [Required (ErrorMessage = ("Login required"))]
        public string Login {get;set;}
        [Required (ErrorMessage = ("Password required"))]
        public string Password {get;set;}
        public string IconUrl {get;set;}
        public IEnumerable<Plan> Plans {get;set;}
        public IEnumerable<Status> Statuses {get;set;}

    }
}