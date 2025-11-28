import { Pipe, PipeTransform } from '@angular/core';

// >166 Custom Pipe
@Pipe({
  name: 'temp',
  standalone: true,
})
export class TemperaturePipe implements PipeTransform {
  //   transform(value: any, ...args: any[]) {

  // ?167 Perform Custom Pipe
  //   transform(value: string | number) {

  // >168 Accepting Parameters in Custom Pipes
  transform(
    value: string | number | null,
    inputType: 'cel' | 'fah',
    outputType?: 'cel' | 'fah'
  ) {
    // ?169 Changing Pipe
    if (!value) {
      return value;
    }

    let val: number;
    if (typeof value === 'string') {
      val = parseFloat(value);
    } else {
      val = value;
    }

    // >168 Accepting Parameters in Custom Pipes
    let outputTemp: number;
    if (inputType === 'cel' && outputType === 'fah') {
      outputTemp = (val * 9) / 5 + 32;
    } else if (inputType === 'fah' && outputType === 'cel') {
      outputTemp = ((val - 32) * 5) / 9;
    } else {
      outputTemp = val;
    }

    // const outputTemp = (val * 9) / 5 + 32;
    // return value + ' - transformed';

    // ?167 Perform Custom Pipe
    // return `${outputTemp.toFixed(2)} °F`;

    // >168 Accepting Parameters in Custom Pipes
    let symbol: '°C' | '°F';
    if (!outputType) {
      symbol = inputType === 'cel' ? '°C' : '°F';
    } else {
      symbol = outputType === 'cel' ? '°C' : '°F';
    }
    return `${outputTemp.toFixed(2)} ${symbol}`;
  }
}
