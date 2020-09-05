import { Pipe, PipeTransform } from '@angular/core';  
      
@Pipe({  
  name: 'tableFilter',  
  pure: false  
})  
export class TableFilterPipe implements PipeTransform {  
  
  transform(value: any[], searchText: string, prop?: any): any {  
    if (!value) {  
      return [];  
    }  
    if (!searchText || !prop) {  
      return value;  
    }  
    // const _searchText = searchText.toLowerCase(),  
    //   _isArr = Array.isArray(value),  
    //   _flag = _isArr && typeof value[0] === 'object' ? true : _isArr && typeof value[0] !== 'object' ? false : true;  
    
    return value.filter(ele => {  
      //let val = _flag ? ele[prop] : ele;  
      //return val.toString().toLowerCase().includes(_searchText);  
          const sid = ele.sid.toString().includes(searchText) 
          const fname = ele.first_name.toLowerCase().includes(searchText.toLowerCase());
          const lname = ele.last_name.toLowerCase().includes(searchText.toLowerCase());
          const email = ele.email.toLowerCase().includes(searchText.toLowerCase());
      return (sid + fname + lname + email);    
    });  
  
  }  
}  
