import * as React from "react";
import { Dropzone, FileMosaic } from "@dropzone-ui/react";

export default function DropImg() {
  const [files, setFiles] = React.useState<any>([]);
  const updateFiles = (incommingFiles:any) => {
    setFiles(incommingFiles);
  };
  return (
    <Dropzone onChange={updateFiles} value={files}>
      {/* {files.map((file:any) => (
        <FileMosaic key={file} {...file} preview />
      ))} */}
      
    </Dropzone>
  );
}
