import { Component, OnInit } from '@angular/core';
import {RestApiService} from '../../../services/rest-api.service'
import { MatSnackBar} from '@angular/material/snack-bar'

@Component({
  selector: 'app-maneger-layers-state',
  templateUrl: './manegerlayerstate.component.html',
  styleUrls: ['./manegerlayerstate.component.css']
})
export class ManegerLayerStateComponent implements OnInit {

  fileName = ''; 

  constructor(public restApi: RestApiService, private snackBar : MatSnackBar) { }

  ngOnInit(): void {
  }

  onFileSelected(event:any):void{
    let formData = new FormData();
    let selectedFiles = event.target.files;
    console.log(selectedFiles.length)

    for(let i=0; i< selectedFiles.length; i++ )
    {
      let currentFileUpload:File = selectedFiles.item(i);
      console.log(currentFileUpload)
      formData.append('category','county')
      let fileExtension = currentFileUpload.name.split('.').pop();
      switch (fileExtension) {
        case 'dbf':
          formData.append('file_dbf',currentFileUpload);    
          break;
        case 'prj':   
          formData.append('file_prj',currentFileUpload);        
          break;
        case 'cpg':  
          console.log('+a+')
          formData.append('file_cpg',currentFileUpload);         
          break;
        case 'shp': 
          formData.append('file_shp',currentFileUpload);         
          break;
        case 'shx':  
          formData.append('file_shx',currentFileUpload);         
          break;          
      
        default:
          break;
      }      
    }  
    this.createFile(formData);

   /* let a = currentFileUpload.name.split('.').pop();
    console.log('a')
    console.log(a)
    console.log(currentFileUpload)
    formData.append('fileupload',currentFileUpload);
    console.log(JSON.stringify(formData))
    this.createFile(formData);*/
  }
  // onFileSelected(event: Event):void{
  //   //   const file:File = event.target.files[0];
  //   let selectedFiles:string[] = [];
  //   const element = event.currentTarget as HTMLInputElement
  //   let selFiles:FileList = <FileList>element.files;

  //   let fileList: FileList | null = element.files
  //   if (fileList){
  //     for (let fileL in fileList){
  //       let item: File = fileList[fileL];
  //       if(!selectedFiles.includes(item['name'])){
  //         selectedFiles.push(item.name);
  //       }
  //     }
  //   }
  //   console.log('event.target.files')
  //   this.uploadFiles(selectedFiles,selFiles)
  // //  let fileList: FileList | null = elementFiles.fil
  //  /* if (file){
  //     this.fileName = file.name;
  //     const formData = new FormData();
  //     //formData.append("file",null);  
  //     formData.append("fileupload",file);  
  //     console.log(formData)
  //     this.createFile(formData);
  //   }*/
  // }
  uploadFiles(selectedFiles:string[], selFiles:FileList):void{
    const formData = new FormData();
    console.log(selFiles)
    if (selectedFiles.length){
      if (selFiles){
        for (let fileL in selFiles){
          let item: File = selFiles[fileL];
          console.log('sasasasas')
          console.log(item)
          formData.append('files',selFiles[fileL])
          formData.append('category','state')
          console.log(JSON.stringify(formData))
        }
      }

      // for (let i=0; i < selectedFiles.length - 1; i++)
      // {
      //   console.log(selFiles.item(i))
      //   if (selFiles.item(i) != null){     
      //     formData.append('files',selFiles.item(i),selFiles[i].name)
      //   }
      // }
    }
   
  }

  createFile(formData:FormData):void{
    this.restApi.setUploadFile(formData).subscribe((data : {}) => {
      console.log('populate')
      console.log(data)
      this.snackBar.open(`Estados Cadastrados! }`,'Entendido',{duration: 8 * 1000});
    })
    
  }

}
