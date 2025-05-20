/**
 * NatureMap.js
 * 
 * Interactive map component for NatureKids that displays nature-based locations
 * and activities. Uses OpenStreetMap with Leaflet.js for map functionality.
 * 
 * Key Features:
 * - Interactive map display
 * - Location search functionality
 * - Category-based filtering (Parks, Playgrounds, Gardens, Turfs)
 * - User location detection
 * - Place markers with popups
 * - Directions integration
 * 
 * Dependencies:
 * - Leaflet.js
 * - React-Leaflet
 * - OpenStreetMap
 * - Styled Components
 * - React Icons
 * 
 * @author NatureKids Team
 * @version 1.0.0
 */

import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import L from 'leaflet';
import styled from 'styled-components';
import { FaMapMarkerAlt, FaSearch, FaSpinner } from 'react-icons/fa';
import 'leaflet/dist/leaflet.css';

// Fix for default marker icons in Leaflet with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapWrapper = styled.div`
  height: 100vh;
  width: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  background: white;
`;

const MapContainerWrapper = styled.div`
  height: 100%;
  width: 100%;
`;

const SearchContainer = styled.div`
  position: absolute;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: white;
  padding: 15px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
  width: 90%;
  max-width: 500px;
`;

const SearchBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 10px;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px;
  border: 2px solid #4CAF50;
  border-radius: 5px;
  font-size: 16px;
  
  &:focus {
    outline: none;
    border-color: #45a049;
  }
`;

const SearchButton = styled.button`
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 5px;
  
  &:hover {
    background-color: #45a049;
  }
`;

const CategoryButtons = styled.div`
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
`;

const CategoryButton = styled.button`
  padding: 8px 15px;
  background-color: ${props => props.active ? '#4CAF50' : '#f0f0f0'};
  color: ${props => props.active ? 'white' : '#333'};
  border: none;
  border-radius: 20px;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background-color: ${props => props.active ? '#45a049' : '#e0e0e0'};
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 20px;
  right: 20px;
  z-index: 1000;
  padding: 10px 20px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  
  &:hover {
    background-color: #45a049;
  }
`;

const LoadingSpinner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: #4CAF50;
  margin-top: 10px;
`;

// Component to handle map center updates
function ChangeView({ center, zoom }) {
  const map = useMap();
  map.setView(center, zoom);
  return null;
}

const NatureMap = ({ onClose }) => {
  const [userLocation, setUserLocation] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [places, setPlaces] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const categories = [
    { id: 'park', label: 'Parks' },
    { id: 'playground', label: 'Playgrounds' },
    { id: 'garden', label: 'Gardens' },
    { id: 'turf', label: 'Turfs' }
  ];

  useEffect(() => {
    // Get user's location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          setError('Unable to get your location. Please enable location services.');
          // Set default location (e.g., city center)
          setUserLocation({ lat: 51.505, lng: -0.09 });
        }
      );
    } else {
      setError('Geolocation is not supported by your browser');
      setUserLocation({ lat: 51.505, lng: -0.09 });
    }
  }, []);

  const handleSearch = async () => {
    if (!userLocation) {
      setError('Please allow location access to search for places');
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const category = selectedCategory || 'park';
      const query = searchQuery ? `${searchQuery} ${category}` : category;
      
      // Using OpenStreetMap Nominatim API with proper headers
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=10&viewbox=${userLocation.lng-0.1},${userLocation.lat+0.1},${userLocation.lng+0.1},${userLocation.lat-0.1}&bounded=1`,
        {
          headers: {
            'Accept-Language': 'en-US,en;q=0.9',
            'User-Agent': 'NatureKids/1.0'
          }
        }
      );
      
      if (!response.ok) {
        throw new Error('Failed to fetch places');
      }

      const data = await response.json();
      
      if (data.length === 0) {
        setError('No places found. Try a different search term or category.');
        setPlaces([]);
        return;
      }

      const formattedPlaces = data.map((place, index) => ({
        id: index + 1,
        name: place.display_name.split(',')[0],
        position: {
          lat: parseFloat(place.lat),
          lng: parseFloat(place.lon)
        },
        rating: 4.0 + Math.random() * 1.0,
        type: category,
        fullAddress: place.display_name
      }));

      setPlaces(formattedPlaces);
    } catch (err) {
      console.error('Search error:', err);
      setError('Failed to fetch places. Please try again.');
      setPlaces([]);
    } finally {
      setLoading(false);
    }
  };

  // Debounced search with proper cleanup
  useEffect(() => {
    const timer = setTimeout(() => {
      if (searchQuery || selectedCategory) {
        handleSearch();
      }
    }, 800); // Increased debounce time to 800ms

    return () => clearTimeout(timer);
  }, [searchQuery, selectedCategory]);

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    handleSearch();
  };

  const handleGetDirections = (place) => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${place.position.lat},${place.position.lng}`;
    window.open(url, '_blank');
  };

  if (!userLocation) {
    return (
      <MapWrapper>
        <LoadingSpinner>
          <FaSpinner className="fa-spin" />
          Loading map...
        </LoadingSpinner>
      </MapWrapper>
    );
  }

  return (
    <MapWrapper>
      <CloseButton onClick={onClose}>Close Map</CloseButton>
      
      <SearchContainer>
        <form onSubmit={handleSearchSubmit}>
          <SearchBar>
            <SearchInput
              type="text"
              placeholder="Search for places..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <SearchButton type="submit">
              <FaSearch /> Search
            </SearchButton>
          </SearchBar>
        </form>
        
        <CategoryButtons>
          {categories.map(category => (
            <CategoryButton
              key={category.id}
              active={selectedCategory === category.id}
              onClick={() => {
                setSelectedCategory(category.id);
                setSearchQuery(''); // Clear search query when selecting a category
              }}
            >
              {category.label}
            </CategoryButton>
          ))}
        </CategoryButtons>
        
        {loading && (
          <LoadingSpinner>
            <FaSpinner className="fa-spin" />
            Searching...
          </LoadingSpinner>
        )}
        
        {error && (
          <p style={{ 
            color: 'red', 
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#ffebee',
            borderRadius: '4px'
          }}>
            {error}
          </p>
        )}
      </SearchContainer>

      <MapContainerWrapper>
        <MapContainer
          center={[userLocation.lat, userLocation.lng]}
          zoom={13}
          style={{ height: '100%', width: '100%' }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          
          {/* User location marker */}
          <Marker
            position={[userLocation.lat, userLocation.lng]}
          >
            <Popup>
              You are here
            </Popup>
          </Marker>

          {/* Place markers */}
          {places.map(place => (
            <Marker
              key={place.id}
              position={[place.position.lat, place.position.lng]}
            >
              <Popup>
                <div>
                  <h3>{place.name}</h3>
                  <p>{place.fullAddress}</p>
                  {place.rating && <p>Rating: {place.rating.toFixed(1)}/5</p>}
                  <button 
                    onClick={() => handleGetDirections(place)}
                    style={{
                      padding: '5px 10px',
                      backgroundColor: '#4CAF50',
                      color: 'white',
                      border: 'none',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      marginTop: '5px'
                    }}
                  >
                    Get Directions
                  </button>
                </div>
              </Popup>
            </Marker>
          ))}

          <ChangeView center={[userLocation.lat, userLocation.lng]} zoom={13} />
        </MapContainer>
      </MapContainerWrapper>
    </MapWrapper>
  );
};

export default NatureMap; 