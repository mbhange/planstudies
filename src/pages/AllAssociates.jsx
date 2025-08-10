import React, { useState, useMemo, lazy, Suspense } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { AcademicCapIcon } from '@heroicons/react/24/solid';

const data = {
  Canada: [
    "Acadia University",
    "Alexander College",
    "Algoma University",
    "Algonquin College",
    "Assiniboine Community College",
    "Bow Valley College",
    "Brandon University",
    "Brock University",
    "Cambrian College",
    "Canadore College",
    "Cape Breton University",
    "Capilano University",
    "Carleton University",
    "Centennial College",
    "College of New Caledonia",
    "College of the Rockies",
    "Conestoga College",
    "Confederation College",
    "Coquitlam College",
    "Crandall University",
    "Dalhousie University",
    "Douglas College",
    "Durham College",
    "Eton College",
    "Fairleigh Dickinson University - Vancouver",
    "Fanshawe College",
    "Fleming College",
    "Fraser International College",
    "George Brown College",
    "Georgian College",
    "Great Plains College",
    "Holland College",
    "Humber College",
    "International Business University (IBU)",
    "International College of Manitoba",
    "Justice Institute of British Columbia (JIBC)",
    "Kingswood University",
    "Kwantlen Polytechnic University (KPU)",
    "Lakehead University",
    "Lakeland College",
    "Lambton College",
    "Lethbridge Polytechnic",
    "Loyalist College",
    "Manitoba Institute of Trades and Technology (MITT)",
    "McMaster University",
    "Memorial University of Newfoundland",
    "Mohawk College",
    "Mount Allison University",
    "Mount Royal University",
    "Mount Saint Vincent University",
    "NAIT (Northern Alberta Institute of Technology)",
    "New Brunswick Community College",
    "New York Institute of Technology – Vancouver",
    "Niagara College",
    "Nippissing University",
    "NorQuest College",
    "Northeastern University",
    "Northern College",
    "Northern Lakes College",
    "Northern Lights College",
    "Olds College",
    "Ontario Tech University",
    "Portage College",
    "Queen’s College",
    "Red River College Polytechnic ",
    "Rocky Mountain College",
    "Saint Mary’s University",
    "Saskatchewan Polytechnic",
    "Sault College of Applied Arts and Technology",
    "Selkirk College",
    "Seneca Polytechnic",
    "Sheridan College",
    "Southern Alberta Institute of Technology (SAIT)",
    "St. Clair College",
    "St. Francis Xavier University",
    "St. Francis Xavier University (StFX)",
    "St. Lawrence College",
    "St. Mary’s University",
    "St. Thomas University",
    "Testing Institute",
    "The King’s University",
    "Thompson Rivers University",
    "Toronto Metropolitan University International College (TMUIC)",
    "Trent University",
    "Trinity Western University",
    "ULethbridge International College Calgary",
    "University Canada West",
    "University of Alberta",
    "University of Calgary",
    "University of Fraser Valley",
    "University of Guelph",
    "University of Lethbridge",
    "University of Manitoba",
    "University of New Brunswick",
    "University of Niagara Falls",
    "University of Northern British Columbia",
    "University of Ottawa",
    "University of Prince Edward Island",
    "University of Regina",
    "University of Saskatchewan",
    "University of Toronto",
    "University of Waterloo",
    "University of Windsor",
    "University of Winnipeg",
    "University of the Fraser Valley",
    "Western University",
    "Wilfrid Laurier International College (WLIC)",
    "Wilfrid Laurier University",
    "York University",
    "Yorkville University",
    "Yukon University",
    "lasalle college vancouver"
  ],
  USA: [
    "Adelphi University",
    "American University",
    "Anderson University",
    "Arizona State University",
    "Arkansas State University",
    "Atlantis University",
    "Auburn University - Montgomery",
    "Austin College",
    "Avila University",
    "Barton College",
    "Bay Atlantic University",
    "Bellarmine University",
    "Bellevue College",
    "Belmont University",
    "Berkeley College",
    "Binghamton University",
    "Bowling Green State University",
    "Bradley University",
    "Brandeis International Business School",
    "Bridgewater College",
    "Bridgewater State University",
    "Bryant University",
    "California State University",
    "Capital University",
    "Central Methodist University",
    "Central Michigan University",
    "City University of Seattle",
    "Clarkson University",
    "Cleveland State University",
    "Colorado Mesa University",
    "Colorado State University",
    "Community College of Philadelphia",
    "Concordia University Chicago",
    "Dallas Baptist University",
    "DePaul University",
    "Devry University",
    "Drew University",
    "Drexel University",
    "Duke University",
    "Duquesne University",
    "East Tennessee State University",
    "Eastern Michigan University",
    "Elmhurst University",
    "Embry-Riddle Aeronautical University",
    "Fairfield University",
    "Fairleigh Dickinson University",
    "Felician University",
    "Ferris State University",
    "Fisher College",
    "Florida Agricultural and Mechanical University",
    "Florida Atlantic University",
    "Florida Institute of Technology",
    "Florida International University",
    "Fox Valley Technical college",
    "Full Sail University",
    "Gannon University",
    "George Mason University",
    "Golden Gate University",
    "Golden West College",
    "Gonzaga University",
    "Governors State University",
    "Grand Valley State University",
    "Green River College",
    "Greensboro College",
    "Harrisburg University of Science and Technology",
    "Hartwick College",
    "Hawaii Pacific University",
    "Herzing University",
    "Highline College",
    "Hofstra University",
    "Hult International Business School",
    "Illinois College",
    "Illinois Institute of Technology",
    "Illinois State University",
    "Indiana Institute of Technology",
    "Indiana University of Pennsylvania",
    "International American University Los Angeles",
    "Iowa State University (Only UG)",
    "Jacksonville University",
    "James Madison University",
    "Johns Hopkins University",
    "Kansas State University",
    "Kent State University",
    "LIM College",
    "Lake Washington Institute of Technology",
    "Lakeland University",
    "Lasell University",
    "Lawrence Technological University",
    "Lewis University",
    "Liberty University",
    "Lipscomb University",
    "Long Island University",
    "Louisiana State University",
    "Marquette University",
    "Marshall University",
    "Massachusetts College of Pharmacy and Health Sciences",
    "Menlo College",
    "Miami University",
    "Middle Georgia State University",
    "Middle Tennessee State University",
    "Midway University",
    "Midwestern State University Texas",
    "Minnesota State University",
    "Mississippi State University",
    "Missouri University of Science and Technology",
    "Monmouth University",
    "Monroe College",
    "Montana State University",
    "Moravian University",
    "Mount Saint Mary's University",
    "Murray State University",
    "NYU School of Professional Studies",
    "National Louis University",
    "New England College",
    "New Jersey Institute of Technology",
    "New York Film Academy",
    "New York Institute of Technology",
    "Northeastern Illinois University",
    "Northeastern University (Bostan)",
    "Northern Arizona University",
    "Northwest Missouri State University",
    "Northwood University (Michigan)",
    "Nova Southeastern University",
    "Ohio Dominican University",
    "Ohio University (Only UG)",
    "Ohio Wesleyan University",
    "Oklahoma City University",
    "Oklahoma State University",
    "Oregon State University",
    "Pace University",
    "Pacific Lutheran University",
    "Pacific States University",
    "Palm Beach Atlantic University",
    "Pittsburg State University",
    "Portland State University",
    "Purdue University - Northwest",
    "Queens College of The City University of New York",
    "Radford University",
    "Rider University",
    "Rivier University",
    "Roanoke College",
    "Robert Morris University",
    "Rochester Institute of Technology",
    "Roosevelt University",
    "Rose-Hulman Institute of Technology",
    "Rowan University",
    "Rutgers University -Camden",
    "SUNY Brockport",
    "SUNY Buffalo State College",
    "Sacred Heart University",
    "Saint Joseph's College of Maine",
    "Saint Leo University",
    "Saint Louis University",
    "Saint Peter's University",
    "Salem University (West Virginia)",
    "San Francisco State University",
    "San Jose State University",
    "Schiller International University (USA)",
    "Seattle Pacific University",
    "Seattle University",
    "Shenandoah University",
    "Simmons University",
    "Sinclair Community College",
    "Sonoma State University",
    "South Dakota School of Mines and Technology",
    "Southeast Missouri State University",
    "Southern Illinois University",
    "Southern New Hampshire University",
    "Southwest Minnesota State University",
    "Southwestern University",
    "St. Francis College",
    "St. John's University",
    "State University of New York",
    "Stephen F. Austin State University",
    "Stevens Institute of Technology",
    "Suffolk University",
    "Tennessee Tech University",
    "Texas A & M University",
    "Texas Tech University",
    "Texas Wesleyan University",
    "The University of Alabama Tuscaloosa",
    "The University of Central Florida",
    "The University of Houston at Clear Lake",
    "The University of Kansas – (UG Only)",
    "The University of Nevada, Las Vegas",
    "The University of Scranton",
    "The University of Tennessee",
    "The University of Toledo",
    "The University of Tulsa",
    "Thomas Jefferson University",
    "Tiffin University",
    "Towson University",
    "Trine University",
    "Troy University",
    "Tulane University",
    "UMass Amherst",
    "University at Albany - SUNY",
    "University at Buffalo",
    "University of Alabama at Birmingham",
    "University of Arizona",
    "University of Bridgeport",
    "University of Central Missouri",
    "University of Central Oklahoma",
    "University of Cincinnati",
    "University of Colorado",
    "University of Connecticut (Only UG)",
    "University of Dayton",
    "University of Delaware",
    "University of Dubuque",
    "University of Findlay",
    "University of Hartford",
    "University of Houston",
    "University of Illinois",
    "University of Indianapolis",
    "University of Lynchburg",
    "University of Mary Hardin - Baylor",
    "University of Maryland Baltimore County",
    "University of Massachusetts",
    "University of Memphis",
    "University of Michigan-Flint",
    "University of Missouri St. Louis",
    "University of Nebraska Omaha",
    "University of Nevada Reno",
    "University of New Hampshire",
    "University of New Haven",
    "University of New Mexico",
    "University of North Alabama",
    "University of North Carolina Wilmington",
    "University of North Texas",
    "University of South Alabama",
    "University of South Carolina",
    "University of Tampa",
    "University of Utah",
    "University of West Alabama",
    "University of West Florida - Pensacola",
    "University of Wisconsin",
    "University of Wyoming",
    "University of the Incarnate Word",
    "University of the Pacific",
    "Utah Tech University",
    "Valparaiso University",
    "Virginia Wesleyan University",
    "Washington & Jefferson College",
    "Washington State University",
    "Webster University",
    "Wentworth Institute of Technology",
    "West Virginia University",
    "Westcliff University",
    "Western Illinois University",
    "Western Kentucky University",
    "Western Michigan University",
    "Western New England",
    "Western Oregon University",
    "Western Washington University",
    "Westfield State University",
    "Wichita State University",
    "Wilkes University",
    "William Paterson University",
    "Wilmington University",
    "Woodbury University",
    "Wright State University",
    "Yeshiva University",
    "York College of Pennsylvania",
    "Youngstown State University"
  ],
  UK: [
    "Abertay University",
    "Aberystwyth University",
    "Anglia Ruskin University",
    "Anglia Ruskin University College",
    "Aston University",
    "Bangor University",
    "Bath Spa University",
    "Birkbeck University of London",
    "Birmingham City University",
    "Birmingham City University International College",
    "Brunel University London",
    "Brunel University London Pathway College",
    "Buckinghamshire New University",
    "Cardiff Metropolitan University",
    "Cardiff University",
    "Cardiff University International Study Centre",
    "Coventry University",
    "Cranfield University",
    "De Montfort University",
    "Durham University",
    "Durham University International Study Centre",
    "Edge Hill University",
    "Edinburgh Napier University",
    "Glasgow Caledonian University",
    "Harper Adams University",
    "Heriot-Watt University",
    "Hertfordshire International College",
    "International College Portsmouth",
    "International College Robert Gordon University",
    "Kings College London",
    "Kingston University International Study Centre",
    "Lancaster University",
    "Leeds Beckett University",
    "Leeds Beckett University International Study Centre",
    "Leeds Trinity University",
    "Leicester Global Study Centre",
    "Liverpool John Moores University International Study Centre",
    "London Metropolitan University",
    "Manchester Metropolitan University",
    "Middlesex University",
    "Northumbria University",
    "Nottingham Trent University",
    "Oxford Brookes University",
    "Queen's University Belfast",
    "Ravensbourne University",
    "Regent's University London",
    "Royal Agriculture University",
    "Royal Holloway University of London",
    "Royal Holloway University of London International Study Centre",
    "Sheffield Hallam University",
    "Solent University",
    "Staffordshire University",
    "Teesside University",
    "Teesside University International Study Centre",
    "The College Swansea University",
    "Ulster University",
    "University Academy 92",
    "University College Birmingham",
    "University of Aberdeen",
    "University of Aberdeen International Study Centre",
    "University of Bedfordshire",
    "University of Bradford",
    "University of Brighton",
    "University of Buckingham",
    "University of Central Lancashire",
    "University of Chester",
    "University of Chichester",
    "University of Derby",
    "University of Dundee",
    "University of East Anglia",
    "University of East London",
    "University of Essex",
    "University of Exeter",
    "University of Greenwich",
    "University of Hertfordshire",
    "University of Huddersfield",
    "University of Huddersfield International Study Centre",
    "University of Law",
    "University of Leeds International Study Centre",
    "University of Leicester",
    "University of Lincoln",
    "University of Liverpool",
    "University of Newcastle",
    "University of Northampton International College",
    "University of Plymouth",
    "University of Plymouth International College",
    "University of Portsmouth",
    "University of Reading",
    "University of Roehampton",
    "University of Salford",
    "University of Sheffield International Study Centre",
    "University of South Wales",
    "University of Stirling",
    "University of Strathclyde International Study Centre",
    "University of Sunderland",
    "University of Surrey",
    "University of Surrey International Study Centre",
    "University of Sussex",
    "University of Sussex International Study Centre",
    "University of Wales Trinity Saint David",
    "University of West England Bristol",
    "University of West London",
    "University of West of Scotland",
    "University of Westminster",
    "University of Winchester",
    "University of Worcester",
    "Wrexham Glyndwr University",
    "York St John University"
  ],
  Australia: [
    "Australian Catholic University",
    "Australian National University",
    "Bond University",
    "CIC Higher Education",
    "Central Queensland University",
    "Charles Darwin University",
    "Charles Sturt University",
    "Curtin College",
    "Curtin University",
    "Deakin College",
    "Deakin University",
    "Edith Cowan College",
    "Edith Cowan University",
    "Eynesbury College",
    "Federation University",
    "Flinders University",
    "Griffith College",
    "Griffith University",
    "James Cook University",
    "La Trobe College",
    "La Trobe University",
    "Macquarie University",
    "Monash University",
    "Murdoch University",
    "Queensland University of Technology",
    "RMIT University",
    "South Australian Institute of Business & Technology College",
    "Southern Cross University",
    "Swinburne University of Technology",
    "Sydney Institute of Business & Technology College",
    "The University of Notre Dame Australia",
    "The University of Queensland",
    "Torrens University",
    "University of Adelaide",
    "University of Canberra",
    "University of Canberra College",
    "University of Melbourne",
    "University of New South Wales",
    "University of Newcastle (AU)",
    "University of South Australia",
    "University of Southern Queensland",
    "University of Sunshine Coast",
    "University of Sydney",
    "University of Tasmania",
    "University of Technology Sydney",
    "University of Western Australia",
    "University of Wollongong",
    "Victoria University",
    "Western Sydney University",
    "Western Sydney University International College"
  ],
  "New Zealand": [
    "AGI Education Limited",
    "Ara Institute Of Canterbury",
    "Auckland Institute of Studies",
    "Auckland University of Technology"
  ],
  Germany: [
    "Accadis Hochschule Bad Homburg - University of Applied Sciences",
    "Arden University",
    "Berlin School of Business and Innovation (BSBI)",
    "CBS International Business School",
    "Constructor University",
    "EBS University",
    "EIIE Eurasia Institute for International Education GMBH",
    "EU Business School",
    "FOM University of Applied Sciences for Economics and Management",
    "Fresenius University of Applied Sciences",
    "GISMA University of Applied Sciences",
    "Heidelberg University",
    "International Graduate Center - Hochschule Bremen",
    "International School of Management",
    "International University of Applied Sciences—IU",
    "Macromedia University of Applied Sciences",
    "Media Design University of Applied Sciences",
    "Munich Business School",
    "New European College",
    "Northern Institute of Technology Management (NIT)",
    "SRH Berlin University of Applied Sciences",
    "Steinbeis School of Management and Innovation",
    "Steinbeis University – Schools of Next Practices",
    "Technical university of Munich",
    "Th Ingolstadt",
    "University Targu Mures Medical Campus, Hamburg (UMCH)",
    "University of Bonn",
    "University of Europe for Applied Sciences"
  ],
  France: [
    "Burgundy School of Business",
    "College de Paris",
    "De Vinci Higher Education",
    "ECE Engineering School",
    "EM Normandie",
    "EPITA- Graduate School of Computer Science",
    "ESC Clermont Business School",
    "ESCE International Business School",
    "ESSCA School of Management",
    "Ecole Ducasse",
    "Ecole Nationale Supérieure des Mines d'Alès - IMT",
    "Esigelec Graduate School of Engineering",
    "Excelia Group, La Rochelle",
    "HEIP, School of International and Political Studies",
    "ICN Business School",
    "ICN International College",
    "IDRAC Business School, France",
    "INSEEC Business School",
    "ISTEC School of Marketing",
    "Institut supérieur d`électronique de Paris (ISEP)",
    "Institut supérieur du commerce de Paris - ISC",
    "Istituto Marangoni France",
    "KEDGE Business School",
    "Le Cordon Bleu",
    "Montpellier Business School",
    "NEOMA Business School",
    "Paris School of Business",
    "Queen Mary University of London Institute in Paris",
    "Rennes School of Business",
    "Schiller International University",
    "Skema Business School",
    "TBS Education",
    "École de Management Appliqué"
  ],
  Italy: [
    "Catholic University of the Sacred Heart",
    "DOMUS Academy",
    "Istituto Europeo di Design - IED",
    "Istituto Marangoni Italy",
    "LUISS Guido Carli",
    "NABA-Nuova Accademia Di Belle Arti",
    "Polytechnic Institute of Bari",
    "Polytechnic University of Milan",
    "Polytechnic University of Turin",
    "Polytechnical University of Marche Ancona",
    "Raffles Milano Intituto Moda e Design",
    "Sapienza University of Rome",
    "Scuola Politecnica di Design - SPD",
    "University of Bari Aldo Moro Bari",
    "University of Bologna",
    "University of Brescia",
    "University of Catania",
    "University of Ferrara",
    "University of Florence",
    "University of Genoa Genoa",
    "University of Milan",
    "University of Milano-Bicocca",
    "University of Modena and Reggio Emilia",
    "University of Naples Federico II",
    "University of Padua",
    "University of Palermo",
    "University of Pavia",
    "University of Trieste",
    "Vita-Salute San Raffaele University"
  ],
  Finland: [
    "Aalto University",
    "Abo Akademi University",
    "Arcada University of Applied Sciences",
    "Haaga-Helia University of Applied Sciences",
    "Hanken School of Economics",
    "Jyväskylä University of Applied Sciences",
    "Kajaani University of Applied Sciences",
    "Karelia University of Applied Sciences",
    "LAB University of Applied Sciences",
    "LUT University, Lappeenranta",
    "Lappeenranta-Lahti University of Technology",
    "Laurea University of Applied Sciences",
    "Metropolia University of Applied Science",
    "Novia University of Applied Sciences",
    "Oulu University of Applied Sciences",
    "Satakunta University of Applied Sciences - SAMK",
    "Seinäjoki University of Applied Sciences",
    "South-Eastern Finland University of Applied Sciences, XAMK",
    "Tampere University",
    "Tampere University of Applied Sciences (TAMK)",
    "Tampere University of Technology Joensuu",
    "Turku University of Applied Sciences",
    "University of Eastern Finland",
    "University of Jyväskylä",
    "University of Turku",
    "University of Vaasa",
    "University of the Arts Helsinki Jyväskylä",
    "Vaasa University of Applied Sciences VAMK"
  ],
  Malta: [
    "Advenio eAcademy Pieta",
    "American University of Malta",
    "College De Paris, Malta Campus ( Ascencia, Malta )",
    "Domain Academy",
    "EIE European Business School",
    "European Forensic Institute Msida",
    "European Graduate School Valletta",
    "Global Business School, Malta",
    "Global College Malta",
    "IDEA Academy (Malta Campus)",
    "Institute of Tourism Studies",
    "International European University, Malta",
    "Learn Key Training Institute",
    "LearnKey Institute, Malta",
    "London School of Commerce, Malta",
    "MCAST, Malta",
    "Malta Leadership Insitute",
    "Pegaso International",
    "Queen Mary University of London",
    "Saint Martin's Institute of Higher Education Malta",
    "University of Malta"
  ],
  Hungary: ["International Business School (IBS), Hungary"],
  Ireland: ["IBAT College Dublin"],
  Netherlands: ["Wittenborg University of Applied Sciences", "Tio business school"],
  Poland: ["Vistula University", "WSB University"],
  Russia: ["Synergy University"],
  Spain: [
    "Barcelona Technology School (BTS), Spain",
    "IHMGS International School",
    "International Hotel Management & Gastronomy School (IHMGS) - Spain"
  ],
  UAE: ["Britts Imperial University College", "Westford University College"]
};

