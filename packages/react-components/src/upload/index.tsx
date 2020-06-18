import * as React from 'react';
import {Button} from "../index"


export declare interface UploadFile {
    file: File
}

const preFetch = (filelist: FileList | null): UploadFile[] => filelist 
    ? Array.from(filelist).map(file => ({file})) 
    : []


const Empty:  React.FC<any> = () => <div>no files</div>
const Thumbs: React.FC<any> = ({files}:{files: UploadFile[]}) => {
    return <div>
        {files.map(({file}, i) => <div key={i}><img src={URL.createObjectURL(file)} width="100" /></div>)}
        </div>
}

export interface UploadProps  {
    blobsRegistry: (files: UploadFile[]) => void
    origin_files?: UploadFile[]
}

const Upload = ({blobsRegistry, origin_files}: UploadProps) => {
    const [files, setFiles] = React.useState<UploadFile[]>(origin_files ? origin_files : [])
    React.useEffect(() => blobsRegistry(files), [files])
 
    return (<div>
        <label htmlFor="upload_file_input"><Button><div>upload</div></Button></label>
        <input onChange={(e) => {
            setFiles(preFetch(e.target.files))
            } } name="file" id="upload_file_input" type="file" style={{display: `none`}} multiple />            

        <div>
            {files.length > 0 ? <Thumbs {...{files}} /> : <Empty />}
        </div>
    </div>)
}



export default Upload