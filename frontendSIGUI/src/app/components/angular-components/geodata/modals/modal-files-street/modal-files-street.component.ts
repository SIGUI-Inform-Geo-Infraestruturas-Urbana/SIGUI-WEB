import { HttpErrorResponse } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { FileData } from 'src/app/models/file-data.model';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { SectionFiles } from 'src/app/models/section.model';
import { ShapefilesRepositoryService } from 'src/app/repositorys/shapefiles-repository.service';
import { FileUploadsService } from '../service-file/file-uploads.service';

@Component({
  selector: 'app-modal-files-street',
  templateUrl: './modal-files-street.component.html',
  styleUrls: ['./modal-files-street.component.css']
})
export class ModalFilesStreetComponent{

  TREE_DATA: SectionFiles[] = [
    {      
      name: "Arquivos Selecionados",
      updated: new Date('1/1/16'),
      sub_brand: [{      
        name: "...",
        updated: new Date(),
        sub_brand: [],
      }],
    }
  ];

  folders: SectionFiles[] = [
    {
      name: 'Photos',
      updated: new Date('1/1/16'),
      sub_brand: [],
    },
    {
      name: 'Recipes',
      updated: new Date('1/17/16'),
      sub_brand: [],
    },
    {
      name: 'Work',
      updated: new Date('1/28/16'),
      sub_brand: [],
    },
  ];

  constructor(public restApi: ShapefilesRepositoryService, private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<ModalFilesStreetComponent>,
    public fileUploadsService :FileUploadsService ,    
    @Inject(MAT_DIALOG_DATA) public data: ManagerSession,
  ) {
      fileUploadsService.insertItem(this.TREE_DATA)
  }

 

  onNoClick(): void {
    this.dialogRef.close();
  }  

  onFileSelected(event:any):void{
    let treeFiles = this.TREE_DATA;
    let selectedFiles = event.target.files;
   // console.log(selectedFiles.length)
    
    treeFiles[0].sub_brand.splice(0);
    treeFiles[0].sub_brand = [];

    let filesSelect = new FileData('street');
    for(let i=0; i< selectedFiles.length; i++ )
    {
      let currentFileUpload:File = selectedFiles.item(i);
    //  console.log(currentFileUpload)      

      treeFiles[0].sub_brand.push({
        name: currentFileUpload.name,
        updated: new Date('1/1/16'),
        sub_brand: [],
      })
      
      let fileExtension = currentFileUpload.name.split('.').pop();
      switch (fileExtension) {
        case 'dbf':       
          filesSelect.file_dbf = currentFileUpload;
          break;
        case 'prj':   
          filesSelect.file_prj = currentFileUpload;   
          break;
        case 'cpg':  
          filesSelect.file_cpg = currentFileUpload;         
          break;
        case 'shp':           
          filesSelect.file_shp = currentFileUpload;        
          break;
        case 'shx':  
          filesSelect.file_shx = currentFileUpload;          
          break;   
        case 'sbn':  
          filesSelect.file_sbn = currentFileUpload;          
          break;  
        case 'sbx':  
          filesSelect.file_sbx = currentFileUpload;          
          break;    
        default:
          break;
      }   
     }  

    this.fileUploadsService.insertItem(treeFiles)
    this.preparFiles(filesSelect)    

  }

  preparFiles(files:FileData){
    let formData = new FormData();
    formData.append('category','street')
    formData.append('file_dbf',<File>files.file_dbf);  
    formData.append('file_prj',<File>files.file_prj);   
    formData.append('file_cpg',<File>files.file_cpg);   //<File>files.file_cpg
    formData.append('file_shp',<File>files.file_shp);   
    formData.append('file_shx',<File>files.file_shx);  
    formData.append('file_sbn',<File>files.file_sbn);   
    formData.append('file_sbx',<File>files.file_sbx);   
    this.createFile(formData);
  }

  createFile(formData:FormData):void{
    console.log('popu')
    console.log(formData)

    this.restApi.postData('',formData).subscribe({
      next: (cities : FileData) => {
        console.log(cities);
      //   this.initializeForm(cities);    
      //   this.snackBar.open(`Cidade Cadastrada! ID { ${cities.id} }`,'Entendido',{duration: 8 * 1000});
      //   //this.countyRepositoryService.populateServiceViewMap(beers)
       },
      error: (err:HttpErrorResponse) => {
        console.log('TRATARr');
        console.log(err);
        // this.openSnackBar(err.statusText);
      
      },
    
    })
  }


}