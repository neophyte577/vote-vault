import { useState, useEffect } from "react";

export default function TableComponent({ data }) {
  if (!Array.isArray(data) || data.length === 0) {
    return <p className="text-sm text-paleHoney">No data available.</p>;
  }

  const columns = Object.keys(data[0]);

  const TruncatedCell = ({ content, defaultMax = 80, mobileMax = 25 }) => {
    const [expanded, setExpanded] = useState(false);
    const [maxLength, setMaxLength] = useState(defaultMax);

    useEffect(() => {
      const updateLength = () => {
        if (window.innerWidth < 640) {
          setMaxLength(mobileMax); // Tailwind 'sm' breakpoint is 640px
        } else {
          setMaxLength(defaultMax);
        }
      };

      updateLength();
      window.addEventListener("resize", updateLength);
      return () => window.removeEventListener("resize", updateLength);
    }, [defaultMax, mobileMax]);

    const isTruncatable = content?.length > maxLength;

    const toggle = (e) => {
      e.stopPropagation();
      setExpanded(!expanded);
    };

    return (
      <div className="relative group">
        <div
          className="inline"
          dangerouslySetInnerHTML={{
            __html:
              expanded || !isTruncatable
                ? content
                : `${content.slice(0, maxLength)}<span class='text-paleHoney'>...</span>`,
          }}
        />
        {isTruncatable && (
          <button
            onClick={toggle}
            className="inline-block ml-1 transition-transform duration-200 text-paleHoney hover:text-mutedAmber"
            aria-label="Toggle expansion"
          >
            <span className={`inline-block transform ${expanded ? "rotate-180" : ""}`}>
              ▼
            </span>
          </button>
        )}
      </div>
    );
  };

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left border border-paleHoney">
        <thead className="bg-black uppercase font-semibold text-paleHoney">
          <tr>
            {columns.map((col) => (
              <th
                key={col}
                className={`px-4 py-2 border-b whitespace-nowrap ${
                  col.toLowerCase().includes("description")
                    ? "min-w-[30ch] md:min-w-[300px]"
                    : ""
                }`}
              >
                {col.replace(/([A-Z])/g, " $1").replace(/^./, (s) => s.toUpperCase())}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.map((row, idx) => (
            <tr key={idx} className="odd:bg-mutedBlack even:bg-graphite">
              {columns.map((col) => (
                <td
                  key={col}
                  className={`px-4 py-2 border-b whitespace-pre-line ${
                    col.toLowerCase().includes("description")
                      ? "min-w-[30ch] md:min-w-[300px]"
                      : ""
                  }`}
                >
                  {col.toLowerCase().includes("description") && row[col] ? (
                    <TruncatedCell content={row[col]} />
                  ) : row[col] ?? <em className="text-paleHoney">None</em>}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
