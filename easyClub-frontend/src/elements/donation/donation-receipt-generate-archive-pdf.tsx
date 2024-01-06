import { PDFDocument } from 'pdf-lib';
import JSZip from 'jszip';

async function createZipArchive(pdfDataArray: Uint8Array[], pdfYear: number, names: string[]): Promise<Uint8Array> {
    const zip = new JSZip();
    if (pdfDataArray.length !== names.length) {
        console.log('pdfDataArray and names must have the same length');
        console.log('pdfDataArray.length: ' + pdfDataArray.length);
        console.log('names.length: ' + names.length);
        throw new Error('pdfDataArray and names must have the same length');
    }

    for (let i = 0; i < pdfDataArray.length && i < names.length; i++) {
        const pdfData = pdfDataArray[i];
        const pdfDoc = await PDFDocument.load(pdfData);

        const pdfFileName = `document_${i + 1}_${names[i]}_${pdfYear}.pdf`;
        const pdfBytes = await pdfDoc.save();

        const buffer = Buffer.from(pdfBytes.buffer);

        zip.file(pdfFileName, buffer);
    }

    return zip.generateAsync({ type: 'uint8array' });
}

function downloadZipArchive(data: Uint8Array, filename: string) {
    const blob = new Blob([data], { type: 'application/zip' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

export default async function zipper(pdfDataArray: Uint8Array[], pdfYear: number, names: string[]) {
    try {
        const zipData = await createZipArchive(pdfDataArray, pdfYear, names);
        downloadZipArchive(zipData, `documents_${pdfYear}.zip`);
    } catch (error) {
        console.error(`Error creating ZIP-Archive`, error);
    }
}