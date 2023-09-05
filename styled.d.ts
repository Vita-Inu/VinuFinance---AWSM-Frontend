// import original module declarations
import 'styled-components';


// and extend them!
declare module 'styled-components' {
    export interface DefaultTheme {
        colors: {
            violet: string
            white: string
            black: string
            pink: string
            grey: string
            darkGrey: string
        }
    }
}