const ITEMS_PER_PAGE = 9;


export default function AllAssociates() {
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);

  const allCountries = ["All", ...Object.keys(data)];

  const filteredUniversities = useMemo(() => {
    let result = [];

    Object.entries(data).forEach(([country, universities]) => {
      if (selectedCountry === "All" || selectedCountry === country) {
        universities.forEach((university) => {
          if (university.toLowerCase().includes(search.toLowerCase())) {
            result.push({ name: university, country });
          }
        });
      }
    });

    return result;
  }, [search, selectedCountry]);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [search, selectedCountry]);

  const totalPages = Math.ceil(filteredUniversities.length / ITEMS_PER_PAGE);
  // const visibleItems = filteredUniversities.slice(
  //   (currentPage - 1) * ITEMS_PER_PAGE,
  //   currentPage * ITEMS_PER_PAGE
  // );
  const startOffset = (currentPage - 1) * ITEMS_PER_PAGE;
  const endOffset = currentPage * ITEMS_PER_PAGE;
  const visibleItems = filteredUniversities.length > 0 ? filteredUniversities.slice(startOffset, endOffset) : [];

  return (
    <>
      <Navbar />
      <section className="bg-gray-100 py-16 px-6 min-h-screen">
        <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
          Our Partner Institutions
        </h1>
        <p className="text-lg text-center text-gray-600 mb-10">
          Trusted universities from around the world
        </p>

        <div className="flex justify-center gap-6 mb-8">
          <input
            type="text"
            placeholder="Search university..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white"
          />
          <select
            value={selectedCountry}
            onChange={(e) => setSelectedCountry(e.target.value)}
            className="px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 bg-white cursor-pointer hover:border-blue-400 appearance-none bg-no-repeat bg-right bg-[length:20px_20px] pr-10"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e")`,
              backgroundPosition: 'right 0.75rem center'
            }}
          >
            {allCountries.map((country) => (
              <option key={country} className="py-2 px-4 hover:bg-blue-50">{country}</option>
            ))}
          </select>
        </div>

        <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {visibleItems.map((item, i) => (
            <li
              key={`${item.country}-${i}`}
              className="bg-white p-6 rounded-xl shadow-lg transform transition-all duration-300 hover:scale-105 h-48 flex flex-col justify-between"
            >
              <div className="flex-1">
                <AcademicCapIcon className="h-10 w-10 mb-4 text-blue-600" />
                <span className="block text-lg font-bold text-gray-800 leading-tight" style={{ 
                  display: '-webkit-box',
                  WebkitLineClamp: 3,
                  WebkitBoxOrient: 'vertical',
                  overflow: 'hidden',
                  textOverflow: 'ellipsis'
                }}>
                  {item.name}
                </span>
              </div>
              <div className="mt-4">
                <span className="block text-sm font-medium text-blue-600">
                  {item.country}
                </span>
              </div>
            </li>
          ))}
        </ul>

        {totalPages > 1 && (
          <div className="flex justify-center mt-8 overflow-x-auto">
            <div className="flex gap-2 px-4">
              {/* Previous button */}
              {currentPage > 1 && (
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => setCurrentPage(currentPage - 1)}
                >
                  ←
                </button>
              )}
              
              {/* Page numbers with smart display */}
              {(() => {
                const maxVisiblePages = 5;
                let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
                let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);
                
                if (endPage - startPage + 1 < maxVisiblePages) {
                  startPage = Math.max(1, endPage - maxVisiblePages + 1);
                }
                
                const pages = [];
                
                // First page
                if (startPage > 1) {
                  pages.push(
                    <button
                      key={1}
                      className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-all"
                      onClick={() => setCurrentPage(1)}
                    >
                      1
                    </button>
                  );
                  if (startPage > 2) {
                    pages.push(<span key="ellipsis-start" className="px-2">...</span>);
                  }
                }
                
                // Visible pages
                for (let i = startPage; i <= endPage; i++) {
                  pages.push(
                    <button
                      key={i}
                      className={`px-3 py-2 rounded-lg ${
                        i === currentPage
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-200 text-gray-800'
                      } hover:bg-blue-600 hover:text-white transition-all`}
                      onClick={() => setCurrentPage(i)}
                    >
                      {i}
                    </button>
                  );
                }
                
                // Last page
                if (endPage < totalPages) {
                  if (endPage < totalPages - 1) {
                    pages.push(<span key="ellipsis-end" className="px-2">...</span>);
                  }
                  pages.push(
                    <button
                      key={totalPages}
                      className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-all"
                      onClick={() => setCurrentPage(totalPages)}
                    >
                      {totalPages}
                    </button>
                  );
                }
                
                return pages;
              })()} 
              
              {/* Next button */}
              {currentPage < totalPages && (
                <button
                  className="px-3 py-2 rounded-lg bg-gray-200 text-gray-800 hover:bg-blue-600 hover:text-white transition-all"
                  onClick={() => setCurrentPage(currentPage + 1)}
                >
                  →
                </button>
              )}
            </div>
          </div>
        )}
      </section>
      <Footer />
    </>
  );
};
