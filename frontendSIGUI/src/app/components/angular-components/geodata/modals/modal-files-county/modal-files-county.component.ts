import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl, NestedTreeControl } from '@angular/cdk/tree';
import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTreeFlatDataSource, MatTreeFlattener, MatTreeNestedDataSource } from '@angular/material/tree';
import { FileData } from 'src/app/models/file-data.model';
import { ManagerSession } from 'src/app/models/managerSession.model';
import { SectionFiles } from 'src/app/models/section.model';

import { RestApiService } from 'src/app/services/rest-api.service';
import { FileUploadsService } from '../service-file/file-uploads.service';

@Component({
  selector: 'app-modal-files-county',
  templateUrl: './modal-files-county.component.html',
  styleUrls: ['./modal-files-county.component.css']
})
export class ModalFilesCountyComponent {

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

    /*      let fileInformation : Section = {
        id : 1,
        name : currentFileUpload.name,
        updated: new Date('1/1/16'),

      } */
   
  constructor(public restApi: RestApiService, private snackBar : MatSnackBar,
    public dialogRef: MatDialogRef<ModalFilesCountyComponent>,
    public fileUploadsService :FileUploadsService ,    
    @Inject(MAT_DIALOG_DATA) public data: ManagerSession,
  ) {
      fileUploadsService.insertItem(this.TREE_DATA)
  }

  getFiles(section:SectionFiles){
    console.log(section);
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

    let filesSelect = new FileData('county');
    for(let i=0; i< selectedFiles.length; i++ )
    {
      let currentFileUpload:File = selectedFiles.item(i);
    //  console.log(currentFileUpload)      

      treeFiles[0].sub_brand.push({
        name: currentFileUpload.name,
        updated: new Date('1/1/16'),
        sub_brand: [],
      })     
     // console.log( 'this.TREE_DATA') 
    //  console.log( this.TREE_DATA[0]) 
      
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
        default:
          break;
      }      
    }  
    //console.log(filesSelect)
    //this.TREE_DATA = treeFiles;
    this.fileUploadsService.insertItem(treeFiles)
  //   this.updateTree(treeFiles);
    //this.dataSource.data = this.TREE_DATA;
    this.preparFiles(filesSelect)
    

  }

  preparFiles(files:FileData){
    let formData = new FormData();
    formData.append('category','county')
    formData.append('file_dbf',<File>files.file_dbf);  
    formData.append('file_prj',<File>files.file_prj);   
    formData.append('file_cpg',<File>files.file_cpg);   
    formData.append('file_shp',<File>files.file_shp);   
    formData.append('file_shx',<File>files.file_shx);    
    this.createFile(formData);
  }

    createFile(formData:FormData):void{
    this.restApi.setUploadFile(formData).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
      this.snackBar.open(`Estados Cadastrados! }`,'Entendido',{duration: 8 * 1000});
    })
    
  }

}
