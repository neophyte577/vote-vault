export const bulkDataSections = [

    // 1. All candidates
    {
        title: "All candidates",
        description: "Summary financial information for all candidates who raised or spent money during the period.",
        links: [
            { year: "2025–2026", url: "all-candidates/weball26.zip" },
            { year: "2023–2024", url: "all-candidates/weball24.zip" },
            { year: "2021–2022", url: "all-candidates/weball22.zip" },
            { year: "2019–2020", url: "all-candidates/weball20.zip" },
            { year: "2017–2018", url: "all-candidates/weball18.zip" },
            { year: "2015–2016", url: "all-candidates/weball16.zip" },
            { year: "2013–2014", url: "all-candidates/weball14.zip" },
            { year: "2011–2012", url: "all-candidates/weball12.zip" },
            { year: "2009–2010", url: "all-candidates/weball10.zip" },
            { year: "2007–2008", url: "all-candidates/weball08.zip" },
            { year: "2005–2006", url: "all-candidates/weball06.zip" },
            { year: "2003–2004", url: "all-candidates/weball04.zip" },
            { year: "2001–2002", url: "all-candidates/weball02.zip" },
            { year: "1999–2000", url: "all-candidates/weball00.zip" },
            { year: "1997–1998", url: "all-candidates/weball98.zip" },
            { year: "1995–1996", url: "all-candidates/weball96.zip" },
            { year: "1993–1994", url: "all-candidates/weball94.zip" },
            { year: "1991–1992", url: "all-candidates/weball92.zip" },
            { year: "1989–1990", url: "all-candidates/weball90.zip" },
            { year: "1987–1988", url: "all-candidates/weball88.zip" },
            { year: "1985–1986", url: "all-candidates/weball86.zip" },
            { year: "1983–1984", url: "all-candidates/weball84.zip" },
            { year: "1981–1982", url: "all-candidates/weball82.zip" },
            { year: "1979–1980", url: "all-candidates/weball80.zip" }
        ],          
        dataDescription: "/campaign-finance-data/all-candidates-file-description/"
      },
    
      // 2. Candidate master
      {
        title: "Candidate master",
        description: "One record for each candidate registered with the FEC or listed by a state elections office.",
        links: [
            { year: "2025–2026", url: "candidate-master/cn26.zip" },
            { year: "2023–2024", url: "candidate-master/cn24.zip" },
            { year: "2021–2022", url: "candidate-master/cn22.zip" },
            { year: "2019–2020", url: "candidate-master/cn20.zip" },
            { year: "2017–2018", url: "candidate-master/cn18.zip" },
            { year: "2015–2016", url: "candidate-master/cn16.zip" },
            { year: "2013–2014", url: "candidate-master/cn14.zip" },
            { year: "2011–2012", url: "candidate-master/cn12.zip" },
            { year: "2009–2010", url: "candidate-master/cn10.zip" },
            { year: "2007–2008", url: "candidate-master/cn08.zip" },
            { year: "2005–2006", url: "candidate-master/cn06.zip" },
            { year: "2003–2004", url: "candidate-master/cn04.zip" },
            { year: "2001–2002", url: "candidate-master/cn02.zip" },
            { year: "1999–2000", url: "candidate-master/cn00.zip" },
            { year: "1997–1998", url: "candidate-master/cn98.zip" },
            { year: "1995–1996", url: "candidate-master/cn96.zip" },
            { year: "1993–1994", url: "candidate-master/cn94.zip" },
            { year: "1991–1992", url: "candidate-master/cn92.zip" },
            { year: "1989–1990", url: "candidate-master/cn90.zip" },
            { year: "1987–1988", url: "candidate-master/cn88.zip" },
            { year: "1985–1986", url: "candidate-master/cn86.zip" },
            { year: "1983–1984", url: "candidate-master/cn84.zip" },
            { year: "1981–1982", url: "candidate-master/cn82.zip" },
            { year: "1979–1980", url: "candidate-master/cn80.zip" }
        ],          
        dataDescription: "/campaign-finance-data/candidate-master-file-description/",
        headerFile: "data_dictionaries/cn_header_file.csv"
    },

    // 3. Candidate-committee linkages
    {
        title: "Candidate-committee linkages",
        description: "Each record links a candidate to a committee.",
        links: [
            { year: "2025–2026", url: "cand-comm-link/ccl26.zip" },
            { year: "2023–2024", url: "cand-comm-link/ccl24.zip" },
            { year: "2021–2022", url: "cand-comm-link/ccl22.zip" },
            { year: "2019–2020", url: "cand-comm-link/ccl20.zip" },
            { year: "2017–2018", url: "cand-comm-link/ccl18.zip" },
            { year: "2015–2016", url: "cand-comm-link/ccl16.zip" },
            { year: "2013–2014", url: "cand-comm-link/ccl14.zip" },
            { year: "2011–2012", url: "cand-comm-link/ccl12.zip" },
            { year: "2009–2010", url: "cand-comm-link/ccl10.zip" },
            { year: "2007–2008", url: "cand-comm-link/ccl08.zip" },
            { year: "2005–2006", url: "cand-comm-link/ccl06.zip" },
            { year: "2003–2004", url: "cand-comm-link/ccl04.zip" },
            { year: "2001–2002", url: "cand-comm-link/ccl02.zip" },
            { year: "1999–2000", url: "cand-comm-link/ccl00.zip" }
        ],          
        dataDescription: "/campaign-finance-data/candidate-committee-linkage-file-description/",
        headerFile: "data_dictionaries/ccl_header_file.csv"
    },

    // 4. House/Senate current campaigns
    {
        title: "House/Senate current campaigns",
        description: "One record for each campaign containing summary financial information.",
        links: [
            { year: "2025–2026", url: "congressional-campaigns/webl26.zip" },
            { year: "2023–2024", url: "congressional-campaigns/webl24.zip" },
            { year: "2021–2022", url: "congressional-campaigns/webl22.zip" },
            { year: "2019–2020", url: "congressional-campaigns/webl20.zip" },
            { year: "2017–2018", url: "congressional-campaigns/webl18.zip" },
            { year: "2015–2016", url: "congressional-campaigns/webl16.zip" },
            { year: "2013–2014", url: "congressional-campaigns/webl14.zip" },
            { year: "2011–2012", url: "congressional-campaigns/webl12.zip" },
            { year: "2009–2010", url: "congressional-campaigns/webl10.zip" },
            { year: "2007–2008", url: "congressional-campaigns/webl08.zip" },
            { year: "2005–2006", url: "congressional-campaigns/webl06.zip" },
            { year: "2003–2004", url: "congressional-campaigns/webl04.zip" },
            { year: "2001–2002", url: "congressional-campaigns/webl02.zip" },
            { year: "1999–2000", url: "congressional-campaigns/webl00.zip" },
            { year: "1997–1998", url: "congressional-campaigns/webl98.zip" },
            { year: "1995–1996", url: "congressional-campaigns/webl96.zip" }
        ],          
        dataDescription: "/campaign-finance-data/current-campaigns-house-and-senate-file-description/"
    },

    // 5. Committee master
    {
        title: "Committee master",
        description: "One record for each committee registered with the FEC, including PACs, party committees, and campaign committees.",
        links: [
            { year: "2025–2026", url: "committee-master/cm26.zip" },
            { year: "2023–2024", url: "committee-master/cm24.zip" },
            { year: "2021–2022", url: "committee-master/cm22.zip" },
            { year: "2019–2020", url: "committee-master/cm20.zip" },
            { year: "2017–2018", url: "committee-master/cm18.zip" },
            { year: "2015–2016", url: "committee-master/cm16.zip" },
            { year: "2013–2014", url: "committee-master/cm14.zip" },
            { year: "2011–2012", url: "committee-master/cm12.zip" },
            { year: "2009–2010", url: "committee-master/cm10.zip" },
            { year: "2007–2008", url: "committee-master/cm08.zip" },
            { year: "2005–2006", url: "committee-master/cm06.zip" },
            { year: "2003–2004", url: "committee-master/cm04.zip" },
            { year: "2001–2002", url: "committee-master/cm02.zip" },
            { year: "1999–2000", url: "committee-master/cm00.zip" },
            { year: "1997–1998", url: "committee-master/cm98.zip" },
            { year: "1995–1996", url: "committee-master/cm96.zip" },
            { year: "1993–1994", url: "committee-master/cm94.zip" },
            { year: "1991–1992", url: "committee-master/cm92.zip" },
            { year: "1989–1990", url: "committee-master/cm90.zip" },
            { year: "1987–1988", url: "committee-master/cm88.zip" },
            { year: "1985–1986", url: "committee-master/cm86.zip" },
            { year: "1983–1984", url: "committee-master/cm84.zip" },
            { year: "1981–1982", url: "committee-master/cm82.zip" },
            { year: "1979–1980", url: "committee-master/cm80.zip" }
        ],          
        dataDescription: "/campaign-finance-data/committee-master-file-description/",
        headerFile: "data_dictionaries/cm_header_file.csv"
    },

    // 6. PAC summary
    {
        title: "PAC summary",
        description: "Summary of receipts and disbursements for each PAC and party committee, including receipts by source and expenditure totals.",
        links: [
            { year: "2025–2026", url: "pac-summary/webk26.zip" },
            { year: "2023–2024", url: "pac-summary/webk24.zip" },
            { year: "2021–2022", url: "pac-summary/webk22.zip" },
            { year: "2019–2020", url: "pac-summary/webk20.zip" },
            { year: "2017–2018", url: "pac-summary/webk18.zip" },
            { year: "2015–2016", url: "pac-summary/webk16.zip" },
            { year: "2013–2014", url: "pac-summary/webk14.zip" },
            { year: "2011–2012", url: "pac-summary/webk12.zip" },
            { year: "2009–2010", url: "pac-summary/webk10.zip" },
            { year: "2007–2008", url: "pac-summary/webk08.zip" },
            { year: "2005–2006", url: "pac-summary/webk06.zip" },
            { year: "2003–2004", url: "pac-summary/webk04.zip" },
            { year: "2001–2002", url: "pac-summary/webk02.zip" },
            { year: "1999–2000", url: "pac-summary/webk00.zip" },
            { year: "1997–1998", url: "pac-summary/webk98.zip" },
            { year: "1995–1996", url: "pac-summary/webk96.zip" }
        ],          
        dataDescription: "/campaign-finance-data/pac-and-party-summary-file-description/"
    },

    // 7. Contributions by individuals
    {
        title: "Contributions by individuals",
        description: "Each contribution from an individual to a federal committee, including contributor information and amount.",
        links: [
            { year: "2025–2026", url: "individual-contributions/indiv26.zip" },
            { year: "2023–2024", url: "individual-contributions/indiv24.zip" },
            { year: "2021–2022", url: "individual-contributions/indiv22.zip" },
            { year: "2019–2020", url: "individual-contributions/indiv20.zip" },
            { year: "2017–2018", url: "individual-contributions/indiv18.zip" },
            { year: "2015–2016", url: "individual-contributions/indiv16.zip" },
            { year: "2013–2014", url: "individual-contributions/indiv14.zip" },
            { year: "2011–2012", url: "individual-contributions/indiv12.zip" },
            { year: "2009–2010", url: "individual-contributions/indiv10.zip" },
            { year: "2007–2008", url: "individual-contributions/indiv08.zip" },
            { year: "2005–2006", url: "individual-contributions/indiv06.zip" },
            { year: "2003–2004", url: "individual-contributions/indiv04.zip" },
            { year: "2001–2002", url: "individual-contributions/indiv02.zip" },
            { year: "1999–2000", url: "individual-contributions/indiv00.zip" },
            { year: "1997–1998", url: "individual-contributions/indiv98.zip" },
            { year: "1995–1996", url: "individual-contributions/indiv96.zip" },
            { year: "1993–1994", url: "individual-contributions/indiv94.zip" },
            { year: "1991–1992", url: "individual-contributions/indiv92.zip" },
            { year: "1989–1990", url: "individual-contributions/indiv90.zip" },
            { year: "1987–1988", url: "individual-contributions/indiv88.zip" },
            { year: "1985–1986", url: "individual-contributions/indiv86.zip" },
            { year: "1983–1984", url: "individual-contributions/indiv84.zip" },
            { year: "1981–1982", url: "individual-contributions/indiv82.zip" },
            { year: "1979–1980", url: "individual-contributions/indiv80.zip" }
        ],          
        dataDescription: "/campaign-finance-data/contributions-individuals-file-description/",
        headerFile: "data_dictionaries/indiv_header_file.csv"
    },

    // 8. Contributions from committees to candidates & independent expenditures
    {
        title: "Contributions from committees to candidates & independent expenditures",
        description: "Each contribution or independent expenditure made by a PAC, party committee, candidate committee, or other federal committee to a candidate.",
        links: [
            { year: "2025–2026", url: "committee-contributions/pas226.zip" },
            { year: "2023–2024", url: "committee-contributions/pas224.zip" },
            { year: "2021–2022", url: "committee-contributions/pas222.zip" },
            { year: "2019–2020", url: "committee-contributions/pas220.zip" },
            { year: "2017–2018", url: "committee-contributions/pas218.zip" },
            { year: "2015–2016", url: "committee-contributions/pas216.zip" },
            { year: "2013–2014", url: "committee-contributions/pas214.zip" },
            { year: "2011–2012", url: "committee-contributions/pas212.zip" },
            { year: "2009–2010", url: "committee-contributions/pas210.zip" },
            { year: "2007–2008", url: "committee-contributions/pas208.zip" },
            { year: "2005–2006", url: "committee-contributions/pas206.zip" },
            { year: "2003–2004", url: "committee-contributions/pas204.zip" },
            { year: "2001–2002", url: "committee-contributions/pas202.zip" },
            { year: "1999–2000", url: "committee-contributions/pas200.zip" },
            { year: "1997–1998", url: "committee-contributions/pas298.zip" },
            { year: "1995–1996", url: "committee-contributions/pas296.zip" },
            { year: "1993–1994", url: "committee-contributions/pas294.zip" },
            { year: "1991–1992", url: "committee-contributions/pas292.zip" },
            { year: "1989–1990", url: "committee-contributions/pas290.zip" },
            { year: "1987–1988", url: "committee-contributions/pas288.zip" },
            { year: "1985–1986", url: "committee-contributions/pas286.zip" },
            { year: "1983–1984", url: "committee-contributions/pas284.zip" },
            { year: "1981–1982", url: "committee-contributions/pas282.zip" },
            { year: "1979–1980", url: "committee-contributions/pas280.zip" }
        ],          
        dataDescription: "/campaign-finance-data/contributions-committees-candidates-file-description/",
        headerFile: "data_dictionaries/pas2_header_file.csv"
    },

    // 9. Any transaction from one committee to another
    {
        title: "Any transaction from one committee to another",
        description: "The itemized records (miscellaneous transactions) file contains all transactions (contributions, transfers, etc. among federal committees). It contains all data in the itemized committee contributions file plus PAC contributions to party committees, party transfers from state committee to state committee, and party transfers from national committee to state committee. This file only includes federal transfers not soft money transactions.",
        links: [
            { year: "2025–2026", url: "committee-transactions/oth26.zip" },
            { year: "2023–2024", url: "committee-transactions/oth24.zip" },
            { year: "2021–2022", url: "committee-transactions/oth22.zip" },
            { year: "2019–2020", url: "committee-transactions/oth20.zip" },
            { year: "2017–2018", url: "committee-transactions/oth18.zip" },
            { year: "2015–2016", url: "committee-transactions/oth16.zip" },
            { year: "2013–2014", url: "committee-transactions/oth14.zip" },
            { year: "2011–2012", url: "committee-transactions/oth12.zip" },
            { year: "2009–2010", url: "committee-transactions/oth10.zip" },
            { year: "2007–2008", url: "committee-transactions/oth08.zip" },
            { year: "2005–2006", url: "committee-transactions/oth06.zip" },
            { year: "2003–2004", url: "committee-transactions/oth04.zip" },
            { year: "2001–2002", url: "committee-transactions/oth02.zip" },
            { year: "1999–2000", url: "committee-transactions/oth00.zip" },
            { year: "1997–1998", url: "committee-transactions/oth98.zip" },
            { year: "1995–1996", url: "committee-transactions/oth96.zip" },
            { year: "1993–1994", url: "committee-transactions/oth94.zip" },
            { year: "1991–1992", url: "committee-transactions/oth92.zip" },
            { year: "1989–1990", url: "committee-transactions/oth90.zip" },
            { year: "1987–1988", url: "committee-transactions/oth88.zip" },
            { year: "1985–1986", url: "committee-transactions/oth86.zip" },
            { year: "1983–1984", url: "committee-transactions/oth84.zip" },
            { year: "1981–1982", url: "committee-transactions/oth82.zip" },
            { year: "1979–1980", url: "committee-transactions/oth80.zip" }
        ],          
        dataDescription: "/campaign-finance-data/any-transaction-one-committee-another-file-description/",
        headerFile: "data_dictionaries/oth_header_file.csv"
    },

    // 10. Operating expenditures
    {
        title: "Operating expenditures",
        description: "Disbursements reported on FEC Form 3 Line 17, Form 3P Line 23, and Form 3X Lines 21(a)(i), 21(a)(ii), and 21(b).",
        links: [
            { year: "2025–2026", url: "operating-expenditures/oppexp26.zip" },
            { year: "2023–2024", url: "operating-expenditures/oppexp24.zip" },
            { year: "2021–2022", url: "operating-expenditures/oppexp22.zip" },
            { year: "2019–2020", url: "operating-expenditures/oppexp20.zip" },
            { year: "2017–2018", url: "operating-expenditures/oppexp18.zip" },
            { year: "2015–2016", url: "operating-expenditures/oppexp16.zip" },
            { year: "2013–2014", url: "operating-expenditures/oppexp14.zip" },
            { year: "2011–2012", url: "operating-expenditures/oppexp12.zip" },
            { year: "2009–2010", url: "operating-expenditures/oppexp10.zip" },
            { year: "2007–2008", url: "operating-expenditures/oppexp08.zip" },
            { year: "2005–2006", url: "operating-expenditures/oppexp06.zip" },
            { year: "2003–2004", url: "operating-expenditures/oppexp04.zip" }
        ],          
        dataDescription: "/campaign-finance-data/operating-expenditures-file-description/",
        headerFile: "data_dictionaries/oppexp_header_file.csv"
    },

    // // 11. Electronically filed reports (.fec files)
    // {
    //     title: "Electronically filed reports (.fec files)",
    //     description: "Daily compilation of electronically filed reports and statements.",
    //     links: [
    //         {
    //             year: "Formats and metadata",
    //             url: "https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/electronic/eFilingFormats.zip"
    //         },
    //         {
    //             year: "Download files by day",
    //             url: "https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/index.html?prefix=bulk-downloads/electronic/"
    //         }
    //     ]
    // },

    // // 12. Paper filed reports (.fec files)
    // {
    //     title: "Paper filed reports (.fec files)",
    //     description: "Official campaign finance disclosure filings for paper filers. If there are discrepancies between the paper report and the electronic data file, the paper report takes precedence.",
    //     links: [
    //         {
    //             year: "Formats and metadata",
    //             url: "https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/paper/PaperFormats.zip"
    //         },
    //         {
    //             year: "Download files by day",
    //             url: "https://cg-519a459a-0ea3-42c2-b7bc-fa1143481f74.s3-us-gov-west-1.amazonaws.com/bulk-downloads/index.html?prefix=bulk-downloads/paper/"
    //         }
    //     ]
    // }
];

