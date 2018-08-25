
import * as _ from 'lodash';

export interface FixedWidthColumn {
   final: boolean;
   finish: number;
   name: string;
   start: number;
}


export function fixedColumnWidthParser<T = {[key: string]: string[]}> (columns: FixedWidthColumn[], line: string): T {
   return columns.reduce((row, column) => {
      row[column.name] =
         (column.final ? line.substr(column.start) : line.substring(column.start,  column.finish)).trim();
      return row;
   }, {} as any)
}

export function fixedColumnWidthHeaders (input: string): FixedWidthColumn[] {
   const columns: FixedWidthColumn[] = [];
   String(input)
      .replace(/\s(\S)/g, '£$1')
      .replace(/(\S+)(\s{2,}|$)/g, (all, name, spaces, start) => {
         columns.push({
            name: _.camelCase(name.replace(/£/, ' ')),
            start,
            finish: start + all.length,
            final: false
         });

         return '';
      });

   columns[columns.length - 1].final = true;
   return columns;
}
