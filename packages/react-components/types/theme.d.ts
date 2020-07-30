import { Theme as StyledSystemTheme } from 'styled-system';
import { SystemStyleObject } from '@styled-system/css';
import * as CSS from 'csstype';


type ObjectOrArray<T> = T[] | {[K: string] : T | ObjectOrArray<T>}
 


export type PropByModes<T> = ObjectOrArray<T> & {
    modes?: {
        [k: string]: ObjectOrArray<T>
    }
}



export interface Theme extends Omit<StyledSystemTheme, 'colors' | 'shadows'> {

    colors?: PropByModes<CSS.ColorProperty>,
    shadows?: PropByModes<CSS.BoxShadowProperty>,
  

    forms?: Record<string, SystemStyleObject>;

    /** TODO: figure out proper API */
    animations: any;
    transitions: any;

}


