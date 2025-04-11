export default function TableComponent({ data }) {
    if (!Array.isArray(data) || data.length === 0) {
      return <p className="text-sm text-gray-500">No data available.</p>;
    }
  
    const columns = Object.keys(data[0]);
  
    return (
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm text-left border border-gray-300">
          <thead className="bg-black uppercase font-semibold text-paleHoney">
            <tr>
              {columns.map((col) => (
                <th key={col} className="px-4 py-2 border-b whitespace-nowrap">
                  {col.replace(/([A-Z])/g, ' $1').replace(/^./, s => s.toUpperCase())}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {data.map((row, idx) => (
              <tr key={idx} className="odd:bg-mutedBlack even:bg-graphite">
                {columns.map((col) => (
                  <td key={col} className="px-4 py-2 border-b whitespace-pre-line">
                    {col.toLowerCase().includes('description') && row[col] ? (
                      <span dangerouslySetInnerHTML={{ __html: row[col] }} />
                    ) : (
                      row[col] ?? <em className="text-gray-400">None</em>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
  