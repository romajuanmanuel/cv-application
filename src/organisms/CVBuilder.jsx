import { useState } from "react";
import { jsPDF } from "jspdf";
import {Header} from "./Header";
import GeneralInfoForm from "./GeneralInfoForm";
import { EducationForm } from "./EducationForm";
import { PracticalExperience } from "./PracticalExperience";
import Button from "../components/atoms/Button";

const CVBuilder = () => {
  const [generalInfo, setGeneralInfo] = useState([]);
  const [education, setEducation] = useState([]);
  const [experience, setExperience] = useState([]);

  const createDoc = () => new jsPDF({ unit: "pt", format: "a4" });
  const getPageSize = (doc) => ({
    width: doc.internal.pageSize.getWidth(),
    height: doc.internal.pageSize.getHeight(),
  });

  const handleDownloadPDF = () => {
    const doc = createDoc();
    const { width, height } = getPageSize(doc);
    const margin = 40;
    const sidebarWidth = 160;
    const startX = margin + sidebarWidth + 20;
    const maxWidthMain = width - margin - startX;
    const lineHeight = 14;
    let cursorY = 80;

    const ensureSpace = (needed = 40) => {
      if (cursorY + needed > height - margin) {
        doc.addPage();
        cursorY = margin + 40;
      }
    };

    // Helpers: write label + wrapped value and return used height
    const writeLabelValue = (label, value, x) => {
      // Label
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.text(label, x, cursorY);
      cursorY += lineHeight;

      // Value (may wrap)
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      const valueText = value ? String(value) : "";
      const wrapped = doc.splitTextToSize(valueText, maxWidthMain);
      doc.text(wrapped, x, cursorY);
      cursorY += wrapped.length * 12 + 6; // lines * approx height + small gap
    };

    // ---- Sidebar ----
    // background
    doc.setFillColor(63, 81, 181); // indigo
    doc.rect(margin, margin, sidebarWidth, height - margin * 2, "F");

    // Sidebar padding start
    const sideX = margin + 12;
    let sideY = margin + 50;

    // If there's generalInfo[0] use it as primary; else placeholder
    const person = (generalInfo && generalInfo.length > 0)
      ? generalInfo[0]
      : { name: "Your Name", email: "", phone: "" };

    // Name on sidebar (large, white)
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(255, 255, 255);
    const nameLines = doc.splitTextToSize(person.name || "Your Name", sidebarWidth - 24);
    doc.text(nameLines, sideX, sideY);
    sideY += nameLines.length * 14 + 8;

    // Divider
    doc.setDrawColor(255, 255, 255);
    doc.setLineWidth(0.5);
    doc.line(sideX, sideY, margin + sidebarWidth - 12, sideY);
    sideY += 12;

    // Contact labels in sidebar
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("Contact", sideX, sideY);
    sideY += 12;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    if (person.email) {
      const emailLines = doc.splitTextToSize(person.email, sidebarWidth - 24);
      doc.text(emailLines, sideX, sideY);
      sideY += emailLines.length * 12 + 6;
    }
    if (person.phone) {
      const phoneLines = doc.splitTextToSize(person.phone, sidebarWidth - 24);
      doc.text(phoneLines, sideX, sideY);
      sideY += phoneLines.length * 12 + 6;
    }

    // If there are additional general info entries, list them briefly
    if (generalInfo && generalInfo.length > 1) {
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text("Other", sideX, sideY);
      sideY += 12;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      generalInfo.slice(1).forEach((g) => {
        if (g.name) {
          const lines = doc.splitTextToSize(g.name, sidebarWidth - 24);
          doc.text(lines, sideX, sideY);
          sideY += lines.length * 12 + 4;
        }
        if (g.email) {
          const lines2 = doc.splitTextToSize(g.email, sidebarWidth - 24);
          doc.text(lines2, sideX, sideY);
          sideY += lines2.length * 12 + 4;
        }
      });
    }

    // ---- Main area header (name + underline) ----
    doc.setTextColor(34, 34, 34);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(22);
    doc.text(person.name || "Your Name", startX, margin + 40);

    // underline accent
    doc.setDrawColor(63, 81, 181);
    doc.setLineWidth(2);
    doc.line(startX, margin + 46, startX + 220, margin + 46);

    cursorY = margin + 80;

    // Render General Information section (full labels + values)
    if (generalInfo && generalInfo.length > 0) {
      ensureSpace(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(63, 81, 181);
      doc.text("General Information".toUpperCase(), startX, cursorY);
      cursorY += 18;

      doc.setTextColor(34, 34, 34);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      generalInfo.forEach((g, i) => {
        // Each entry shows labelled fields: Name, Email, Phone Number
        writeLabelValue("Name", g.name || "", startX);
        writeLabelValue("Email", g.email || "", startX);
        writeLabelValue("Phone Number", g.phone || "", startX);
        // small separator between different general entries
        cursorY += 4;
      });

      cursorY += 6;
    }

    // Education section
    if (education && education.length > 0) {
      ensureSpace(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(63, 81, 181);
      doc.text("Educational".toUpperCase(), startX, cursorY);
      cursorY += 18;

      doc.setTextColor(34, 34, 34);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      education.forEach((edu) => {
        // Label + value for each field
        writeLabelValue("School", edu.school || "", startX);
        writeLabelValue("Title", edu.title || "", startX);
        writeLabelValue("Graduation Date", edu.date || "", startX);
        // small gap after each education record
        cursorY += 2;
      });

      cursorY += 6;
    }

    // Practical Experience section
    if (experience && experience.length > 0) {
      ensureSpace(40);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14);
      doc.setTextColor(63, 81, 181);
      doc.text("Practical Experience".toUpperCase(), startX, cursorY);
      cursorY += 18;

      doc.setTextColor(34, 34, 34);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(11);

      experience.forEach((exp) => {
        writeLabelValue("Company Name", exp.company || "", startX);
        writeLabelValue("Position", exp.position || "", startX);
        writeLabelValue("Responsibility", exp.responsability || "", startX);
        writeLabelValue("From", exp.from || "", startX);
        writeLabelValue("Until", exp.until || "", startX);
        cursorY += 4;
      });

      cursorY += 6;
    }

    // Footer small text
    ensureSpace(40);
    doc.setFontSize(9);
    doc.setTextColor(120, 120, 120);
    doc.text("Generated with CVBuilder", margin, height - margin + 10);

    doc.save("cv-modern-labelled.pdf");
  };

  return (
    <div className="grid grid-cols-1 gap-4 p-16 bg-indigo-500">
      <Header />
      <GeneralInfoForm onSave={setGeneralInfo} />
      <EducationForm onSave={setEducation} />
      <PracticalExperience onSave={setExperience} />

      <div className="flex justify-center mt-6">
        <Button type="button" variant="primary" onClick={handleDownloadPDF}>
          Download PDF (Modern)
        </Button>
      </div>
    </div>
  );
};

export default CVBuilder;
