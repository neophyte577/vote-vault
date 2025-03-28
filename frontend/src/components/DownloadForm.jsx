import $ from "jquery";
import { useEffect } from "react";
import { AnimatedDownloadButton } from "../animations/AnimatedDownloadButton";
import {Check, Download} from "lucide-react";
import { BorderBeam } from "../animations/BorderBeam";

const DownloadForm = () => {
    useEffect(() => {
        window.$ = window.jQuery = $;

        const script = document.createElement("script");
        script.src = "/static/downloadFormHandler.js";
        script.async = true;
        script.onload = () => console.log("Script loaded successfully!");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    return (
        <section id='download' className="min-h-screen flex items-center justify-center py-20 text-softVanilla mt-10">
            <div className="relative justify-center text-lg px-4 w-full max-w-115 min-w-[300px] md:w-[500px] sm:w-2/3 p-6 bg-[rgba(15,15,15,0.65)] border border-white/10 rounded shadow-lg">
            <BorderBeam
                colorFrom="#FFF5E1"
                colorTo="#FCE5B1"
                size={140}
                duration={12}
            />
                <h2 className="text-3xl font-bold text-paleHoney text-center pb-1">Download Data</h2>
                <form className="relative" action="/download" method="get">

                    <div className="relative mt-3">
                        <label htmlFor="category" className="block mb-2">Data Category:</label>
                        <select id="category" name="category" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                            <option value="finance">FEC Campaign Finance Data</option>
                            <option value="election">Federal Election Outcome Data</option>
                        </select>
                    </div>
                    
                    <div className="relative mt-3">
                        <label htmlFor="cycle" className="block mb-2">Election Cycle:</label>
                        <select id="cycle" name="cycle" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5"></select>
                    </div>

                    <div id="financeOptions" data-show="finance" className="relative mt-3">
                        <div className="relative">
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
                    </div>

                    <div id="electionOptions" data-show="election" className="relative mt-3">
                        <div className="relative">
                            <label htmlFor="race" className="block mb-2">Race:</label>
                            <select id="race" name="race" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                                <option value="president">President</option>
                                <option value="house">House</option>
                                <option value="senate">Senate</option>
                            </select>
                        </div>
                        
                        <div className="relative">
                            <label htmlFor="state" className="block mb-2">State:</label>
                            <select id="state" name="state" className="w-full bg-white/5 border border-white/10 rounded px-4 py-3 focus:outline-none focus:border-paleHoney focus:bg-blue-500/5">
                                <option value="nationwide">Nationwide</option>
                            </select>
                        </div>
                    </div>

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
