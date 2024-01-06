import moment from "moment";
import { PDFDocument, StandardFonts } from "pdf-lib";
import { useEffect, useState } from "react";
import { AccountPosting } from "../../types/account-posting.type";
import { AppUser } from "../../types/app-user.type";
import { Club } from "../../types/club.type";
import donationDocument from "../donation_receipt_form.pdf";
import { numToWord } from "num-words-de";

const GeneratePDF = ({ selectedUser, accountPostings: accountPostingsUser, clubs }: { selectedUser?: AppUser; accountPostings?: AccountPosting[], clubs: Club[]; }) => {
  const user = selectedUser;
  const accountPostings = accountPostingsUser;
  const club0 = clubs[0];
  const lineSpacingBookings = 23;

  let accountPosting: AccountPosting | undefined;
  if (accountPostings != null && accountPostings != undefined) {
    if (accountPostings.length == 1) {
      accountPosting = accountPostings[0];
    }
  }

  const [pdfInfo, setPdfInfo] = useState("");

  useEffect(() => {
    modifyPdf();
  }, []);

  //const path = process.env.PUBLIC_URL + '/donation_receipts_form.pdf'
  const modifyPdf = async () => {
    const existingPdfBytes = await fetch(donationDocument).then((res) =>
      res.arrayBuffer()
    );

    const pdfDoc = await PDFDocument.load(existingPdfBytes);
    const helveticaFont = await pdfDoc.embedFont(StandardFonts.Helvetica);

    const pages = pdfDoc.getPages();
    const firstPage = pages[0];
    const secondPage = pages[1];

    firstPage.drawText(club0.name, {
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
      firstPage.drawText(accountPosting!.amount.toString(), {
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

    firstPage.drawText(club0.taxOffice, {
      x: 85,
      y: 458,
      size: 12,
    });

    firstPage.drawText(club0.taxNumber, {
      x: 245,
      y: 458,
      size: 12,
    });

    firstPage.drawText(moment().format("DD.MM.YYYY"), {
      x: 420,
      y: 458,
      size: 12,
    });

    firstPage.drawText(club0.purposeOfAssociation, {
      x: 100,
      y: 410,
      size: 14,
    });

    firstPage.drawText(club0.purposeOfAssociation, {
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

    firstPage.drawText(club0.city + ", " + moment().format("DD.MM.YYYY"), {
      x: 45,
      y: 172,
      size: 14,
    });

    //second page table
    let sum = 0;
    for (let i = 0; i < (accountPostings ? accountPostings.length : 0); i++) {
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

      sum += accountPostings![i].amount;
      secondPage.drawText(accountPostings![i].amount.toString(), {
        x: 470,
        y: 740 - i * lineSpacingBookings,
        size: 14,
      });

      secondPage.drawText(
        moment(accountPostings![i].bookingFinishedDate)
          .format("DD.MM.YYYY")
          .toString(),
        {
          x: 70,
          y: 740 - i * lineSpacingBookings,
          size: 14,
        }
      );
    }

    secondPage.drawText(sum.toString(), {
      x: 460,
      y: 460,
      size: 14,
    });

    const pdfBytes = await pdfDoc.save();
    const docUrl = URL.createObjectURL(
      new Blob([pdfBytes], { type: "application/pdf" })
    );
    setPdfInfo(docUrl);
  };

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
};

export default GeneratePDF;
