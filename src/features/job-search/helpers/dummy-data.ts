import { LocationsApiResponseDTO } from "../models/schemas";

export const DISTANCE_OPTIONS = [
  { value: "5", label: "5 miles" },
  { value: "10", label: "10 miles" },
  { value: "15", label: "15 miles" },
  { value: "20", label: "20 miles" },
  { value: "30", label: "30 miles" },
  { value: "50", label: "50 miles" },
];

export const LOCATION_OPTIONS = [
  { value: "London", label: "London, Greater London" },
  { value: "Manchester", label: "Manchester, Greater Manchester" },
  { value: "Birmingham", label: "Birmingham, West Midlands" },
];

export const LOCATION_LINKS = [
  "Aberdeen",
  "Basingstoke",
  "Berkshire",
  "Birmingham",
  "Bradford",
  "Bristol",
  "Derby",
  "Doncaster",
  "Edinburgh",
  "Essex",
  "Exeter",
  "Glasgow",
];

export const INDUSTRY_LINKS = [
  "Accounting",
  "Administration",
  "Agriculture",
  "Arts",
  "Automotive",
  "Catering",
  "Distribution",
  "Driving",
  "Education",
  "Electronics",
  "Engineering",
  "Financial Services",
];

export const MOCK_LOCATIONS = [
  // A
  { label: "Aberdeen", terms: ["Aberdeen"], displayLocation: "" },
  { label: "Aldershot, Hampshire", terms: ["Aldershot", "Hampshire"], displayLocation: "" },
  { label: "Aylesbury, Buckinghamshire", terms: ["Aylesbury", "Buckinghamshire"], displayLocation: "" },
  { label: "Ashford, Kent", terms: ["Ashford", "Kent"], displayLocation: "" },
  { label: "Ayr, South Ayrshire", terms: ["Ayr", "South Ayrshire"], displayLocation: "" },

  // B
  { label: "Basingstoke, Hampshire", terms: ["Basingstoke", "Hampshire"], displayLocation: "" },
  { label: "Bath, Somerset", terms: ["Bath", "Somerset"], displayLocation: "" },
  { label: "Bedford, Bedfordshire", terms: ["Bedford", "Bedfordshire"], displayLocation: "" },
  { label: "Belfast", terms: ["Belfast"], displayLocation: "" },
  { label: "Blackburn, Lancashire", terms: ["Blackburn", "Lancashire"], displayLocation: "" },
  { label: "Blackpool, Lancashire", terms: ["Blackpool", "Lancashire"], displayLocation: "" },
  { label: "Bolton, Greater Manchester", terms: ["Bolton", "Greater Manchester"], displayLocation: "" },
  { label: "Bournemouth, Dorset", terms: ["Bournemouth", "Dorset"], displayLocation: "" },
  { label: "Bracknell, Berkshire", terms: ["Bracknell", "Berkshire"], displayLocation: "" },
  { label: "Bradford, West Yorkshire", terms: ["Bradford", "West Yorkshire"], displayLocation: "" },
  { label: "Brighton, East Sussex", terms: ["Brighton", "East Sussex"], displayLocation: "" },
  { label: "Bristol", terms: ["Bristol"], displayLocation: "" },
  { label: "Burnley, Lancashire", terms: ["Burnley", "Lancashire"], displayLocation: "" },

  // C
  { label: "Cambridge, Cambridgeshire", terms: ["Cambridge", "Cambridgeshire"], displayLocation: "" },
  { label: "Canterbury, Kent", terms: ["Canterbury", "Kent"], displayLocation: "" },
  { label: "Cardiff", terms: ["Cardiff"], displayLocation: "" },
  { label: "Carlisle, Cumbria", terms: ["Carlisle", "Cumbria"], displayLocation: "" },
  { label: "Chelmsford, Essex", terms: ["Chelmsford", "Essex"], displayLocation: "" },
  { label: "Cheltenham, Gloucestershire", terms: ["Cheltenham", "Gloucestershire"], displayLocation: "" },
  { label: "Chester, Cheshire", terms: ["Chester", "Cheshire"], displayLocation: "" },
  { label: "Colchester, Essex", terms: ["Colchester", "Essex"], displayLocation: "" },
  { label: "Coventry, West Midlands", terms: ["Coventry", "West Midlands"], displayLocation: "" },
  { label: "Crawley, West Sussex", terms: ["Crawley", "West Sussex"], displayLocation: "" },

  // D
  { label: "Darlington, County Durham", terms: ["Darlington", "County Durham"], displayLocation: "" },
  { label: "Derby, Derbyshire", terms: ["Derby", "Derbyshire"], displayLocation: "" },
  { label: "Doncaster, South Yorkshire", terms: ["Doncaster", "South Yorkshire"], displayLocation: "" },
  { label: "Dudley, West Midlands", terms: ["Dudley", "West Midlands"], displayLocation: "" },
  { label: "Dundee", terms: ["Dundee"], displayLocation: "" },

  // E
  { label: "Eastbourne, East Sussex", terms: ["Eastbourne", "East Sussex"], displayLocation: "" },
  { label: "Edinburgh", terms: ["Edinburgh"], displayLocation: "" },
  { label: "Exeter, Devon", terms: ["Exeter", "Devon"], displayLocation: "" },

  // F
  { label: "Falkirk", terms: ["Falkirk"], displayLocation: "" },
  { label: "Fareham, Hampshire", terms: ["Fareham", "Hampshire"], displayLocation: "" },
  { label: "Folkestone, Kent", terms: ["Folkestone", "Kent"], displayLocation: "" },

  // G
  { label: "Gateshead, Tyne and Wear", terms: ["Gateshead", "Tyne and Wear"], displayLocation: "" },
  { label: "Glasgow", terms: ["Glasgow"], displayLocation: "" },
  { label: "Gloucester, Gloucestershire", terms: ["Gloucester", "Gloucestershire"], displayLocation: "" },
  { label: "Guildford, Surrey", terms: ["Guildford", "Surrey"], displayLocation: "" },

  // H
  { label: "Halifax, West Yorkshire", terms: ["Halifax", "West Yorkshire"], displayLocation: "" },
  { label: "Harlow, Essex", terms: ["Harlow", "Essex"], displayLocation: "" },
  { label: "Harrogate, North Yorkshire", terms: ["Harrogate", "North Yorkshire"], displayLocation: "" },
  { label: "Hastings, East Sussex", terms: ["Hastings", "East Sussex"], displayLocation: "" },
  { label: "Hemel Hempstead, Hertfordshire", terms: ["Hemel Hempstead", "Hertfordshire"], displayLocation: "" },
  { label: "Hereford, Herefordshire", terms: ["Hereford", "Herefordshire"], displayLocation: "" },
  { label: "Huddersfield, West Yorkshire", terms: ["Huddersfield", "West Yorkshire"], displayLocation: "" },
  { label: "Hull, East Yorkshire", terms: ["Hull", "East Yorkshire"], displayLocation: "" },

  // I
  { label: "Ipswich, Suffolk", terms: ["Ipswich", "Suffolk"], displayLocation: "" },

  // K
  { label: "Kettering, Northamptonshire", terms: ["Kettering", "Northamptonshire"], displayLocation: "" },
  { label: "Kingston upon Hull, East Yorkshire", terms: ["Kingston upon Hull", "East Yorkshire"], displayLocation: "" },
  { label: "Kingston upon Thames, Greater London", terms: ["Kingston upon Thames", "Greater London"], displayLocation: "" },

  // L
  { label: "Leeds, West Yorkshire", terms: ["Leeds", "West Yorkshire"], displayLocation: "" },
  { label: "Leicester, Leicestershire", terms: ["Leicester", "Leicestershire"], displayLocation: "" },
  { label: "Lincoln, Lincolnshire", terms: ["Lincoln", "Lincolnshire"], displayLocation: "" },
  { label: "Liverpool, Merseyside", terms: ["Liverpool", "Merseyside"], displayLocation: "" },
  { label: "Luton, Bedfordshire", terms: ["Luton", "Bedfordshire"], displayLocation: "" },

  // M
  { label: "Maidstone, Kent", terms: ["Maidstone", "Kent"], displayLocation: "" },
  { label: "Mansfield, Nottinghamshire", terms: ["Mansfield", "Nottinghamshire"], displayLocation: "" },
  { label: "Middlesbrough, North Yorkshire", terms: ["Middlesbrough", "North Yorkshire"], displayLocation: "" },
  { label: "Milton Keynes, Buckinghamshire", terms: ["Milton Keynes", "Buckinghamshire"], displayLocation: "" },

  // N
  { label: "Newcastle upon Tyne, Tyne and Wear", terms: ["Newcastle upon Tyne", "Tyne and Wear"], displayLocation: "" },
  { label: "Northampton, Northamptonshire", terms: ["Northampton", "Northamptonshire"], displayLocation: "" },
  { label: "Norwich, Norfolk", terms: ["Norwich", "Norfolk"], displayLocation: "" },
  { label: "Nottingham, Nottinghamshire", terms: ["Nottingham", "Nottinghamshire"], displayLocation: "" },

  // O
  { label: "Oldham, Greater Manchester", terms: ["Oldham", "Greater Manchester"], displayLocation: "" },
  { label: "Oxford, Oxfordshire", terms: ["Oxford", "Oxfordshire"], displayLocation: "" },

  // P
  { label: "Peterborough, Cambridgeshire", terms: ["Peterborough", "Cambridgeshire"], displayLocation: "" },
  { label: "Plymouth, Devon", terms: ["Plymouth", "Devon"], displayLocation: "" },
  { label: "Portsmouth, Hampshire", terms: ["Portsmouth", "Hampshire"], displayLocation: "" },
  { label: "Preston, Lancashire", terms: ["Preston", "Lancashire"], displayLocation: "" },

  // R
  { label: "Reading, Berkshire", terms: ["Reading", "Berkshire"], displayLocation: "" },
  { label: "Rochdale, Greater Manchester", terms: ["Rochdale", "Greater Manchester"], displayLocation: "" },
  { label: "Rotherham, South Yorkshire", terms: ["Rotherham", "South Yorkshire"], displayLocation: "" },
  { label: "Royal Tunbridge Wells, Kent", terms: ["Royal Tunbridge Wells", "Kent"], displayLocation: "" },

  // S
  { label: "Salford, Greater Manchester", terms: ["Salford", "Greater Manchester"], displayLocation: "" },
  { label: "Salisbury, Wiltshire", terms: ["Salisbury", "Wiltshire"], displayLocation: "" },
  { label: "Sheffield, South Yorkshire", terms: ["Sheffield", "South Yorkshire"], displayLocation: "" },
  { label: "Slough, Berkshire", terms: ["Slough", "Berkshire"], displayLocation: "" },
  { label: "Southampton, Hampshire", terms: ["Southampton", "Hampshire"], displayLocation: "" },
  { label: "Southend-on-Sea, Essex", terms: ["Southend-on-Sea", "Essex"], displayLocation: "" },
  { label: "St Albans, Hertfordshire", terms: ["St Albans", "Hertfordshire"], displayLocation: "" },
  { label: "St Helens, Merseyside", terms: ["St Helens", "Merseyside"], displayLocation: "" },
  { label: "Stockport, Greater Manchester", terms: ["Stockport", "Greater Manchester"], displayLocation: "" },
  { label: "Stockton-on-Tees, County Durham", terms: ["Stockton-on-Tees", "County Durham"], displayLocation: "" },
  { label: "Stoke-on-Trent, Staffordshire", terms: ["Stoke-on-Trent", "Staffordshire"], displayLocation: "" },
  { label: "Sunderland, Tyne and Wear", terms: ["Sunderland", "Tyne and Wear"], displayLocation: "" },
  { label: "Swansea", terms: ["Swansea"], displayLocation: "" },
  { label: "Swindon, Wiltshire", terms: ["Swindon", "Wiltshire"], displayLocation: "" },

  // T
  { label: "Tamworth, Staffordshire", terms: ["Tamworth", "Staffordshire"], displayLocation: "" },
  { label: "Telford, Shropshire", terms: ["Telford", "Shropshire"], displayLocation: "" },

  // W
  { label: "Wakefield, West Yorkshire", terms: ["Wakefield", "West Yorkshire"], displayLocation: "" },
  { label: "Warrington, Cheshire", terms: ["Warrington", "Cheshire"], displayLocation: "" },
  { label: "Watford, Hertfordshire", terms: ["Watford", "Hertfordshire"], displayLocation: "" },
  { label: "Wigan, Greater Manchester", terms: ["Wigan", "Greater Manchester"], displayLocation: "" },
  { label: "Wolverhampton, West Midlands", terms: ["Wolverhampton", "West Midlands"], displayLocation: "" },
  { label: "Worcester, Worcestershire", terms: ["Worcester", "Worcestershire"], displayLocation: "" },
  { label: "Worthing, West Sussex", terms: ["Worthing", "West Sussex"], displayLocation: "" },

  // Y
  { label: "York, North Yorkshire", terms: ["York", "North Yorkshire"], displayLocation: "" },
] satisfies LocationsApiResponseDTO;
