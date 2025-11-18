import React, { useState, useEffect, useRef } from 'react';
import { MapPin, Phone, Mail, Clock, Search, X, Eye } from 'lucide-react';

const EyeDonationFinder = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCenters, setFilteredCenters] = useState([]);
  const [selectedCenter, setSelectedCenter] = useState(null);
  const [map, setMap] = useState(null);
  const [markers, setMarkers] = useState([]);
  const mapRef = useRef(null);
  const infoWindowRef = useRef(null);

  const allEyeCenters = [
    {id: 1,
    name: 'NARAYANA NETRALAYA DR. RAJKUMAR EYE BANK',
    address: '121/C, CHORD ROAD, RAJAJI NAGAR, R-BLOCK',
    city: 'Bangalore',
    postalCode: '560010',
    phone: ['080-23325311', '23326855', '66121300-1305', '9741685555'],
    email: 'info@narayananethralaya.com',
    hours: '24/7 Emergency Available',
    latitude:13.011541702456345, 
    longitude: 77.55201011550652,
    rating: 4.9,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Dr. Sankar Anand',
  },
  {
    id: 2,
    name: 'LIONS INTERNATIONAL EYE BANK',
    address: 'B.W.L. SUPERSPECIALITY EYE HOSPITAL, #5, LIONS EYE HOSPITAL ROAD, OFF J.C. ROAD',
    city: 'Bangalore',
    postalCode: '560002',
    phone: ['080-22235005', '22237628', '22232562'],
    email: 'lionseyebank@gmail.com',
    hours: '9:00 AM - 6:00 PM (Emergency 24/7)',
    latitude:12.956347555489934,
    longitude: 77.58308068046937,
    rating: 4.8,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Sankar Anand Singh',
  },
  {
    id: 3,
    name: 'NARAYANA NETHRALAYA-2 SANKAR ANAND SINGH EYE BANK',
    address: '#258/A, NARAYANA HEALTH CITY, HOSUR ROAD, BOMMASANDRA',
    city: 'Bangalore',
    postalCode: '560099',
    phone: ['080-66660655', '66660693'],
    email: 'eyebanknn2@narayananethralaya.com',
    hours: '24/7 Emergency',
    latitude:12.806474818411635,
    longitude: 77.69380515881929,
    rating: 4.9,
    verified: true,
    organs: ['Eye', 'Cornea', 'Tissue'],
    emergencyAvailable: true,
    incharge: 'Kichan Chand',
  },
  {
    id: 4,
    name: 'CHELLARAM EYE BANK & CORNEA GRAFTING CENTRE',
    address: 'REGIONAL INSTITUTE OF OPHTHALMOLOGY',
    city: 'Bangalore',
    postalCode: '560002',
    phone: ['080-26707176', '26701398'],
    email: 'drraviprakash1954@gmail.com',
    hours: '9:00 AM - 8:00 PM',
    latitude: 13.0045,
    longitude: 77.5875,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Prof. Dr. Ravi Prakash',
  },
  {
    id: 5,
    name: 'SANKARA EYE BANK',
    address: 'SANKARA EYE HOSPITAL, HAL AIRPORT-VARTHUR MAIN ROAD, KUNDALAHALLI GATE',
    city: 'Bangalore',
    postalCode: '560037',
    phone: ['080-28542727', '28542729'],
    email: 'contact@sankaraeye.com',
    hours: '8:00 AM - 8:00 PM (24/7 Emergency)',
    latitude:12.956386557488036,
    longitude: 77.71305736807793,
    rating: 4.8,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 6,
    name: 'DR. B.R. AMBEDKAR MEDICAL COLLEGE EYE BANK',
    address: 'DEPARTMENT OF OPHTHALMOLOGY, KADUGONDANAHALLI',
    city: 'Bangalore',
    postalCode: '560045',
    phone: ['080-25476498', '25463442', '9845747518'],
    email: 'drbramc@yahoo.co.in',
    hours: '9:00 AM - 5:00 PM',
    latitude:13.024878490702509,
    longitude:77.61382469974677,
    rating: 4.6,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Dr. Rani Sujatha',
  },
  {
    id: 7,
    name: 'SHRADDHA EYE BANK',
    address: '#256/14, KANAKAPURA MAIN ROAD, 7-BLOCK, JAYANAGAR',
    city: 'Bangalore',
    postalCode: '560082',
    phone: ['080-26634200'],
    email: 'sganesh@blr.vsnl.net.in',
    hours: '9:00 AM - 6:00 PM',
    latitude:12.925264854742071,
    longitude: 77.57736368530851,
    rating: 4.5,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 8,
    name: 'RAMAIAH MEMORIAL EYE BANK',
    address: 'M.S. RAMAIAH MEDICAL TEACHING HOSPITAL, M.S.R. NAGAR, M.S.R.I.T. POST',
    city: 'Bangalore',
    postalCode: '560054',
    phone: ['080-23608888', '23609999'],
    email: 'msrhospitals@vsnl.com',
    hours: '24/7 Emergency Available',
    latitude:13.028340490538735,
    longitude: 77.56978505399611,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 9,
    name: 'VYDEHI INSTITUTE EYE BANK',
    address: 'VYDEHI INSTITUTE OF MEDICAL SCIENCES & RESEARCH CENTRE, 82, EPIP AREA, WHITEFIELD',
    city: 'Bangalore',
    postalCode: '560066',
    phone: ['080-28413381', '28413385'],
    email: 'info@vims.ac.in',
    hours: '8:00 AM - 8:00 PM',
    latitude: 12.975741610577785,
    longitude: 77.73060263253768,
    rating: 4.6,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 10,
    name: 'DR. M.C. MODI EYE HOSPITAL SMT. LEELAVATHI MODI EYE BANK',
    address: 'DR. M.C. MODI ROAD, MAHALAKSHMIPURAM',
    city: 'Bangalore',
    postalCode: '560086',
    phone: ['080-40869555', '23492233'],
    email: 'mcmodihospital@gmail.com',
    hours: '9:00 AM - 7:00 PM (24/7 Emergency)',
    latitude:12.998096679088178,
    longitude: 77.54633530467359,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 11,
    name: 'THE MYSORE EYE BANK & RESEARCH CENTRE',
    address: '1205, KANTHARAJA URS ROAD, CHAMARAJAPURAM',
    city: 'Mysore',
    postalCode: '570005',
    phone: ['2331216', '2332598', '2331794'],
    email: 'contact@mysoreeyebank.org',
    hours: '9:00 AM - 6:00 PM',
    latitude: 12.293183125109218,
    longitude: 76.64260279262548,
    rating: 4.6,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 12,
    name: 'SANKARA EYE BANK SHIMOGA',
    address: 'SANKARA EYE HOSPITAL, THIRTHAHALLI ROAD, HARAKERE',
    city: 'Shimoga',
    postalCode: '577202',
    phone: ['(08182)-222099', '222100', '222101'],
    email: 'shimoga@sankaraeye.com',
    hours: '8:00 AM - 8:00 PM',
    latitude: 13.903695617441263,
    longitude: 75.56101885588585,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 13,
    name: 'SHIMOGA MID TOWN ROTARY CHARITY FOUNDATION EYE BANK',
    address: '100FT-ROAD, VINAYAKA NAGAR, OPP. USHA NURSING HOME',
    city: 'Shimoga',
    postalCode: '577201',
    phone: ['08182-274333', '278420', 'Toll Free: 1053'],
    email: 'rotaryeyebank@shimoga.org',
    hours: '9:00 AM - 7:00 PM',
    latitude: 13.946424871077294,
    longitude: 75.57818891794837,
    rating: 4.5,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 14,
    name: 'S.G.M. EYE BANK TRUST & RESEARCH FOUNDATION',
    address: 'C/O. JOSHI EYE INSTITUTE "PADMA NAYANALAYA", GOKUL ROAD, HUSUR CROSS',
    city: 'Hubli',
    postalCode: '580021',
    phone: ['(0836)-2228431', '2228432', '2375933', '8123699997'],
    email: 'sgmeyebankhubli@gmail.com',
    hours: '8:00 AM - 8:00 PM',
    latitude: 15.343832054545112,
    longitude: 75.11055641350342,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Shri Guru Mahipatiraj',
  },
  {
    id: 15,
    name: 'BASAVESHWAR HOSPITAL EYE BANK',
    address: 'H.K.E. SOCIETY\'S, MAHADEVAPPA RAMPURE MEDICAL COLLEGE, MAHADEVAPPA RAMPURE MARG',
    city: 'Gulbarga',
    postalCode: '585105',
    phone: ['(08472)-247988', '220307', '9448716700', '9449447885'],
    email: 'eyebankbtgh@yahoo.in',
    hours: '9:00 AM - 6:00 PM',
    latitude: 17.325797439086312,
    longitude: 76.85368584256499,
    rating: 4.5,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Prof. Shankar',

  },
  {
    id: 16,
    name: 'DRUSHTI FOUNDATION EYE BANK',
    address: 'BEHIND AKKAMAHADEVI COLLEGE',
    city: 'Bidar',
    postalCode: '585401',
    phone: ['226642', '227242'],
    email: 'umegur@rediffmail.com',
    hours: '9:00 AM - 5:00 PM',
    latitude: 17.9689,
    longitude: 77.5256,
    rating: 4.4,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: false,
  },
  {
    id: 17,
    name: 'FATHER MULLER MEDICAL COLLEGE EYE BANK',
    address: 'FATHER MULLER MEDICAL COLLEGE & HOSPITAL, FR. MULLER ROAD',
    city: 'Mangalore',
    postalCode: '575002',
    phone: ['(0824)-2436301', '2432688'],
    email: 'fmmch@gmail.com',
    hours: '8:00 AM - 8:00 PM',
    latitude: 12.8646,
    longitude: 74.8663,
    rating: 4.6,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
    incharge: 'Dr. Norman Mendonca',
  },
  {
    id: 18,
    name: 'O.E.U. INSTITUTE OF OPHTHALMOLOGY - KASTURBA MEDICAL COLLEGE EYE BANK',
    address: 'KASTURBA MEDICAL COLLEGE, MANIPAL',
    city: 'Manipal',
    postalCode: '576104',
    phone: ['0820-2922576', '2571934'],
    email: 'ophthalmology.kmc@manipal.edu',
    hours: '8:00 AM - 5:00 PM',
    latitude: 13.1939,
    longitude: 74.8856,
    rating: 4.7,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },

  {
    id: 19,
    name: 'NAYANA SUPER SPECIALITY EYE HOSPITAL & RESEARCH CENTRE',
    address: '1ST MAIN, M.C.C. B-BLOCK',
    city: 'Davangere',
    postalCode: '577004',
    phone: ['08192-220088', '220078'],
    email: 'nayananov1@gmail.com',
    hours: '8:00 AM - 8:00 PM',
    latitude: 14.4667,
    longitude: 75.9167,
    rating: 4.6,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },

  {
    id: 20,
    name: 'VIMS EYE BANK - NITHYAJYOTHI',
    address: 'DEPARTMENT OF OPHTHALMOLOGY, VIMS, BELLARY',
    city: 'Bellary',
    postalCode: '583104',
    phone: ['(08392)-242387', '235201', '9483414824', '9845233239'],
    email: 'vimsbellary@gmail.com',
    hours: '8:00 AM - 5:00 PM',
    latitude: 15.1588,
    longitude: 75.6233,
    rating: 4.5,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: true,
  },
  {
    id: 21,
    name: 'KOLLEGAL EYE BANK',
    address: 'SHANTI NURSING HOME, KOLLEGAL',
    city: 'Kollegal',
    postalCode: '571440',
    phone: ['08224-222230'],
    email: 'kollegaleyebank@gmail.com',
    hours: '9:00 AM - 6:00 PM',
    latitude: 11.8856,
    longitude: 77.1167,
    rating: 4.3,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: false,
  },
  {
    id: 22,
    name: 'LIONS EYE BANK - GOKAK',
    address: 'LIONS EYE TRUST, DR. KULKARNI NURSING HOME, GOKAK',
    city: 'Gokak',
    postalCode: '591307',
    phone: ['08332-226414'],
    email: 'lionseyegokak@gmail.com',
    hours: '9:00 AM - 5:00 PM',
    latitude: 15.2141,
    longitude: 75.0378,
    rating: 4.4,
    verified: true,
    organs: ['Eye', 'Cornea'],
    emergencyAvailable: false,
  },

  ];

  // ========== INITIALIZE GOOGLE MAP ==========
  useEffect(() => {
    const loadGoogleMapsScript = () => {
      if (window.google?.maps) {
        initializeMap();
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyApSVjoomyC2qe3GZuxKyJsCfBrlxnXOyM`;
      script.async = true;
      script.defer = true;
      script.onload = initializeMap;
      document.head.appendChild(script);
    };

    const initializeMap = () => {
      if (!mapRef.current || !window.google?.maps) return;

      const defaultLocation = { lat: 13.0036, lng: 77.5783 }; // Bangalore
      const mapInstance = new window.google.maps.Map(mapRef.current, {
        zoom: 12,
        center: defaultLocation,
        mapTypeControl: true,
        fullscreenControl: true,
        zoomControl: true,
      });

      setMap(mapInstance);
      // Create info window for markers
      infoWindowRef.current = new window.google.maps.InfoWindow();
    };

    loadGoogleMapsScript();
  }, []);

  // ========== FILTER & ADD MARKERS ==========
  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredCenters([]);
      setSelectedCenter(null);
      // Clear markers
      markers.forEach(marker => marker.setMap(null));
      setMarkers([]);
      return;
    }

    const query = searchQuery.toLowerCase();
    const results = allEyeCenters.filter((center) =>
      center.city.toLowerCase().includes(query) ||
      center.name.toLowerCase().includes(query) ||
      center.address.toLowerCase().includes(query)
    );

    setFilteredCenters(results);
    setSelectedCenter(null);

    // Clear old markers
    markers.forEach(marker => marker.setMap(null));

    // Add new markers for filtered results
    if (map && window.google?.maps) {
      const newMarkers = results.map((center, idx) => {
        const marker = new window.google.maps.Marker({
          position: { lat: center.latitude, lng: center.longitude },
          map: map,
          title: center.name,
          label: String(idx + 1),
          animation: window.google.maps.Animation.DROP,
        });

        // Click listener for marker
        marker.addListener('click', () => {
          handleSelectCenter(center);
          // Show info window on marker
          showInfoWindow(marker, center);
        });

        return marker;
      });

      setMarkers(newMarkers);

      // Center map on first result
      if (results.length > 0) {
        map.setCenter({
          lat: results[0].latitude,
          lng: results[0].longitude,
        });
        map.setZoom(13);
      }
    }
  }, [searchQuery, map]);

  // Show info window with center details
  const showInfoWindow = (marker, center) => {
    const infoContent = `
      <div style="padding: 10px; width: 250px;">
        <h3 style="margin-top: 0; color: #1e40af;">${center.name}</h3>
        <p><strong>📍 Location:</strong> ${center.city}</p>
        <p><strong>📞 Phone:</strong> ${center.phone[0]}</p>
        <p><strong>⏰ Hours:</strong> ${center.hours}</p>
        <p><strong>⭐ Rating:</strong> ${center.rating}/5</p>
      </div>
    `;
    
    if (infoWindowRef.current) {
      infoWindowRef.current.setContent(infoContent);
      infoWindowRef.current.open(map, marker);
    }
  };

  const handleSelectCenter = (center) => {
    setSelectedCenter(center);

    if (map && window.google?.maps) {
      map.setCenter({
        lat: center.latitude,
        lng: center.longitude,
      });
      map.setZoom(15);
    }
  };

  const styles = `
/* ============================================
   EYE DONATION FINDER - CSS STYLES
   ============================================ */

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

/* MAIN CONTAINER */
.eye-donation-container {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background-color: #f3f4f6;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen', 'Ubuntu',
    'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue', sans-serif;
}

/* HEADER */
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background: linear-gradient(135deg, #1e40af 0%, #1e3a8a 100%);
  color: white;
  padding: 0.75rem 1rem;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  z-index: 100;
  height: 80px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.header-content {
  display: flex;
  align-items: center;
  gap: 1rem;
  flex: 1;
  justify-content: center;
}

.company-logo {
  width: 150px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 30px;
  color: white;
  text-align: center;
  padding: 4px;
  flex-shrink: 0;
  position: absolute;
  left: 1rem;
}

.company-logo img {
  max-width: 200px;
  height: auto;
  margin-bottom: 20px;
}

.header-icon {
  width: 36px;
  height: 36px;
  animation: pulse 2s infinite;
  color: #ef4444;
}

@keyframes pulse {
  0%, 100% {
    opacity: 1;
  }
  50% {
    opacity: 0.7;
  }
}

.header h1 {
  font-size: 28px;
  font-weight: bold;
  letter-spacing: -0.5px;
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

/* MAIN CONTENT */
.main-content {
  display: flex;
  flex: 1;
  margin-top: 80px;
  gap: 0;
  overflow: hidden;
}

/* MAP SECTION */
.map-section {
  flex: 1;
  display: flex;
  flex-direction: column;
  background: white;
  overflow: hidden;
  box-shadow: 2px 0 8px rgba(0, 0, 0, 0.05);
}

.search-container {
  background: white;
  padding: 1rem;
  border-bottom: 2px solid #e5e7eb;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  z-index: 10;
}

.search-input-wrapper {
  position: relative;
  display: flex;
  align-items: center;
}

.search-icon {
  position: absolute;
  left: 12px;
  width: 20px;
  height: 20px;
  color: #9ca3af;
  pointer-events: none;
  z-index: 5;
}

.search-input {
  width: 100%;
  padding: 12px 16px 12px 40px;
  border: 2px solid #d1d5db;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 600;
  transition: all 0.3s ease;
  outline: none;
}

.search-input:focus {
  border-color: #2563eb;
  background-color: #eff6ff;
  box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.1);
}

.search-input::placeholder {
  color: #9ca3af;
}

.clear-btn {
  position: absolute;
  right: 12px;
  background: none;
  border: none;
  cursor: pointer;
  color: #9ca3af;
  padding: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: color 0.2s;
}

.clear-btn:hover {
  color: #6b7280;
}

/* MAP WRAPPER */
.map-wrapper {
  flex: 1;
  width: 100%;
  background: linear-gradient(135deg, #e0e7ff 0%, #f0f9ff 100%);
  border-radius: 0;
  overflow: hidden;
  position: relative;
}

.map-wrapper iframe {
  width: 100%;
  height: 100%;
  border: none;
}

/* SIDEBAR */
.sidebar {
  width: 384px;
  background: white;
  display: flex;
  flex-direction: column;
  border-left: 2px solid #e5e7eb;
  box-shadow: -2px 0 8px rgba(0, 0, 0, 0.05);
  overflow: hidden;
}

.sidebar-header {
  background: linear-gradient(135deg, #2563eb 0%, #1d4ed8 100%);
  color: white;
  padding: 16px;
  border-bottom: 1px solid #1e40af;
}

.sidebar-header h2 {
  font-size: 18px;
  font-weight: bold;
  margin-bottom: 4px;
}

.sidebar-header p {
  font-size: 13px;
  color: #dbeafe;
  font-weight: 500;
}

/* CENTERS LIST */
.centers-list {
  flex: 1;
  overflow-y: auto;
  overflow-x: hidden;
}

.centers-list::-webkit-scrollbar {
  width: 6px;
}

.centers-list::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.centers-list::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 3px;
}

.centers-list::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* CENTER CARD */
.center-card {
  padding: 16px;
  border-bottom: 1px solid #f3f4f6;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 12px;
}

.center-card:hover {
  background-color: #f9fafb;
  border-left: 4px solid #3b82f6;
  padding-left: 12px;
}

.center-card.active {
  background: linear-gradient(135deg, #dbeafe 0%, #eff6ff 100%);
  border-left: 4px solid #2563eb;
  padding-left: 12px;
  box-shadow: inset 0 0 0 1px #93c5fd;
}

.center-card-content {
  flex: 1;
  min-width: 0;
}

.center-card h3 {
  font-size: 13px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 8px;
  line-height: 1.4;
  word-break: break-word;
}

.center-meta {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 12px;
  margin-bottom: 4px;
}

.center-meta .icon {
  width: 12px;
  height: 12px;
  flex-shrink: 0;
}

.center-meta a {
  color: #2563eb;
  text-decoration: none;
  font-weight: 600;
  transition: color 0.2s;
}

.center-meta a:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.center-meta span {
  color: #059669;
  font-weight: 600;
}

.rating-badge {
  background-color: #dcfce7;
  color: #166534;
  padding: 6px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: bold;
  white-space: nowrap;
  flex-shrink: 0;
}

/* NO RESULTS */
.no-results {
  padding: 32px 16px;
  text-align: center;
  color: #6b7280;
  font-size: 14px;
  line-height: 1.6;
}

/* CENTER DETAILS SECTION */
.center-details {
  background: linear-gradient(180deg, #f0f9ff 0%, #ffffff 100%);
  border-top: 2px solid #dbeafe;
  padding: 16px;
  max-height: 320px;
  overflow-y: auto;
  animation: slideUp 0.3s ease;
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.center-details h3 {
  font-size: 16px;
  font-weight: bold;
  color: #111827;
  margin-bottom: 12px;
  word-break: break-word;
}

.details-content {
  space-y: 12px;
}

.detail-item {
  margin-bottom: 12px;
  display: flex;
  gap: 8px;
  align-items: flex-start;
}

.detail-item .icon {
  width: 16px;
  height: 16px;
  color: #2563eb;
  flex-shrink: 0;
  margin-top: 2px;
}

.detail-item .label {
  font-size: 12px;
  color: #4b5563;
  font-weight: 600;
  margin-bottom: 2px;
}

.detail-item .value {
  font-size: 13px;
  color: #1f2937;
  line-height: 1.4;
}

.phone-link,
.email-link {
  display: block;
  font-size: 12px;
  color: #2563eb;
  font-weight: bold;
  text-decoration: none;
  transition: color 0.2s;
  margin-bottom: 2px;
  word-break: break-all;
}

.phone-link:hover,
.email-link:hover {
  color: #1d4ed8;
  text-decoration: underline;
}

.rating {
  color: #f59e0b;
}

/* ACTION BUTTONS */
.action-buttons {
  display: flex;
  gap: 8px;
  margin-top: 12px;
}

.btn {
  flex: 1;
  padding: 10px 12px;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 13px;
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 6px;
  text-decoration: none;
}

.btn-call {
  background-color: #10b981;
  color: white;
}

.btn-call:hover {
  background-color: #059669;
  box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
  transform: translateY(-2px);
}

.btn-map {
  background-color: #2563eb;
  color: white;
}

.btn-map:hover {
  background-color: #1d4ed8;
  box-shadow: 0 4px 12px rgba(37, 99, 235, 0.3);
  transform: translateY(-2px);
}

/* RESPONSIVE DESIGN */
@media (max-width: 1024px) {
  .sidebar {
    width: 320px;
  }
}

@media (max-width: 768px) {
  .main-content {
    flex-direction: column;
  }

  .map-section {
    flex: 1;
    min-height: 50%;
  }

  .sidebar {
    width: 100%;
    min-height: 50%;
  }

  .header h1 {
    font-size: 20px;
  }
}
  `;

  return (
    <>
      <style>{styles}</style>
      <div className="eye-donation-container">
        {/* HEADER */}
        <div className="header">
          {/* COMPANY LOGO */}
          <div className="company-logo">
            <img src="./gladminds-logo.png" alt="GladMinds Logo" />
          </div>

          <div className="header-content">
            {/* EYE LOGO */}
            <Eye className="header-icon" />
            <h1>Eye Donation</h1>
          </div>
        </div>

        {/* MAIN CONTENT */}
        <div className="main-content">
          {/* LEFT - MAP AREA */}
          <div className="map-section">
            {/* Search Bar */}
            <div className="search-container">
              <div className="search-input-wrapper">
                <Search className="search-icon" />
                <input
                  type="text"
                  placeholder="Search by city name... (Bangalore, Mysore, Shimoga...)"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="search-input"
                />
                {searchQuery && (
                  <button
                    onClick={() => setSearchQuery('')}
                    className="clear-btn"
                  >
                    <X className="w-5 h-5" />
                  </button>
                )}
              </div>
            </div>

            {/* GOOGLE MAP CONTAINER */}
            <div className="map-wrapper" ref={mapRef}></div>
          </div>

          {/* RIGHT - EYE BANKS LIST */}
          <div className="sidebar">
            {/* Header */}
            <div className="sidebar-header">
              <h2>Eye Banks Found: {filteredCenters.length}</h2>
              <p>Click to view details</p>
            </div>

            {/* Centers List */}
            <div className="centers-list">
              {filteredCenters.length > 0 ? (
                filteredCenters.map((center) => (
                  <div
                    key={center.id}
                    onClick={() => {
                      handleSelectCenter(center);
                      // Find the marker for this center and show info window
                      const markerIndex = filteredCenters.indexOf(center);
                      if (markers[markerIndex]) {
                        showInfoWindow(markers[markerIndex], center);
                      }
                    }}
                    className={`center-card ${selectedCenter?.id === center.id ? 'active' : ''}`}
                  >
                    <div className="center-card-content">
                      <h3>{center.name}</h3>
                      <div className="center-meta">
                        <Phone className="icon" />
                        <a href={`tel:${center.phone[0]}`}>{center.phone[0]}</a>
                      </div>
                      <div className="center-meta">
                        <Clock className="icon" />
                        <span>{center.hours}</span>
                      </div>
                    </div>
                    <div className="rating-badge">⭐ {center.rating}</div>
                  </div>
                ))
              ) : searchQuery !== '' ? (
                <div className="no-results">No centers found for "{searchQuery}"</div>
              ) : (
                <div className="no-results">Search for a city to see eye banks</div>
              )}
            </div>

            {/* Selected Center Details */}
            {selectedCenter && (
              <div className="center-details">
                <h3>{selectedCenter.name}</h3>

                <div className="details-content">
                  <div className="detail-item">
                    <p className="label">📍 Location:</p>
                    <p className="value">{selectedCenter.address}</p>
                    <p className="value">{selectedCenter.city} - {selectedCenter.postalCode}</p>
                  </div>

                  <div className="detail-item">
                    <Phone className="icon" />
                    <div>
                      <p className="label">Phone:</p>
                      {selectedCenter.phone.map((p, idx) => (
                        <a key={idx} href={`tel:${p}`} className="phone-link">
                          {p}
                        </a>
                      ))}
                    </div>
                  </div>

                  <div className="detail-item">
                    <Mail className="icon" />
                    <div>
                      <p className="label">Email:</p>
                      <a href={`mailto:${selectedCenter.email}`} className="email-link">
                        {selectedCenter.email}
                      </a>
                    </div>
                  </div>

                  <div className="detail-item">
                    <Clock className="icon" />
                    <div>
                      <p className="label">Hours:</p>
                      <p className="value">{selectedCenter.hours}</p>
                    </div>
                  </div>

                  <div className="detail-item">
                    <p className="label">Rating: <span className="rating">⭐ {selectedCenter.rating}/5</span></p>
                  </div>

                  {selectedCenter.incharge && (
                    <div className="detail-item">
                      <p className="label">In-charge: <span className="value">{selectedCenter.incharge}</span></p>
                    </div>
                  )}
                </div>

                <div className="action-buttons">
                  <a
                    href={`tel:${selectedCenter.phone[0]}`}
                    className="btn btn-call"
                  >
                    <Phone className="w-4 h-4" />
                    Call
                  </a>
                  <button
                    onClick={() => window.open(`https://maps.google.com/?q=${selectedCenter.latitude},${selectedCenter.longitude}`, '_blank')}
                    className="btn btn-map"
                  >
                    <MapPin className="w-4 h-4" />
                    Map
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default EyeDonationFinder;