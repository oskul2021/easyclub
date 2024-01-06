import { degrees, PDFDocument, rgb, StandardFonts } from "pdf-lib";
import React, { useEffect, useState } from "react";
import donationDocument from "../donation_receipt_form.pdf";
import moment from "moment";

const GeneratePDF = (props) => {
  console.log("generatePDF", props);
  const user = props.selectedUser;
  const accountPostings = props.accountPostingsUser;
  const club = props.club[0];
  const lineSpacingBookings = 23;
  var converter = require("number-to-words");

  var accountPosting = 0;
  if (accountPostings != null && accountPostings != undefined) {
    if (accountPostings.length == 1) {
      accountPosting = accountPostings[0];
    }
  }

  const [pdfInfo, setPdfInfo] = useState([]);

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

    if (accountPosting != 0) {
      firstPage.drawText(accountPosting.amount.toString(), {
        x: 65,
        y: 630,
        size: 14,
      });
    }

    if (accountPosting != 0) {
      firstPage.drawText(converter.toWords(accountPosting.amount), {
        x: 225,
        y: 630,
        size: 14,
      });
    }

    if (accountPosting != 0) {
      firstPage.drawText(
        moment(accountPosting.bookingFinishedDate).format("YYYY"),
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

    //second page table
    var sum = 0;
    for (let i = 0; i < accountPostings ? accountPostings.length : 0; i++) {
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

      sum += accountPostings[i].amount;
      secondPage.drawText(accountPostings[i].amount.toString(), {
        x: 470,
        y: 740 - i * lineSpacingBookings,
        size: 14,
      });

      secondPage.drawText(
        moment(accountPostings[i].bookingFinishedDate)
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
          type="application/pdf"
        />
      }
    </>
  );
};

export default GeneratePDF;
