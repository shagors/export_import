import jsPDF from "jspdf";
import "jspdf-autotable";

export const generatePDF = (finance) => {
  const dateString = finance.selectedBEDate;
  const dateObj = new Date(dateString);
  const localDate = dateObj.toLocaleDateString();

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
  doc.text(`Product Name: ${finance.productName}`, 7, 60);
  doc.setFontSize(40);
  doc.text(`Total Box: 80`, 7, 100);
  doc.setFontSize(20);
  doc.text(`Made in Bangladesh`, 80, 140);
  doc.setFontSize(60);
  doc.text(`Total Pallet: ${finance.totalPalletQuantity}`, 40, 175);
  // doc.setFontSize(16);
  // doc.text(`Date: ${localDate}`, 10, 150);

  doc.autoTable({
    head: [["Model", "Date", "Total Pallet", "Pallet", "Remark"]], // Replace with your table headers
    body: [
      [
        "test101",
        localDate,
        "20",
        finance.totalPalletQuantity,
        finance.palletRemarks,
      ],
    ], // Replace with your table data
    startY: 200, // Adjust the Y position based on your content above
  });

  // Add more fields as needed
  doc.save(`finance_details_${finance.invoiceNo}.pdf`);
};
