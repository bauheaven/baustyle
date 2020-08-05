
const glob = require('glob')
const fs = require('fs')
const path = require('path')



const svgRegExp = /<svg\s*([^>]*)>(.*?)<\/svg>/
const pathRegExp = /<path\s*([^>]*)\/>/g
const paramsRegExp = /(\w+)="([^"]*)"/g

const reactComponent = svg => {

    const [_, svgProps, pathes] = svg.match(svgRegExp)
    
    const pathesProps = [...pathes.matchAll(pathRegExp)]
        .map(([_, m, ]) => [...m.matchAll(paramsRegExp)]
        .reduce((params, [_, key, value, ]) => ({...params, [key]: value}), {}))
        
    const reactPathes = pathesProps
        .map(p => !Object.keys(p).includes('fill') ? {...p, fill: "currentcolor"} : p)
        .map(p => Object.keys(p).map(key => `${key}="${p[key]}"`))
        .map(p => `<path ${p.join(' ')} />`)
        .join('')

    const reactSVG = `<svg ${svgProps} ref={svgRef} {...props}>${reactPathes}</svg>`

    return `
import React, { forwardRef, SVGProps } from 'react';
    
export default forwardRef<SVGSVGElement, SVGProps<SVGSVGElement>>((props, svgRef) => ${reactSVG})
`
}


const indexExports = (names) => {
    
    const _import = names.map(name => `import ${name} from './${name}'`).join(`\n`)

    return `${_import}

export type SVGIcon = React.ForwardRefExoticComponent<
    React.PropsWithoutRef<React.SVGProps<SVGSVGElement>> & React.RefAttributes<SVGSVGElement>
>
  
export const Icon = {
${names.join(`,\n`)}
}
`

}


glob(`${__dirname}/src/icons/*.svg`, {}, (err, files) => {

    if(err) throw new Error(err)

    const promises = files.map(file => new Promise((resolve, reject) => fs.readFile(file, (err, data) => {
        
        if(err) return reject(err)
                
        const name = path.basename(file, '.svg').replace(/^\w/, (c) => c.toUpperCase())
        
        const implementation = reactComponent(`${data}`)

        fs.writeFile(`${path.dirname(file)}/${name}.tsx`, implementation, (err, _) => {

                if(err) reject(err)

                resolve(name)

                
        })

    })))

    Promise.all(promises).then((icons) => {
        
        fs.writeFile(`${__dirname}/src/icons/index.tsx`, indexExports(icons), (err, data) => {
            console.log('error', err)
            console.log('data', data)
    
        })
        
    })



})








