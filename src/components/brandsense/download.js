import { useAppSelector } from "@/lib/hooks";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts"; // Import fonts

// pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set the virtual file system for the fonts

const ExportRiskPDF = () => {
  // const posts = useAppSelector((state) => state.posts.posts); // Use useAppSelector instead of useSelector
  const posts = []

  const instagramMentions = useAppSelector((state) => state.posts.instagramMentions); // Use useAppSelector instead of useSelector
  const twitterMentions = useAppSelector((state) => state.posts.twitterMentions); // Use useAppSelector instead of useSelector
  const facebookMentions = useAppSelector((state) => state.posts.facebookMentions); // Use useAppSelector instead of useSelector
  const telegramMentions = useAppSelector((state) => state.posts.telegramMentions); // Use useAppSelector instead of useSelector
  const darkWebXSSMentions = useAppSelector((state) => state.posts.darkWebXSSMentions); // Use useAppSelector instead of useSelector
  const darkWebFacebookMentions = useAppSelector((state) => state.posts.darkWebFacebookMentions); // Use useAppSelector instead of useSelector
  const darkWebStealerMentions = useAppSelector((state) => state.posts.darkWebStealerMentions); // Use useAppSelector instead of useSelector

  posts.push(...instagramMentions)
  posts.push(...twitterMentions)
  posts.push(...facebookMentions)
  posts.push(...telegramMentions)
  posts.push(...darkWebXSSMentions)
  posts.push(...darkWebXSSMentions)
  posts.push(...darkWebFacebookMentions)
  posts.push(...darkWebStealerMentions)

  const exportPDF = () => {
    const filteredPosts = posts.filter(
      (post) => post.risk === "medium" || post.risk === "high"
    );

    if (filteredPosts.length === 0) {
      alert("No medium or high-risk posts to export.");
      return;
    }

    // Define the content layout for each post
    const content = filteredPosts.map((post) => {
      const url = post.link ? String(post.link) : "No URL";
      const date = post.date ? new Date(post.date).toDateString() : "No Date";
      const contentText = post.content ? String(post.content) : "No Content";
      const risk = post.risk ? post.risk.toUpperCase() : "UNKNOWN";
      const source = post.source ? String(post.source) : "No Source";

      return [
        { text: `${url}`, style: 'urlText' },
        { text: `Date: ${date}`, style: 'dateText' },
        { text: `Content: ${contentText}`, style: 'contentText' },
        { text: `Source: ${source}`, style: 'sourceText' },
        { text: `Risk: ${risk}`, style: 'riskText' },
        { text: "-------------------------------------------------------", style: 'separator' }
      ];
    });

    // Define the document structure
    const docDefinition = {
      content: [
        { text: "Risk Analysis Report", style: "header" },
        ...content
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: "center",
          margin: [0, 20, 0, 20], // Add margin before and after the header
        },
        urlText: {
          fontSize: 12,
          bold: true,
          margin: [0, 5],
        },
        dateText: {
          fontSize: 10,
          margin: [0, 5],
        },
        contentText: {
          fontSize: 10,
          margin: [0, 5],
        },
        sourceText: {
          fontSize: 10,
          margin: [0, 5],
        },
        riskText: {
          fontSize: 12,
          bold: true,
          color: 'red',
          margin: [0, 5],
        },
        separator: {
          margin: [0, 5],
        },
      },
    };

    // Generate and download the PDF
    pdfMake.createPdf(docDefinition).download("Risk_Analysis_Report.pdf");
  };

  return (
    <button
      onClick={exportPDF}
      className="bg-blue-500 text-white px-4 py-2 rounded-md"
    >
      Export Medium & High-Risk Posts
    </button>
  );
};

export default ExportRiskPDF;
