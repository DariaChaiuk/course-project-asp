namespace db.Models.BaseModels
{
    public class Status : BaseEntity
    {
        public int UserId {get;set;}
        public User User {get;set;}
        public string StatusName {get;set;}
    }
}