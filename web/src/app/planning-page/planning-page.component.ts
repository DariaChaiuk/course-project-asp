import { Component, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';
import { PlanVsStatus } from '../models/plan-vs-status';
import { Plan } from '../models/plan.inteface';
import { Status } from '../models/status.interface';
import { PlanService } from '../services/plan.service';
import { StatusService } from '../services/status.service';

@Component({
  selector: 'app-planning-page',
  templateUrl: './planning-page.component.html',
  styleUrls: ['./planning-page.component.css']
})
export class PlanningPageComponent implements OnInit {

  public newStatusForm = new FormGroup({
    newStatusName: new FormControl('')
  });

  public deleteStatusForm = new FormGroup({
    deleteStatusId: new FormControl('')
  });

  public searchPlanForm = new FormGroup({
    searchedPlan: new FormControl('')
  });


  public statuses: Status[] | undefined;

  constructor(
    private planService: PlanService,
    private statusService: StatusService
  ) { }
  plans: PlanVsStatus[] = [];
  allPlans: PlanVsStatus[] = [];
  selectedPlan: Plan | undefined;
  selectedStatus: Status | undefined;

  isVisible: boolean = false;
  isVisibleStatus: boolean = false;
  colors: string[] = [];

  ngOnInit(): void {
    this.refreshData();
  }

  searchPlan(){
    console.log(this.searchPlanForm.get("searchedPlan")?.value)
    this.plans = JSON.parse(JSON.stringify(this.allPlans));
    this.plans.forEach(element => {
      element.plans = element.plans.filter(x=>x.title.startsWith(this.searchPlanForm.get("searchedPlan")?.value))
    });
    this.plans = this.plans.filter(x =>{ return x.plans.length > 0})
  }

  plansForStatus(status: Status): PlanVsStatus | undefined {
    return this.plans.find(i => i.statusId === status.id);
  }

  onStatusChanged($event: Status, plan: Plan){
      plan.statusId = $event.id;
      this.planService.update(plan).subscribe(() => {
        this.refreshData();
      });
  }

  onPlanDelete(deletedPlan: Plan){
    this.planService.delete(deletedPlan.id).subscribe(() => {
      this.refreshData();
    })
  }

  addNewStatus($event: any) {
    console.log($event)
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.statusService.addStatus(1, {
        id: 0,
        statusName: this.newStatusForm.value.newStatusName,
        userId: +userId
      }).subscribe(() => this.refreshData());
    }
  }

  getColor(): string {
    const min = 0;
    const max = 255;
    const red = Math.floor(Math.random() * (max - min + 1)) + min;
    const green = Math.floor(Math.random() * (max - min + 1)) + min;
    const blue = Math.floor(Math.random() * (max - min + 1)) + min;
    return `rgb(${red}, ${green}, ${blue})`
  }

  refreshData(){
    console.log("refresh")
    const userId = localStorage.getItem('user_id');
    if (userId) {
      this.planService.getAllForUser(+userId)
        .subscribe(res => {
          this.plans = res;
          this.allPlans = JSON.parse(JSON.stringify(res));
        })
      this.statusService.getStatuses(+userId).subscribe(data => {
        this.colors = data.map(i => this.getColor())
        this.statuses = data;
      });
    }
  }

  deleteStatus(id: number) {
    let allPlansForDeletedStatus = this.plans.find(x => x.statusId === id);
    if(allPlansForDeletedStatus && allPlansForDeletedStatus?.plans.length > 0){
      if(window.confirm("This status has plans. Are you sure want to delete this status with all plans?")){
        this.statusService.delete(id).subscribe(() => this.refreshData());
      }
    }
    else{
      if(window.confirm("Are you sure want to delete this status?")){
        this.statusService.delete(id).subscribe(() => this.refreshData());
      }
    }
  }

  selectStatus(staus:Status){
    this.selectedStatus = staus;
    this.openStatusModal();
  }

  selectPlan(plan: Plan){
    this.selectedPlan = plan;
    this.openModal();
  }

  closeModal(){
    this.selectedPlan = undefined;
    this.isVisible = false;
  }

  closeModalStatus(){
    this.selectedStatus = undefined;
    this.isVisibleStatus = false;
  }

  openModal(){
    this.isVisible = true;
  }

  openStatusModal(){
    this.isVisibleStatus = true;
  }

  closeModalAndEdit($event: any){

    if(this.selectedPlan != undefined){
      this.planService.update($event).subscribe(res => {
        this.selectedPlan = undefined;
        this.refreshData();
      });
    }
    else{
      this.planService.create($event).subscribe(res => {
        this.refreshData();
      });
    }

    this.isVisible = false;
  }

  closeModalAndEditStatus($event: any){
    if(this.selectStatus != undefined){
      this.statusService.update($event).subscribe(res => {
        this.selectedStatus = undefined;
        this.refreshData();
      });
    }
    this.isVisibleStatus = false;
  }
}
