import { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import NavbarComponent from '../../components/NavBar';

const SearchRide = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [randomVehicles, setRandomVehicles] = useState([]);

  const startLat = searchParams.get('startLat');
  const startLong = searchParams.get('startLong');
  const endLat = searchParams.get('endLat');
  const endLong = searchParams.get('endLong');

  useEffect(() => {
    if (!startLat || !startLong || !endLat || !endLong) {
      navigate('/home');
    }

    const vehicleList = [
      { registrationNo: 'MH12AB1234', ownerName: 'John Doe', carType: 'Sedan', price: 4},
      { registrationNo: 'DL8CAF5678', ownerName: 'Jane Smith', carType: 'SUV', price: 4},
      { registrationNo: 'KA01CD9101', ownerName: 'Raj Mehta', carType: 'Hatchback' , price: 4},
      { registrationNo: 'GJ06XY6543', ownerName: 'Sneha Patel', carType: 'Sedan' , price: 4},
      { registrationNo: 'TN22ZZ0099', ownerName: 'Arun Kumar', carType: 'SUV' , price: 4},
      { registrationNo: 'RJ14JK1111', ownerName: 'Simran Kaur', carType: 'Hatchback' , price: 4},
      { registrationNo: 'UP32GH8888', ownerName: 'Amit Verma', carType: 'Sedan', price: 4 },
      { registrationNo: 'WB20MN4321', ownerName: 'Riya Ghosh', carType: 'SUV', price: 4 },
      { registrationNo: 'PB10QR7890', ownerName: 'Gagan Singh', carType: 'Sedan', price: 4 },
      { registrationNo: 'CH01ST5555', ownerName: 'Neha Sharma', carType: 'Hatchback', price: 4 },
    ];

    // Get 3 random vehicles
    const shuffled = [...vehicleList].sort(() => 0.5 - Math.random());
    setRandomVehicles(shuffled.slice(0, 3));
  }, [startLat, startLong, endLat, endLong, navigate]);

  const handleBookRide = (registrationNo) => {
    navigate(`/payment?startLat=${startLat}&startLong=${startLong}&endLat=${endLat}&endLong=${endLong}&price=${4}`)
  };

  return (
    <div>
      <NavbarComponent />
      <h2>Search Ride Page</h2>

      <h3>Available Vehicles</h3>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        {randomVehicles.map((vehicle) => (
          <li
            key={vehicle.registrationNo}
            style={{
              border: '1px solid #ccc',
              padding: '10px',
              marginBottom: '10px',
              borderRadius: '8px',
              boxShadow: '0 2px 5px rgba(0,0,0,0.1)',
            }}
          >
            <p><strong>Registration No:</strong> {vehicle.registrationNo}</p>
            <p><strong>Owner Name:</strong> {vehicle.ownerName}</p>
            <p><strong>Car Type:</strong> {vehicle.carType}</p>
            <p><strong>Price: $</strong>{vehicle.price}</p>
            <button onClick={() => handleBookRide(vehicle.registrationNo)}>
              Book Ride
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchRide;
