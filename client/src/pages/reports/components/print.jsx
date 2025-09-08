import { forwardRef, useImperativeHandle } from "react";
import jsPDF from "jspdf";
import "jspdf-autotable";

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

      // Modern Header with Gradient-like Effect
      doc.setFillColor(59, 130, 246); // Blue gradient start
      doc.rect(0, 0, 210, 50, 'F');
      
      // Add School Logo with modern styling
      if (school.logo) {
        doc.addImage(school.logo, "JPEG", 20, 15, 25, 25);
      }

      // Modern School Name with better typography
      doc.setTextColor(255, 255, 255); // White text
      doc.setFontSize(18);
      doc.setFont("helvetica", "bold");
      doc.text(school.name || "", 105, 25, { align: "center" });

      doc.setFontSize(10);
      doc.setFont("helvetica", "normal");
      doc.text(school.address || "", 105, 32, { align: "center" });
      doc.text(school.contact || "", 105, 37, { align: "center" });
      doc.text(school.email || "", 105, 42, { align: "center" });

      // Modern Report Title with accent
      doc.setTextColor(59, 130, 246); // Blue text
      doc.setFontSize(14);
      doc.setFont("helvetica", "bold");
      doc.text(
        `${student.year || ""} ${student.term || ""} ${student.exam || ""} Report Card`,
        105,
        55,
        { align: "center" }
      );

      // Modern Student Info Cards
      doc.setTextColor(0, 0, 0); // Black text
      
      // Student Name Card
      doc.setFillColor(248, 250, 252); // Light gray background
      doc.roundedRect(20, 65, 85, 20, 3, 3, 'F');
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99); // Gray text
      doc.text("STUDENT NAME", 25, 72);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(student.studentname || "", 25, 78);

      // Class Information Card
      doc.setFillColor(239, 246, 255); // Light blue background
      doc.roundedRect(110, 65, 85, 20, 3, 3, 'F');
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(75, 85, 99);
      doc.text("CLASS", 115, 72);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(0, 0, 0);
      doc.text(student.class || "", 115, 78);

      // Table Header and Rows
      const tableColumns = [
        "#",
        "Subject",
        "Marks",
        "Grade",
        "Position",
        "Remarks",
        "Teacher",
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

      // Modern Table with Enhanced Styling
      doc.setFontSize(10);
      doc.autoTable({
        startY: 95,
        head: [tableColumns],
        body: tableRows,
        theme: "striped", 
        headStyles: { 
          fillColor: [59, 130, 246], 
          textColor: [255, 255, 255], 
          fontStyle: "bold",
          fontSize: 10,
          halign: "center"
        },
        alternateRowStyles: {
          fillColor: [248, 250, 252]
        },
        styles: {
          fontSize: 9,
          cellPadding: 4,
          font: "helvetica",
          fontStyle: "normal",
          halign: "center",
          valign: "middle",
          lineColor: [229, 231, 235],
          lineWidth: 0.5
        },
        columnStyles: {
          0: { halign: "center", cellWidth: 15 }, // #
          1: { halign: "left", cellWidth: 40 },   // Subject
          2: { halign: "center", cellWidth: 20 }, // Marks
          3: { halign: "center", cellWidth: 20 }, // Grade
          4: { halign: "center", cellWidth: 25 }, // Position
          5: { halign: "left", cellWidth: 35 },   // Remarks
          6: { halign: "left", cellWidth: 35 }    // Teacher
        }
      });

      // Modern Summary Cards
      const Y = doc.lastAutoTable.finalY + 10;
      
      // Aggregate Card
      doc.setFillColor(34, 197, 94); // Green background
      doc.roundedRect(20, Y, 85, 25, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("AGGREGATE SCORE", 25, Y + 8);
      doc.setFontSize(16);
      doc.setFont("helvetica", "bold");
      doc.text(`${student.aggregate || ""}`, 25, Y + 18);

      // Position Card
      doc.setFillColor(168, 85, 247); // Purple background
      doc.roundedRect(110, Y, 85, 25, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(9);
      doc.setFont("helvetica", "bold");
      doc.text("CLASS POSITION", 115, Y + 8);
      doc.setFontSize(12);
      doc.setFont("helvetica", "bold");
      doc.text(`${rank || ""} of ${counter || ""}`, 115, Y + 18);

      // Teacher's Remarks Section
      const remarksY = Y + 35;
      doc.setTextColor(0, 0, 0);
      doc.setFillColor(254, 243, 199); // Yellow background
      doc.roundedRect(20, remarksY, 170, 20, 5, 5, 'F');
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("TEACHER'S REMARKS", 25, remarksY + 8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`${remarks || "No remarks available"}`, 25, remarksY + 15);

      // Class Teachers Section
      const teachersY = remarksY + 30;
      const teachers = ct.map((teacher) => teacher.name).join(", ");
      doc.setFillColor(219, 234, 254); // Light blue background
      doc.roundedRect(20, teachersY, 170, 20, 5, 5, 'F');
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("CLASS TEACHER(S)", 25, teachersY + 8);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.text(`${teachers || "Not assigned"}`, 25, teachersY + 15);

      // Modern Footer with Signature
      const finalY = teachersY + 30;
      doc.setFillColor(243, 244, 246); // Light gray background
      doc.roundedRect(20, finalY, 170, 25, 5, 5, 'F');
      doc.setTextColor(0, 0, 0);
      doc.setFontSize(10);
      doc.setFont("helvetica", "bold");
      doc.text("HEAD TEACHER SIGNATURE", 25, finalY + 8);
      doc.setFontSize(8);
      doc.setFont("helvetica", "normal");
      doc.text("_________________________", 25, finalY + 18);

      // Modern Grading System MSCE
      const Grade = finalY + 35;
      doc.setFillColor(59, 130, 246); // Blue header
      doc.roundedRect(15, Grade, 180, 15, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("MSCE GRADING SYSTEM", 105, Grade + 10, { align: "center" });

      doc.setTextColor(0, 0, 0);
      const gradesRow = grade.map((item) => `${item.roof} - ${item.floor}`);
      const totalWidth = 180;
      const columnWidth = totalWidth / gradesRow.length;

      doc.autoTable({
        body: [gradesRow],
        startY: Grade + 20,
        theme: "striped",
        tableWidth: totalWidth,
        headStyles: { fillColor: [59, 130, 246], textColor: [255, 255, 255] },
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 9,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 3,
          lineColor: [229, 231, 235]
        },
        columnStyles: gradesRow.reduce((styles, _, index) => {
          styles[index] = { cellWidth: columnWidth };
          return styles;
        }, {}),
      });

      // Modern Grade Letters MSCE
      const Rem = grade.map((item) => `${item.grade}`);
      const remWidth = totalWidth / Rem.length;
      doc.autoTable({
        body: [Rem],
        startY: Grade + 30,
        theme: "striped",
        tableWidth: totalWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 9,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 3,
          lineColor: [229, 231, 235]
        },
        columnStyles: Rem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: remWidth };
          return styles;
        }, {}),
      });

      // Modern JCE GRADING SYSTEM
      const JGrade = doc.lastAutoTable.finalY + 15;
      doc.setFillColor(168, 85, 247); // Purple header
      doc.roundedRect(15, JGrade, 180, 15, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(11);
      doc.setFont("helvetica", "bold");
      doc.text("JCE GRADING SYSTEM", 105, JGrade + 10, { align: "center" });

      doc.setTextColor(0, 0, 0);
      const JRow = Jgrade.map((item) => `${item.roof} - ${item.floor}`);
      const JWidth = 180;
      const CWidth = JWidth / JRow.length;

      doc.autoTable({
        body: [JRow],
        startY: JGrade + 20,
        theme: "striped",
        tableWidth: JWidth,
        headStyles: { fillColor: [168, 85, 247], textColor: [255, 255, 255] },
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 9,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 3,
          lineColor: [229, 231, 235]
        },
        columnStyles: JRow.reduce((styles, _, index) => {
          styles[index] = { cellWidth: CWidth };
          return styles;
        }, {}),
      });

      const JRem = Jgrade.map((item) => `${item.grade}`);
      const JremWidth = JWidth / JRem.length;

      doc.autoTable({
        body: [JRem],
        startY: JGrade + 30,
        theme: "striped",
        tableWidth: JWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 9,
          font: "helvetica",
          fontStyle: "bold",
          cellPadding: 3,
          lineColor: [229, 231, 235]
        },
        columnStyles: JRem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: JremWidth };
          return styles;
        }, {}),
      });

      // Modern Footer with School Slogan
      const slogan = doc.lastAutoTable.finalY + 15;
      doc.setFillColor(59, 130, 246); // Blue background
      doc.roundedRect(15, slogan, 180, 20, 5, 5, 'F');
      doc.setTextColor(255, 255, 255);
      doc.setFontSize(10);
      doc.setFont("helvetica", "italic");
      doc.text(`"${school.slogan || "Excellence in Education"}"`, 105, slogan + 12, { align: "center" });

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
