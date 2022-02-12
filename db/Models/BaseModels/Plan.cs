using System;
using System.ComponentModel.DataAnnotations;

namespace db.Models.BaseModels
{
    public class Plan : BaseEntity
    {
        [Required (ErrorMessage = "Title required")]
        public string Title {get;set;}
        public string Description {get;set;}
        public DateTime CreatedDate {get;set;} = DateTime.Now;
        [Range (1, int.MaxValue, ErrorMessage = "Status required")]
        public int StatusId {get;set;}
        public Status Status {get;set;}
        public int UserId {get;set;}
        public User User {get;set;}

    }
}