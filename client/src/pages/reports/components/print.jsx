import { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

// Forwarding a ref to allow the parent to call methods in the child
const PrintComp = forwardRef(
  (
    {
      school,
      student,
      ct,
      subjectInfo,
      rank,
      counter, 
      pos,
      teacher,
      remarks,
      grade,
      Jgrade,
    },
    ref
  ) => {
    const generatePdf = () => {
      const doc = new jsPDF();

      // Clean Header - No Background
      // Add School Logo with minimal styling
      if (school.logo) {
        doc.addImage(school.logo, "JPEG", 15, 8, 20, 20);
      }

      // Clean School Name
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(school.name || "", 105, 18, { align: "center" });

      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(75, 85, 99);
      doc.text(school.address || "", 105, 24, { align: "center" });
      doc.text(school.contact || "", 105, 28, { align: "center" });

      // Minimal Report Title
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${student.year || ""} ${student.term || ""} ${student.exam || ""} Report`,
        105,
        35,
        { align: "center" }
      );

      // Clean Student Info Section
      doc.setTextColor(0, 0, 0);
      
      // Student Name - Compact
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("STUDENT:", 20, 45);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(student.studentname || "", 50, 45);

      // Class Information - Compact
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("CLASS:", 120, 45);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(student.class || "", 145, 45);

      // Table Header and Rows
      const tableColumns = [
        "#",
        "Subject",
        "Marks",
        "Grade",
        "Position",
        "Remarks",
        "teacher",
      ];
      const tableRows = subjectInfo.map((item, index) => {
        const matchingRank = pos
          ?.flat()
          ?.find(
            (i) => i.subjectid === item.subjectid && i.score === item.score
          )?.rank;
        const teacherName = teacher
          ?.flat()
          ?.find((i) => i.subjectid === item.subjectid)?.name;

        return [
          index + 1,
          item.subject || "",
          item.score || "",
          item.grade || "",
          matchingRank ? `${matchingRank}/${counter}` : "N/A",
          item.remarks || "",
          teacherName || "N/A",
        ];
      });

      // Clean Table with No Background Colors
      doc.setFontSize(9);
      autoTable(doc, {
        startY: 52,
        head: [tableColumns],
        body: tableRows,
        theme: "grid", 
        headStyles: { 
          fillColor: [255, 255, 255], 
          textColor: [0, 0, 0], 
          fontStyle: "bold",
          fontSize: 9,
          halign: "center",
          cellPadding: 2
        },
        alternateRowStyles: {
          fillColor: [255, 255, 255]
        },
        styles: {
          fontSize: 8,
          cellPadding: 2,
          font: "helvetica",
          fontStyle: "normal",
          halign: "center",
          valign: "middle",
          lineColor: [0, 0, 0],
          lineWidth: 0.5
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 12 }, // #
          1: { halign: "left", cellWidth: 45 },   // Subject
          2: { halign: "center", cellWidth: 18 }, // Marks
          3: { halign: "center", cellWidth: 18 }, // Grade
          4: { halign: "center", cellWidth: 22 }, // Position
          5: { halign: "left", cellWidth: 40 },   // Remarks
          6: { halign: "left", cellWidth: 35 }    // teacher
        }
      });

      // Compact Summary Section
      const Y = doc.lastAutoTable.finalY + 8;
      
      // Aggregate - Inline
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("AGGREGATE:", 20, Y);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${student.aggregate || ""}`, 60, Y);

      // Position - Inline
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("POSITION:", 120, Y);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(`${rank || ""} of ${counter || ""}`, 160, Y);

      // Compact Remarks Section
      const remarksY = Y + 12;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("REMARKS:", 20, remarksY);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`${remarks || "No remarks available"}`, 60, remarksY);

      // Compact Teachers Section
      const teachersY = remarksY + 8;
      const teachers = ct.map((teacher) => teacher.name).join(", ");
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("TEACHER(S):", 20, teachersY);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text(`${teachers || "Not assigned"}`, 70, teachersY);

      // Minimal Signature Section
      const finalY = teachersY + 12;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("HEAD TEACHER:", 20, finalY);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(0, 0, 0);
      doc.text("_________________________", 80, finalY);

      // Clean Grading System MSCE
      const Grade = finalY + 15;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("MSCE GRADING SYSTEM", 20, Grade);

      doc.setTextColor(0, 0, 0);
      const gradesRow = grade.map((item) => `${item.roof}-${item.floor}`);
      const totalWidth = 180;
      const columnWidth = totalWidth / gradesRow.length;

      autoTable(doc, {
        body: [gradesRow],
        startY: Grade + 5,
        theme: "grid",
        tableWidth: totalWidth,
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 8,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 1,
          lineColor: [0, 0, 0]
        },
        columnStyles: gradesRow.reduce((styles, _, index) => {
          styles[index] = { cellWidth: columnWidth };
          return styles;
        }, {}),
      });

      // Clean Grade Letters MSCE
      const Rem = grade.map((item) => `${item.grade}`);
      const remWidth = totalWidth / Rem.length;
      autoTable(doc, {
        body: [Rem],
        startY: Grade + 12,
        theme: "grid",
        tableWidth: totalWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 8,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 1,
          lineColor: [0, 0, 0]
        },
        columnStyles: Rem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: remWidth };
          return styles;
        }, {}),
      });

      // Clean JCE GRADING SYSTEM
      const JGrade = doc.lastAutoTable.finalY + 8;
      doc.setFontSize(8);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text("JCE GRADING SYSTEM", 20, JGrade);

      doc.setTextColor(0, 0, 0);
      const JRow = Jgrade.map((item) => `${item.roof}-${item.floor}`);
      const JWidth = 180;
      const CWidth = JWidth / JRow.length;

      autoTable(doc, {
        body: [JRow],
        startY: JGrade + 5,
        theme: "grid",
        tableWidth: JWidth,
        headStyles: { fillColor: [255, 255, 255], textColor: [0, 0, 0] },
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 8,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 1,
          lineColor: [0, 0, 0]
        },
        columnStyles: JRow.reduce((styles, _, index) => {
          styles[index] = { cellWidth: CWidth };
          return styles;
        }, {}),
      });

      const JRem = Jgrade.map((item) => `${item.grade}`);
      const JremWidth = JWidth / JRem.length;

      autoTable(doc, {
        body: [JRem],
        startY: JGrade + 12,
        theme: "grid",
        tableWidth: JWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 8,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 1,
          lineColor: [0, 0, 0]
        },
        columnStyles: JRem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: JremWidth };
          return styles;
        }, {}),
      });

      // Minimal Footer
      const slogan = doc.lastAutoTable.finalY + 8;
      doc.setFontSize(8);
      doc.setFont("helvetica", "italic");
      doc.setTextColor(75, 85, 99);
      doc.text(`"${school.slogan || "Excellence in Education"}"`, 105, slogan, { align: "center" });

      // Save or Preview PDF
      doc.save(`${student.studentname || "report"}.pdf`);
    };

    // Expose the generatePdf function to the parent via ref
    useImperativeHandle(ref, () => ({
      generatePdf,
    }));

    return null; // This component doesn't render anything itself
  }
);

export default PrintComp;
