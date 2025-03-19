import { useAppSelector } from '@/lib/hooks';
import { generateCsv, mkConfig } from 'export-to-csv';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';

pdfMake.vfs = pdfFonts.vfs; // Set the virtual file system for the fonts
// pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set the virtual file system for the fonts
const ExportRiskCSV = () => {
  const exportCSV = () => {
    const filteredPosts = posts.filter(
      (post) => post.risk === 'medium' || post.risk === 'high',
    );

    const csvData = filteredPosts.map((post) => ({
      url: post.link,
      date: post.date,
      content: post.content,
      source: post.source,
      risk: post.risk,
    }));

    const csvHeaders = ['URL', 'Date', 'Content', 'Source', 'Risk'];

    const csvContent = [
      csvHeaders.join(','),
      ...csvData.map((row) => Object.values(row).join(',')),
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });

    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'risk_analysis_report.csv';
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <button
      onClick={exportCSV}
      className="bg-green-500 text-white px-4 py-2 rounded-md"
    >
      Export CSV
    </button>
  );
};

// Shared column configuration for consistent format
const csvColumns = [
  {
    id: 'url',
    displayName: 'URL',
  },
  {
    id: 'date',
    displayName: 'Date',
  },
  {
    id: 'content',
    displayName: 'Content',
  },
  {
    id: 'source',
    displayName: 'Source',
  },
  {
    id: 'risk',
    displayName: 'Risk',
  },
];

// Basic example of CsvDownloader usage
const BasicExampleCSV = () => {
  const datas = [
    {
      URL: 'https://example1.com',
      Date: '2024-03-08',
      Content: 'Example content 1',
      Source: 'Facebook',
      Risk: 'HIGH',
    },
    {
      URL: 'https://example2.com',
      Date: '2024-03-08',
      Content: 'Example content 2',
      Source: 'Twitter',
      Risk: 'MEDIUM',
    },
  ];

  const handleClick = () => {
    try {
      const csv = generateCsv(csvConfig)(datas);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'basic_example.csv';
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Error generating CSV file. Please try again.');
    }
  };

  return (
    <button
      onClick={handleClick}
      className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:opacity-90"
    >
      Download Example CSV
    </button>
  );
};

const csvConfig = mkConfig({
  fieldSeparator: ',',
  quoteStrings: true,
  decimalSeparator: '.',
  showLabels: true,
  useBom: true,
  useKeysAsHeaders: true,
  headers: undefined,
});

const ExportRiskPDF = () => {
  const posts = useAppSelector((state) => state.posts.allPosts);

  const exportPDF = async () => {
    const filteredPosts = posts.filter(
      (post) => post.risk === 'medium' || post.risk === 'high',
    );

    if (filteredPosts.length === 0) {
      alert('No medium or high-risk posts to export.');
      return;
    }

    // Define the content layout for each post
    const content = filteredPosts.map((post) => {
      const url = post.link ? String(post.link) : 'No URL';
      const date = post.date ? new Date(post.date).toDateString() : 'No Date';
      const contentText = post.content ? String(post.content) : 'No Content';
      const risk = post.risk ? post.risk.toUpperCase() : 'UNKNOWN';
      const source = post.source ? String(post.source) : 'No Source';

      return [
        { text: `${url}`, style: 'urlText' },
        { text: `Date: ${date}`, style: 'dateText' },
        { text: `Content: ${contentText}`, style: 'contentText' },
        { text: `Source: ${source}`, style: 'sourceText' },
        { text: `Risk: ${risk}`, style: 'riskText' },
        {
          text: '-------------------------------------------------------',
          style: 'separator',
        },
      ];
    });

    // Define the document structure
    const docDefinition = {
      content: [{ text: 'Risk Analysis Report', style: 'header' }, ...content],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          alignment: 'center',
          margin: [0, 20, 0, 20],
        },
        defaultStyle: {
          font: 'Roboto',
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
    pdfMake.createPdf(docDefinition).download('Risk_Analysis_Report.pdf');
  };

  const exportCSV = () => {
    const filteredPosts = posts.filter(
      (post) => post.risk === 'medium' || post.risk === 'high',
    );

    if (filteredPosts.length === 0) {
      alert('No medium or high-risk posts to export.');
      return;
    }

    const csvData = filteredPosts.map((post) => ({
      URL: post.link || 'No URL',
      Date: post.date ? new Date(post.date).toDateString() : 'No Date',
      Content: post.content || 'No Content',
      Source: post.source || 'No Source',
      Risk: post.risk ? post.risk.toUpperCase() : 'UNKNOWN',
    }));

    try {
      const csv = generateCsv(csvConfig)(csvData);
      const blob = new Blob([csv], { type: 'text/csv' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `risk_analysis_report_${
        new Date().toISOString().split('T')[0]
      }.csv`;
      a.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Error generating CSV:', error);
      alert('Error generating CSV file. Please try again.');
    }
  };

  return (
    <div className="flex flex-col gap-4 mt-6">
      {/* Actual implementation */}
      <div>
        <div className="flex gap-4">
          <button
            onClick={exportCSV}
            className="px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            Export CSV
          </button>
          <button
            onClick={exportPDF}
            className="bg-blue-500 px-4 py-2 bg-gradient-to-r from-teal-400 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 focus:outline-none focus:ring-teal-500"
          >
            Export PDF
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportRiskPDF;
