import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'highlight',
})
export class SwagHighlightPipe implements PipeTransform {

  transform(text: string, search): string {
    
      try {
          if (text && search ) {
              text = text.toString(); // sometimes comes in as number 
              search = search.trim();
              if (search.length > 0) {
                  let pattern = search.trim().replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
                  pattern = pattern.split(' ').filter((t) => {
                      return t.length > 0;
                  }).join('|');
                  let regex = new RegExp(pattern, 'gi');
                  text = text.replace(regex, (match) => `<span class="bg-danger">${match}</span>`);
              }
          }
      }
      
      catch (exception) {
          console.error('error in highlight:', exception);
      }
      return text;
      
  }

}
