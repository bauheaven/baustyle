import { Theme as StyledSystemTheme , TLengthStyledSystem as TLength} from 'styled-system';
import { SystemStyleObject } from '@styled-system/css';
import * as CSS from 'csstype';


type ObjectOrArray<T> = T[] | {[K: string] : T | ObjectOrArray<T>}
 


export type PropByModes<T> = ObjectOrArray<T> & {
    brand: T,
    ui: T,
    bg: T,
    modes?: {
        [k: string]: ObjectOrArray<T>
    }
}



export interface Theme extends Omit<StyledSystemTheme, 'colors' | 'shadows' | 'sizes' | 'radii'> {

    sizes: ObjectOrArray<CSS.HeightProperty<{}> | CSS.WidthProperty<{}>>
    radii: ObjectOrArray<CSS.BorderRadiusProperty<TLength>>;

    colors: PropByModes<CSS.ColorProperty>
    shadows?: PropByModes<CSS.BoxShadowProperty>
  

    forms?: Record<string, SystemStyleObject>;

    /** TODO: figure out proper API */
    animations: any;
    transitions: any;

}


