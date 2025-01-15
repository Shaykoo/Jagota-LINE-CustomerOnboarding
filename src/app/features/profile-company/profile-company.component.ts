import { Component, OnInit, OnDestroy, Renderer2 } from '@angular/core';
import { Location } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '../../confirmation-dialog/confirmation-dialog.component';

@Component({
  selector: 'app-profile-company',
  templateUrl: './profile-company.component.html',
  styleUrls: ['./profile-company.component.scss']
})
export class ProfileCompanyComponent implements OnInit, OnDestroy {

  constructor(private renderer: Renderer2,
              private location: Location, private dialog: MatDialog) { }

  ngOnInit() {
    this.renderer.setStyle(document.body, 'background-color', 'white');
  }

  ngOnDestroy() {
    this.renderer.removeStyle(document.body, 'background-color');
  }

  onDeleteProfile() {
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log('Account deletion confirmed');
      } else {
        console.log('Account deletion canceled');
      }
    });
  }

  goBack(){
    this.location.back(); 
  }

}
