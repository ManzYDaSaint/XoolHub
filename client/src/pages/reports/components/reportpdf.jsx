import { useEffect } from "react";
import { jsPDF } from "jspdf";

const PrintReport = ({ data, onComplete }) => {
  useEffect(() => {
    if (data) {
      const generatePdf = () => {
        const doc = new jsPDF();

        doc.setFontSize(16);
        doc.text("Report Details", 10, 10);

        doc.setFontSize(12);
        doc.text(`Year ID: ${data.yearid || "N/A"}`, 10, 20);
        doc.text(`Term ID: ${data.termid || "N/A"}`, 10, 30);
        doc.text(`Type ID: ${data.typeid || "N/A"}`, 10, 40);
        doc.text(`Class ID: ${data.classid || "N/A"}`, 10, 50);

        doc.save("Report.pdf");

        if (onComplete) onComplete();
      };

      generatePdf(); // Call the function
    }
  }, [data, onComplete]); // Dependencies
  return null;
};

export default PrintReport;
