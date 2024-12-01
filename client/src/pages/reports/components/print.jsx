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

      // Add School Logo
      if (school.logo) {
        doc.addImage(school.logo, "JPEG", 20, 20, 20, 20);
      }

      // Add School Name
      doc.setFontSize(16);
      doc.setFont("Arial", "bold");
      doc.text(school.name, 105, 20, { align: "center" });

      doc.setFontSize(12);
      doc.setFont("Arial", "bold");
      doc.text(school.address, 105, 25, { align: "center" });
      doc.text(school.contact, 105, 30, { align: "center" });
      doc.text(school.email, 105, 35, { align: "center" });

      // Add Report Info
      doc.setFontSize(12);
      doc.setFont("Arial", "bold");
      doc.text(
        `${student.year} ${student.term} ${student.exam} Report Card`,
        105,
        45,
        { align: "center" }
      );

      // Add Student Info
      doc.setFontSize(10);
      doc.setFont("Arial", "bold");
      doc.text(`Name of Student`, 60, 55);

      doc.setFont("Arial", "normal");
      doc.text(`${student.studentname}`, 60, 60);

      // Class Information
      doc.setFontSize(10);
      doc.setFont("Arial", "bold");
      doc.text(`Class`, 130, 55);

      doc.setFont("Arial", "normal");
      doc.text(`${student.class}`, 130, 60);

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
          item.subject,
          item.score,
          item.grade,
          matchingRank ? `${matchingRank}/${counter}` : "N/A",
          item.remarks,
          teacherName || "N/A",
        ];
      });

      // Add Table
      doc.setFontSize(10);
      doc.autoTable({
        startY: 65,
        head: [tableColumns],
        body: tableRows,
        theme: "grid",
        headStyles: { fillColor: [0, 123, 254], textColor: [255, 255, 255], fontStyle: "bold" },
        styles: {
          fontSize: 10,
          cellPadding: 1,
          font: "Arial",
          fontStyle: "normal",
        },
      });

      // Aggregate and Position
      const Y = doc.lastAutoTable.finalY + 5;
      doc.setFont("Arial", "bold");
      doc.text(`Aggregate:`, 40, Y);
      doc.setFont("Arial", "normal");
      doc.text(`${student.aggregate}`, 60, Y);

      doc.setFont("Arial", "bold");
      doc.text(`Position:`, 120, Y);
      doc.setFont("Arial", "normal");
      doc.text(`${rank} Out Of ${counter}`, 137, Y);

      // Add Class Teacher(s) Remarks
      doc.setFont("Arial", "bold");
      doc.text(`Teacher's Remarks:`, 20, Y + 10);
      doc.setFont("Arial", "normal");
      doc.text(`${remarks}`, 55, Y + 10);

      // Add Class Teacher(s) Remarks
      const X = doc.lastAutoTable.finalY + 20;
      const teachers = ct.map((teacher) => teacher.name).join(", ");
      doc.setFont("Arial", "bold");
      doc.text(`Class Teacher(s):`, 20, X);
      doc.setFont("Arial", "normal");
      doc.text(`${teachers}`, 50, X);

      // Add Footer
      const finalY = doc.lastAutoTable.finalY + 25;
      doc.setFont("Arial", "bold");
      doc.text(`Head Teacher Signature:`, 20, finalY);

      //Grading System MSCE
      const Grade = doc.lastAutoTable.finalY + 35;
      doc.setFontSize(10);
      doc.setFont("Arial", "bold");
      doc.text(`MSCE GRADING SYSTEM`, 15, Grade);

      doc.setFont("Arial", "normal");
      const gradesRow = grade.map((item) => `${item.roof} - ${item.floor}`);
      const totalWidth = 100;
      const columnWidth = totalWidth / gradesRow.length;

      doc.autoTable({
        body: [gradesRow],
        startY: Grade + 2,
        theme: "grid",
        tableWidth: totalWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          font: "Arial",
          fontStyle: "bold",
        },
        columnStyles: gradesRow.reduce((styles, _, index) => {
          styles[index] = { cellWidth: columnWidth };
          return styles;
        }, {}),
      });

      // Rem System MSCE
      doc.setFontSize(10);
      const Rem = grade.map((item) => `${item.grade}`);
      const remWidth = totalWidth / Rem.length;
      doc.autoTable({
        body: [Rem],
        startY: Grade + 9,
        theme: "grid",
        tableWidth: totalWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          font: "Arial",
          fontStyle: "bold",
        },
        columnStyles: Rem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: remWidth };
          return styles;
        }, {}),
      });

      // JCE GRADING SYSTEM
      const JGrade = doc.lastAutoTable.finalY + 10;
      doc.setFontSize(10);
      doc.setFont("Arial", "bold");
      doc.text(`JCE GRADING SYSTEM`, 15, JGrade);

      doc.setFont("Arial", "normal");
      const JRow = Jgrade.map((item) => `${item.roof} - ${item.floor}`);
      const JWidth = 100;
      const CWidth = JWidth / JRow.length;

      doc.setFontSize(10);
      doc.autoTable({
        body: [JRow],
        startY: JGrade + 2,
        theme: "grid",
        tableWidth: totalWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          font: "Arial",
          fontStyle: "bold",
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
        startY: JGrade + 9,
        theme: "grid",
        tableWidth: JWidth,
        styles: {
          halign: "center",
          valign: "middle",
          fontSize: 10,
          font: "Arial",
          fontStyle: "bold",
        },
        columnStyles: JRem.reduce((styles, _, index) => {
          styles[index] = { cellWidth: JremWidth };
          return styles;
        }, {}),
      });

      doc.setFont("Arial", "italic");
      const slogan = doc.lastAutoTable.finalY + 10;
      doc.text(`"${school.slogan}"`, 105, slogan, { align: "center" });

      // Save or Preview PDF
      doc.save(`${student.studentname}.pdf`);
    };

    // Expose the generatePdf function to the parent via ref
    useImperativeHandle(ref, () => ({
      generatePdf,
    }));

    return null; // This component doesn't render anything itself
  }
);

export default PrintComp;
