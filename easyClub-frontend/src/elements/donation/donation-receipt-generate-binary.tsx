import moment from "moment";
import { numToWord } from "num-words-de";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { AccountPosting } from "../../types/account-posting.type";
import donationDocument from "../donation_receipt_form.pdf";

export default async function donationReceiptGenerateBinary(accountPosting: AccountPosting) {
    const lineSpacingBookings = 23;
    const user = accountPosting.accountDonor;
    const club = accountPosting.donationReceiver;

    const existingPdfBytes = await fetch(donationDocument).then((res) =>
        res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const secondPage = pages[1];

    firstPage.drawText(club.name, {
        x: 65,
        y: 775,
        size: 14,
    });

    firstPage.drawText(user?.firstName + " " + user?.lastName, {
        x: 65,
        y: 682,
        size: 14,
    });

    firstPage.drawText(user?.street + " " + user?.housenumber, {
        x: 340,
        y: 692,
        size: 12,
    });

    firstPage.drawText(user?.postCode + " " + user?.city, {
        x: 340,
        y: 676,
        size: 12,
    });

    function isAccountPostingAvailable() {
        return accountPosting !== null && accountPosting !== undefined;
    }

    if (isAccountPostingAvailable()) {
        firstPage.drawText(`${accountPosting.amount}`, {
            x: 65,
            y: 630,
            size: 14,
        });
    }

    if (isAccountPostingAvailable()) {
        firstPage.drawText(numToWord(accountPosting!.amount), {
            x: 225,
            y: 630,
            size: 14,
        });
    }

    if (isAccountPostingAvailable()) {
        firstPage.drawText(
            moment(accountPosting!.bookingFinishedDate).format("YYYY"),
            {
                x: 438,
                y: 630,
                size: 14,
            }
        );
    }

    firstPage.drawText("X", {
        //checkmark Förderung
        x: 60,
        y: 471,
        size: 14,
    });

    firstPage.drawText(club.taxOffice, {
        x: 85,
        y: 458,
        size: 12,
    });

    firstPage.drawText(club.taxNumber, {
        x: 245,
        y: 458,
        size: 12,
    });

    firstPage.drawText(moment().format("DD.MM.YYYY"), {
        x: 420,
        y: 458,
        size: 12,
    });

    firstPage.drawText(club.purposeOfAssociation, {
        x: 100,
        y: 410,
        size: 14,
    });

    firstPage.drawText(club.purposeOfAssociation, {
        x: 100,
        y: 350,
        size: 14,
    });

    firstPage.drawText("X", {
        //checkmark steuerbegünstigte Einrichtung
        x: 60,
        y: 284,
        size: 14,
    });

    firstPage.drawText(club.city + ", " + moment().format("DD.MM.YYYY"), {
        x: 45,
        y: 172,
        size: 14,
    });

    // second page table
    let sum = 0;
    for (let i = 0; i < 1; i++) {
        secondPage.drawText("Geldzuwendung", {
            x: 180,
            y: 740 - i * lineSpacingBookings,
            size: 14,
        });

        secondPage.drawText("Nein", {
            x: 310,
            y: 740 - i * lineSpacingBookings,
            size: 14,
        });

        sum += accountPosting.amount;
        secondPage.drawText(`${accountPosting.amount} €`, {
            x: 470,
            y: 740 - i * lineSpacingBookings,
            size: 14,
        });

        secondPage.drawText(
            moment(accountPosting.bookingFinishedDate)
                .format("DD.MM.YYYY")
                .toString(),
            {
                x: 70,
                y: 740 - i * lineSpacingBookings,
                size: 14,
            }
        );
    }

    secondPage.drawText(`${sum}`, {
        x: 460,
        y: 460,
        size: 14,
    });

    return await pdfDoc.save();
}