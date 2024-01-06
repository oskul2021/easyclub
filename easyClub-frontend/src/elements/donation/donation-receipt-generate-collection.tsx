import { PDFDocument } from "pdf-lib";
import { useEffect, useState } from "react";
import { AccountPosting } from "../../types/account-posting.type";
import { generatePDFDataArray } from "./donation-receipts-redo";

export default function DonationReceiptGenerateCollection({ selectedYear, accountPostings, getSelectedPostingsByYear }: { selectedYear: number | undefined, accountPostings: AccountPosting[], getSelectedPostingsByYear: (accountPostings: AccountPosting[], selectedYear: number) => AccountPosting[]; }) {
    const [pdfInfo, setPdfInfo] = useState("");

    useEffect(() => {
        mergePDF();
    }, []);

    async function mergePDF() {
        const { pdfDataArray } = await generatePDFDataArray(selectedYear, accountPostings, getSelectedPostingsByYear);
        if (!pdfDataArray || pdfDataArray.length <= 0) return;

        const pdfDoc = await PDFDocument.load(pdfDataArray[0]);
        for (let index = 1; index < pdfDataArray.length; index++) {
            const pdfDocTemp = await PDFDocument.load(pdfDataArray[index]);

            const pages = await pdfDoc.copyPages(pdfDocTemp, pdfDocTemp.getPageIndices());
            pages.forEach((page) => pdfDoc.addPage(page));
        }

        const mergedPdfBytes = await pdfDoc.save();

        const docUrl = URL.createObjectURL(
            new Blob([mergedPdfBytes], { type: "application/pdf" })
        );
        setPdfInfo(docUrl);
    }
    return (
        <>
            {
                <iframe
                    title="donation-receipt-frame"
                    src={pdfInfo}
                    width="100%"
                    height="700"
                    typeof="application/pdf"
                />
            }
        </>
    );
}