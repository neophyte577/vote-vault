import { useEffect, useState } from "react";
import { AnimatedDownloadButton } from "../animations/AnimatedDownloadButton";
import { Check, Download } from "lucide-react";
import { BorderBeam } from "../animations/BorderBeam";

const DownloadForm = () => {
    const [category, setCategory] = useState("finance");
    const [cycles, setCycles] = useState([]);
    const [states, setStates] = useState([]);

    useEffect(() => {
        const yearList = Array.from({ length: 13 }, (_, i) => 2000 + i * 2).reverse();
        setCycles(yearList);

        const stateList = [
            "Alabama", "Alaska", "Arizona", "Arkansas", "California",
            "Colorado", "Connecticut", "Delaware", "Florida", "Georgia",
            "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa",
            "Kansas", "Kentucky", "Louisiana", "Maine", "Maryland",
            "Massachusetts", "Michigan", "Minnesota", "Mississippi", "Missouri",
            "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey",
            "New Mexico", "New York", "North Carolina", "North Dakota", "Ohio",
            "Oklahoma", "Oregon", "Pennsylvania", "Rhode Island", "South Carolina",
            "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
            "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
        ];
        setStates(stateList);
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const form = e.target;
        const formData = new FormData(form);
        const params = new URLSearchParams();

        const category = formData.get("category");
        const cycle = formData.get("cycle");
        const filetype = formData.get("filetype");

        params.append("category", category);
        params.append("cycle", cycle);
        params.append("filetype", filetype);

        if (category === "finance") {
            params.append("dataset", formData.get("dataset"));
        } else if (category === "election") {
            params.append("race", formData.get("race"));
            params.append("state", formData.get("state"));
        }

        const response = await fetch(`/download?${params.toString()}`);
        const result = await response.json();

        if (result.download_url) {
            window.location.href = result.download_url;
        } else if (result.redirect_url) {
            window.open(result.redirect_url, "_blank");
        } else {
            alert("File not found or an error occurred.");
        }
    };

    return (
        <section id="download" className="flex md:max-w-105 items-center justify-center text-softVanilla">
            <div className="relative justify-center text-lg px-4 w-full max-w-115 min-w-[300px] md:w-[500px] sm:w-2/3 p-6 bg-[rgba(15,15,15,0.65)] border border-white/10 rounded shadow-lg">
                <BorderBeam colorFrom="#FFF5E1" colorTo="#FCE5B1" size={140} duration={12} />
                <h2 className="text-3xl font-bold text-paleHoney text-center pb-1">Download Data</h2>
                <form className="relative" onSubmit={handleSubmit}>
                    <div className="relative mt-3">
                        <label htmlFor="category" className="block mb-2">Data Category:</label>
                        <select id="category" name="category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                            <option value="finance">FEC Campaign Finance Data</option>
                            <option value="election">Federal Election Outcome Data</option>
                        </select>
                    </div>

                    <div className="relative mt-3">
                        <label htmlFor="cycle" className="block mb-2">Election Cycle:</label>
                        <select id="cycle" name="cycle" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                            {cycles.map((year) => (
                                <option key={year} value={year}>{`${year - 1}-${year}`}</option>
                            ))}
                        </select>
                    </div>

                    {category === "finance" && (
                        <div className="relative mt-3">
                            <label htmlFor="dataset" className="block mb-2">Dataset:</label>
                            <select id="dataset" name="dataset" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                                <option value="candidate_summary">Candidate Summary</option>
                                <option value="candidate_master">Candidate Master</option>
                                <option value="cand_comm_linkage">Candidate-Committee Linkages</option>
                                <option value="congressional_campaigns">Congressional Campaigns</option>
                                <option value="committee_master">Committee Master</option>
                                <option value="pac_summary">PAC Summary</option>
                                <option value="individual_contributions">Individual Contributions</option>
                                <option value="committee_contributions">Committee Contributions</option>
                                <option value="committee_transactions">Committee Transactions</option>
                                <option value="operating_expenditures">Operating Expenditures</option>
                            </select>
                        </div>
                    )}

                    {category === "election" && (
                        <div className="relative mt-3">
                            <label htmlFor="race" className="block mb-2">Race:</label>
                            <select id="race" name="race" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                                <option value="president">President</option>
                                <option value="house">House</option>
                                <option value="senate">Senate</option>
                            </select>
                            <label htmlFor="state" className="block mt-3 mb-2">State:</label>
                            <select id="state" name="state" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                                <option value="nationwide">Nationwide</option>
                                {states.map((state) => (
                                    <option key={state} value={state.toLowerCase().replace(/\s+/g, '_')}>{state}</option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="relative mt-3">
                        <label htmlFor="filetype" className="block mb-2">File Type:</label>
                        <select id="filetype" name="filetype" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                            <option value="csv">CSV</option>
                            <option value="xlsx">Excel</option>
                            <option value="parquet">Parquet</option>
                        </select>
                    </div>

                    <div className="flex justify-center mt-6">
                        <AnimatedDownloadButton type="submit" className="w-auto min-w-75 max-w-125 bg-paleHoney text-black py-3 px-6 rounded font-medium transition-colors duration-200 relative overflow-hidden hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(59, 130, 246, 0.4)] hover:bg-butterCream active:bg-mutedAmber">
                            <span className="flex items-center gap-2">
                                Download <Download size={18} />
                            </span>
                            <span className="flex items-center gap-1">
                                <Check size={18} /> Downloading...
                            </span>
                        </AnimatedDownloadButton>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default DownloadForm;
