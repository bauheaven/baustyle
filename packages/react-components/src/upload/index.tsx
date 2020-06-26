import * as React from 'react';
import {Button} from "../index"


export declare interface UploadFile {
    name: string,
    file: File
}

const preFetch = (filelist: FileList | null): FileImageUrl[] => filelist 
    ? Array.from(filelist).map(file => ({name: escape(file.name), url: URL.createObjectURL(file), file})) 
    : []


const Empty:  React.FC<any> = () => <div>no files</div>
const Thumbs: React.FC<any> = ({uploaded_image_urls, removeFile}:{uploaded_image_urls: {url: string, name: string}[], removeFile: (name: string) => void}) => {


    return <div>
        {uploaded_image_urls.map((image, i) => <div onClick={_ => removeFile(image.name)} key={i}><img src={image.url} width="100" /></div>)}
        </div>
}

export declare interface FileImageUrl {
    url: string, 
    name: string, 
    file?: File
}

export interface UploadProps  {
    uploadRegistry: (images: FileImageUrl[]) => void
    image_urls?: FileImageUrl[]
}

const Upload = React.memo(({uploadRegistry, image_urls}: UploadProps) => {
    
    const [uploaded_image_urls, setUploadedImageUrls] = React.useState<FileImageUrl[]>(image_urls ? image_urls : [])
    
    React.useEffect(() => {
        uploadRegistry(uploaded_image_urls)
    }, [uploaded_image_urls])

    const removeFile = (name: string) => {
        setUploadedImageUrls(uploaded_image_urls.filter((image) => image.name !== name))
    }
        

    const uploadFiles = (filelist: FileList | null) => {
        setUploadedImageUrls([...uploaded_image_urls, ...preFetch(filelist)])
    }

    
    return (<div>
        <label htmlFor="upload_file_input"><Button><div>upload</div></Button></label>
        <input onChange={(e) => uploadFiles(e.target.files) } name="file" id="upload_file_input" type="file" style={{display: `none`}} multiple />            

        <div>
            {uploaded_image_urls ? <Thumbs {...{uploaded_image_urls, removeFile}} /> : <Empty />}
        </div>
    </div>)
})



export default Upload