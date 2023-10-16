import jsPDF from "jspdf";

export const generatePDF = (finance) => {
  const dateString = finance.selectedBEDate;
  const dateObj = new Date(dateString);
  const localDate = dateObj.toLocaleDateString();

  const doc = new jsPDF();
  doc.setFontSize(60);
  doc.text("Mark", 85, 20);
  doc.setFontSize(40);
  doc.text(`Product Name: ${finance.productName}`, 5, 50);
  doc.setFontSize(20);
  doc.text(`Made in Bangladesh`, 80, 60);
  doc.setFontSize(35);
  doc.text(`Total Pallet: ${finance.totalPalletQuantity}`, 10, 80);
  doc.setFontSize(16);
  doc.text(`Date: ${localDate}`, 10, 90);
  doc.text(`Remark: ${finance.palletRemarks}`, 10, 100);
  // Add more fields as needed
  doc.save(`finance_details_${finance.invoiceNo}.pdf`);
};
