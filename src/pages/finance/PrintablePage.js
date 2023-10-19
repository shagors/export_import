import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (finance) => {
  const dateString = finance.selectedBEDate;
  const dateObj = new Date(dateString);
  const localDate = dateObj.toLocaleDateString();
  const productNameParse = JSON.parse(finance?.productName);
  const totalBoxParse = JSON.parse(finance?.totalBox);
  const totalBox = totalBoxParse?.reduce(
    (acc, currentValue) => acc + currentValue,
    0
  );
  const productModelParse = JSON.parse(finance.productModel);

  const doc = new jsPDF();

  // Add border to the entire page
  doc.rect(
    5,
    5,
    doc.internal.pageSize.width - 15,
    doc.internal.pageSize.height - 15,
    "S"
  );

  doc.setFontSize(60);
  doc.text("Mark", 85, 30);
  doc.setFontSize(40);
  doc.text(`Product Name: ${productNameParse}`, 7, 60);
  doc.setFontSize(40);
  doc.text(`Total Box: ${totalBox} boxes`, 7, 100);
  doc.setFontSize(30);
  doc.text(`Made in Bangladesh`, 65, 140);
  doc.setFontSize(60);
  doc.text(`Total Pallet: ${finance.totalPalletQuantity}`, 40, 175);
  // doc.setFontSize(16);
  // doc.text(`Date: ${localDate}`, 10, 150);

  doc.autoTable({
    head: [["Model", "Date", "Total Pallet", "Pallet", "Remark"]], // Replace with your table headers
    body: [
      [
        productModelParse,
        localDate,
        "20",
        finance.totalPalletQuantity,
        `${finance.palletRemarks} boxes`,
      ],
    ], // Replace with your table data
    startY: 200, // Adjust the Y position based on your content above
    styles: {
      head: {
        fillColor: [255, 255, 255], // Set the header background color to white
        textColor: [0, 0, 0], // Set the header text color to black
      },
    },
  });

  // Add more fields as needed
  doc.save(`finance_details_${finance.invoiceNo}.pdf`);
};
