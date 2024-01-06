import axios from "axios"
import { ReactEventHandler, useEffect, useState } from "react"
import AccountPostingsService from "src/services/accountPostings.service";
import { csvLines } from "src/types/csvLines.type";


export default function DonationImport(){
    const [csvLine,setCsvLine] = useState([] as csvLines[]);
    const [selectedFile,setSelectedFile] = useState<File>();

      const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = (e.target as HTMLInputElement).files
        if(files && files.length > 0){
            setSelectedFile(files[0])
        }
      }

      const handleSubmit = async (e: React.SyntheticEvent) =>{
        try {
            const [csvResponse] = await Promise.all ([AccountPostingsService.csvUpload(selectedFile)]);
            setCsvLine(csvResponse.data)
            alert("fichier importé avec succès")
        } catch (error) {
            console.log(error);
        }
      }
    
      return (<>
        <div className="container">
            <div className="row">
                <h2>Welcome in the import csv wizard</h2>

                <div className="col-md-6">
                    <button type="button" onClick={handleSubmit} className="btn btn-outline-primary">CSV import</button>&nbsp;&nbsp;
                    <button type="button" className="btn btn-outline-primary">Filter von bis</button>
                </div>
                <div className="input-group mb-3">
                    <label className="input-group-text" htmlFor="inputGroupFile01">Upload</label>
                    <input type="file" onChange={handleUpload} className="form-control" id="inputGroupFile01" />
                </div>
            </div>
            <div className="row">
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Summe</th>
                            <th scope="col">IBAN</th>
                            <th scope="col">Verwendungszweck</th>
                        </tr>
                    </thead>
                    <tbody>
                        {csvLine.map((line,index) => (
                            <tr key={index}>
                                <th scope="row">NOT IMPLEMENTED</th>
                                <td>{line.amount}</td>
                                <td>{line.iban}</td>
                                <td>{line.usageText}</td>
                            </tr>
                        ))}
                        
                    </tbody>
                </table>
            </div>
        </div>
    </>)
}