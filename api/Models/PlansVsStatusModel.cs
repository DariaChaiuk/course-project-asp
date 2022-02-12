using System.Collections.Generic;
using db.Models.BaseModels;

namespace db.Models.ComplexModels
{
    public class PlansVsStatusModel
    {
        public int StatusId {get;set;}
        public string StatusName {get;set;}
        public IEnumerable<Plan> Plans {get;set;}
    }
}